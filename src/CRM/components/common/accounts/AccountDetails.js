import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeftOutlined,
    CheckCircleOutlined,
    MailOutlined,
    PhoneOutlined,
    GlobalOutlined,
    EnvironmentOutlined,
    FileProtectOutlined,
    EditOutlined,
    UserOutlined,
    DollarOutlined,
    FileTextOutlined,
    TeamOutlined,
    HistoryOutlined
} from "@ant-design/icons";
import { message, Spin, Tag } from "antd";
import Button from "../../../../components/ui/Button";
import Card from "../../ui/Card";

import accountsAPI from "../../../../services/accountsAPI";
import contactsAPI from "../../../../services/contactsAPI";
import dealsAPI from "../../../../services/dealsAPI";
import tasksAPI from "../../../../services/tasksAPI";

import CreateAccountModal from "./components/CreateAccountModal";
import CreateContactModal from "../contacts/components/CreateContactModal";
import CreateDealModal from "../deals/CreateDealModal";
import TaskForm from "../tasks/components/TaskForm";

export default function AccountDetailsPage() {
    const { id } = useParams();

    const [account, setAccount] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [deals, setDeals] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modals State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isDealModalOpen, setIsDealModalOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    // Task Form State
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        type: "General",
        priority: "Medium",
        status: "To Do",
        dueDate: "",
        assignee: "Me"
    });

    // Fetch all data
    useEffect(() => {
        fetchAccountData();
    }, [id]);

    const fetchAccountData = async () => {
        try {
            setLoading(true);
            const [accRes, contactsRes, dealsRes, tasksRes] = await Promise.all([
                accountsAPI.getAccount(id),
                contactsAPI.getContacts({ account: id }),
                dealsAPI.getDeals({ account: id }),
                tasksAPI.getTasks({ account: id })
            ]);

            setAccount(accRes);
            setContacts(contactsRes.results || contactsRes); // Handle pagination structure if any
            setDeals(dealsRes.results || dealsRes);
            setTasks(tasksRes.results || tasksRes);
        } catch (error) {message.error("Failed to load account details");
        } finally {
            setLoading(false);
        }
    };

    // Handlers
    const handleUpdateAccount = async (updatedData) => {
        try {
            await accountsAPI.updateAccount(id, updatedData);
            message.success("Account updated successfully");
            fetchAccountData();
            setIsEditModalOpen(false);
        } catch (error) {message.error("Failed to update account");
        }
    };

    const handleCreateContact = async (contactData) => {
        try {
            await contactsAPI.createContact({ ...contactData, account: id, name: `${contactData.firstName} ${contactData.lastName}` });
            message.success("Contact created successfully");
            setIsContactModalOpen(false);
            fetchAccountData();
        } catch (error) {message.error("Failed to create contact");
        }
    };

    const handleCreateDeal = async (dealData) => {
        try {
            await dealsAPI.createDeal({
                ...dealData,
                name: dealData.title, // Map title to name
                account: id,
                amount: parseFloat(dealData.amount || 0)
            });
            message.success("Deal created successfully");
            setIsDealModalOpen(false);
            fetchAccountData();
        } catch (error) {message.error("Failed to create deal");
        }
    };

    const handleCreateTask = async () => {
        try {
            await tasksAPI.createTask({
                ...newTask,
                account: id,
                due_date: newTask.dueDate || null
            });
            message.success("Task created successfully");
            setIsTaskModalOpen(false);
            fetchAccountData();
            // Reset task form
            setNewTask({ title: "", description: "", type: "General", priority: "Medium", status: "To Do", dueDate: "", assignee: "Me" });
        } catch (error) {message.error("Failed to create task");
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            Active: "bg-green-100 text-green-700",
            Onboarding: "bg-blue-100 text-blue-700",
            "On Hold": "bg-yellow-100 text-yellow-700",
            Closed: "bg-neutral-100 text-neutral-600"
        };
        return styles[status] || "bg-gray-100";
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spin size="large" />
            </div>
        );
    }

    if (!account) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-neutral-900 mb-2">Account Not Found</h2>
                    <p className="text-neutral-500 mb-4">The account you're looking for doesn't exist.</p>
                    <Link to="/crm/accounts" className="text-blue-600 hover:underline">← Back to Accounts</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20">
            {/* STICKY HEADER */}
            <div className="sticky top-0 z-10 -mx-4 -mt-4 mb-6 border-b border-neutral-200 bg-white px-4 py-4 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
                            <Link to="/crm/accounts" className="hover:text-neutral-700"><ArrowLeftOutlined /> Back to Accounts</Link>
                            <span>/</span>
                            <span>{account.industry || 'Account'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-neutral-900">{account.company_name}</h1>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusBadge(account.status)}`}>
                                {account.status}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-neutral-500 mt-1">
                            {account.industry && <span className="flex items-center gap-1"><FileTextOutlined style={{ fontSize: '14px' }} /> {account.industry}</span>}
                            {account.owner_name && <span className="flex items-center gap-1"><UserOutlined /> Owner: {account.owner_name}</span>}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsTaskModalOpen(true)}>
                            <CheckCircleOutlined /> Create Task
                        </Button>
                        <Button variant="primary" className="bg-orange-500 hover:bg-orange-600 border-orange-500 text-white flex items-center gap-2" onClick={() => setIsDealModalOpen(true)}>
                            <DollarOutlined /> New Deal
                        </Button>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 gap-6">

                {/* MAIN INFO - Full Width */}
                <div className="space-y-6">

                    {/* OVERVIEW */}
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2"><FileTextOutlined /> Overview</h3>
                            <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-neutral-600" onClick={() => setIsEditModalOpen(true)}>
                                <EditOutlined /> Edit
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-3 bg-neutral-50 rounded-lg">
                                <div className="text-xs text-neutral-500 mb-1">Industry</div>
                                <div className="font-medium text-neutral-900">{account.industry || "N/A"}</div>
                            </div>
                            <div className="p-3 bg-neutral-50 rounded-lg">
                                <div className="text-xs text-neutral-500 mb-1">Service</div>
                                <div className="font-medium text-neutral-900">{account.service_requirement || "N/A"}</div>
                            </div>
                            <div className="p-3 bg-neutral-50 rounded-lg">
                                <div className="text-xs text-neutral-500 mb-1">Lead Source</div>
                                <div className="font-medium text-neutral-900">{account.lead_source || "N/A"}</div>
                            </div>
                            <div className="p-3 bg-neutral-50 rounded-lg">
                                <div className="text-xs text-neutral-500 mb-1">Country</div>
                                <div className="font-medium text-neutral-900">{account.country || "N/A"}</div>
                            </div>

                            {/* Company Info Fields */}
                            <div className="p-3 bg-neutral-50 rounded-lg">
                                <div className="text-xs text-neutral-500 mb-1">Website</div>
                                {account.website ? (
                                    <a href={account.website} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline truncate block">
                                        {account.website}
                                    </a>
                                ) : <div className="font-medium text-neutral-900">N/A</div>}
                            </div>
                            <div className="p-3 bg-neutral-50 rounded-lg">
                                <div className="text-xs text-neutral-500 mb-1">Email</div>
                                <div className="font-medium text-neutral-900 truncate" title={account.email}>{account.email || "N/A"}</div>
                            </div>
                            <div className="p-3 bg-neutral-50 rounded-lg">
                                <div className="text-xs text-neutral-500 mb-1">Phone</div>
                                <div className="font-medium text-neutral-900">{account.phone || "N/A"}</div>
                            </div>
                            <div className="p-3 bg-neutral-50 rounded-lg">
                                <div className="text-xs text-neutral-500 mb-1">Address</div>
                                <div className="font-medium text-neutral-900 truncate" title={account.address}>
                                    {[account.address, account.city, account.state].filter(Boolean).join(', ') || "N/A"}
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* PRIORITY ACTIONS - Quick Action Required */}
                    <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50/30 to-transparent">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <span className="text-orange-600">⚡</span> Priority Actions
                            </h3>
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                                Needs Attention
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Urgent Tasks */}
                            <div>
                                <h4 className="text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-1">
                                    <CheckCircleOutlined className="text-red-600" /> Urgent Tasks
                                </h4>
                                <div className="space-y-2">
                                    {tasks.filter(t =>
                                        (t.priority === 'High' || t.priority === 'Critical') ||
                                        (t.due_date && new Date(t.due_date) < new Date() && t.status !== 'Done')
                                    ).slice(0, 3).map(task => (
                                        <div key={task.id} className="flex items-start gap-2 p-2 bg-white border border-red-200 rounded-lg hover:shadow-sm transition-shadow">
                                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${task.due_date && new Date(task.due_date) < new Date() ? 'bg-red-500' : 'bg-orange-500'
                                                }`}></div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-sm text-neutral-900 truncate">{task.title}</div>
                                                <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                                                    <span className={`px-1.5 py-0.5 rounded ${task.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                                            task.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                                                'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {task.priority}
                                                    </span>
                                                    {task.due_date && (
                                                        <span className={new Date(task.due_date) < new Date() ? 'text-red-600 font-medium' : ''}>
                                                            {new Date(task.due_date) < new Date() ? 'Overdue' : `Due: ${new Date(task.due_date).toLocaleDateString()}`}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {tasks.filter(t =>
                                        (t.priority === 'High' || t.priority === 'Critical') ||
                                        (t.due_date && new Date(t.due_date) < new Date() && t.status !== 'Done')
                                    ).length === 0 && (
                                            <div className="text-center py-4 text-neutral-400 text-sm italic bg-neutral-50 rounded-lg">
                                                No urgent tasks
                                            </div>
                                        )}
                                </div>
                            </div>

                            {/* Important Deals */}
                            <div>
                                <h4 className="text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-1">
                                    <DollarOutlined className="text-green-600" /> Active Deals
                                </h4>
                                <div className="space-y-2">
                                    {deals.filter(d => d.stage !== 'Closed Won' && d.stage !== 'Closed Lost')
                                        .slice(0, 3).map(deal => (
                                            <div key={deal.id} className="p-2 bg-white border border-green-200 rounded-lg hover:shadow-sm transition-shadow">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-medium text-sm text-neutral-900 truncate">{deal.name}</div>
                                                        <div className="text-xs text-neutral-500 mt-0.5">
                                                            Stage: <span className="font-medium text-blue-600">{deal.stage}</span>
                                                        </div>
                                                    </div>
                                                    <div className="font-bold text-sm text-green-700 ml-2">
                                                        ${parseFloat(deal.amount).toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    {deals.filter(d => d.stage !== 'Closed Won' && d.stage !== 'Closed Lost').length === 0 && (
                                        <div className="text-center py-4 text-neutral-400 text-sm italic bg-neutral-50 rounded-lg">
                                            No active deals
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* TASKS AND DEALS - Horizontal Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* TASKS / ACTIVITIES */}
                        <Card>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2"><CheckCircleOutlined /> Tasks & Activities</h3>
                                <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => setIsTaskModalOpen(true)}>+ New Task</Button>
                            </div>
                            <div className="space-y-3">
                                {tasks.length > 0 ? tasks.map(task => (
                                    <div key={task.id} className="flex items-center justify-between p-3 border border-neutral-100 rounded-lg hover:bg-neutral-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${task.status === 'Done' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                            <div>
                                                <div className="font-medium text-sm text-neutral-900">{task.title}</div>
                                                <div className="text-xs text-neutral-500">
                                                    Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No date'} • {task.priority} Priority
                                                </div>
                                            </div>
                                        </div>
                                        <Tag color={task.status === 'Done' ? 'green' : 'blue'}>{task.status}</Tag>
                                    </div>
                                )) : (
                                    <div className="text-center py-6 text-neutral-500 italic">No tasks yet</div>
                                )}
                            </div>
                        </Card>

                        {/* DEALS */}
                        <Card>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2"><DollarOutlined /> Deals</h3>
                                <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => setIsDealModalOpen(true)}>+ New Deal</Button>
                            </div>
                            <div className="space-y-3">
                                {deals.length > 0 ? deals.map(deal => (
                                    <div key={deal.id} className="p-3 border border-neutral-100 rounded-lg hover:shadow-sm transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="font-medium text-neutral-900">{deal.name}</div>
                                                <div className="text-xs text-neutral-500">Stage: {deal.stage} • Close: {deal.close_date || 'N/A'}</div>
                                            </div>
                                            <div className="font-bold text-neutral-900">
                                                ${parseFloat(deal.amount).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-neutral-500 bg-neutral-50 rounded-lg border border-dashed border-neutral-200">
                                        <p>No active deals</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* CONTACTS AND DOCUMENTS - Horizontal Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* CONTACTS */}
                        <Card>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2"><TeamOutlined /> Contacts</h3>
                                <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => setIsContactModalOpen(true)}>+ Add Contact</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {contacts.length > 0 ? contacts.map(contact => (
                                    <div key={contact.id} className="flex gap-3 p-3 border border-neutral-200 rounded-lg hover:shadow-sm transition-shadow">
                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                                            {contact.name.charAt(0)}
                                        </div>
                                        <div className="overflow-hidden">
                                            <div className="font-medium truncate">{contact.name}</div>
                                            <div className="text-xs text-neutral-500 truncate">{contact.title || 'No Title'}</div>
                                            <div className="flex gap-3 mt-2 text-xs text-neutral-500">
                                                {contact.email && <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer" title={contact.email}><MailOutlined /> Email</span>}
                                                {contact.phone && <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer" title={contact.phone}><PhoneOutlined /> Call</span>}
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-2 text-center py-8 text-neutral-500">
                                        <p>No contacts yet</p>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* DOCUMENTS */}
                        <Card>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><FileProtectOutlined /> Documents</h3>
                            <div className="border border-dashed border-neutral-300 rounded-lg p-6 text-center text-neutral-500 hover:bg-neutral-50 transition-colors cursor-pointer" onClick={() => message.info("Document upload not implemented yet")}>
                                <p>Drag and drop files here, or click to upload</p>
                                <p className="text-xs text-neutral-400 mt-1">Contracts, NDAs, Invoices</p>
                            </div>
                        </Card>
                    </div>

                </div>

            </div>


            {/* MODALS */}
            {
                isEditModalOpen && (
                    <CreateAccountModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onSubmit={handleUpdateAccount}
                        initialData={account}
                    />
                )
            }

            <CreateContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                onSubmit={handleCreateContact}
                initialAccount={account ? { id: account.id, name: account.company_name } : null}
            />

            <CreateDealModal
                isOpen={isDealModalOpen}
                onClose={() => setIsDealModalOpen(false)}
                onCreate={handleCreateDeal}
                initialAccount={account ? { id: account.id, name: account.company_name } : null}
            />

            {
                isTaskModalOpen && (
                    <TaskForm
                        title="Create New Task"
                        newTask={newTask}
                        setNewTask={setNewTask}
                        onClose={() => setIsTaskModalOpen(false)}
                        onSave={handleCreateTask}
                        isEdit={false}
                    />
                )
            }
        </div >
    );
}
