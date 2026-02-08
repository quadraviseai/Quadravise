import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Tag as TagIcon, Link as LinkIcon, Flag, Calendar, User, Activity, Users, Plus } from "lucide-react";
import Button from "../../../../../components/ui/Button";
import usersAPI from "../../../../../services/usersAPI";

export default function TaskForm({
    title,
    newTask,
    setNewTask,
    onClose,
    onSave,
    isEdit,
    initialContext = {} // { deal: { id, name }, account: { id, name } }
}) {
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await usersAPI.getUsers();
                setUsers(data.results || data);
            } catch (error) {} finally {
                setLoadingUsers(false);
            }
        };
        fetchUsers();
    }, []);

    const handleToggleTagUser = (userId) => {
        const currentTags = newTask.tagged_users || [];
        if (currentTags.includes(userId)) {
            setNewTask({ ...newTask, tagged_users: currentTags.filter(id => id !== userId) });
        } else {
            setNewTask({ ...newTask, tagged_users: [...currentTags, userId] });
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
                {/* Header - Dark like Create Deal */}
                <div className="px-6 py-4 bg-neutral-900 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-white">{title}</h2>
                        <p className="text-xs text-neutral-400 mt-0.5">
                            {isEdit ? "Update task details and assignments" : "Fill in the details to create a new task"}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-neutral-800 rounded-lg"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="p-6 overflow-y-auto space-y-6">

                    {/* 1. Core Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider border-b pb-1">Task Details</h3>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Task Title <span className="text-red-500">*</span></label>
                            <input
                                autoFocus
                                className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-medium"
                                placeholder="e.g. Follow up with Acme Corp"
                                value={newTask.title}
                                onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                            <textarea
                                className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all min-h-[100px] resize-none"
                                placeholder="Add more context..."
                                value={newTask.description}
                                onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* 2. Metadata Grid */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider border-b pb-1 flex items-center gap-2">
                            Assignment & Context
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-semibold text-neutral-500 mb-1.5 uppercase flex items-center gap-1.5">
                                    <TagIcon size={14} className="text-neutral-400" /> Task Type
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all bg-white text-sm appearance-none"
                                        value={newTask.type}
                                        onChange={e => setNewTask({ ...newTask, type: e.target.value })}
                                    >
                                        <option value="General">General</option>
                                        <option value="Call">Call</option>
                                        <option value="Email">Email</option>
                                        <option value="Meeting">Meeting</option>
                                        <option value="Follow-up">Follow-up</option>
                                    </select>
                                    <div className="absolute right-3 top-3 pointer-events-none text-neutral-400">▼</div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-500 mb-1.5 uppercase flex items-center gap-1.5">
                                    <LinkIcon size={14} className="text-neutral-400" /> Linked Record
                                </label>
                                {initialContext && (initialContext.deal || initialContext.account) ? (
                                    <div className="w-full px-3 py-2.5 rounded-lg border border-brand-primary/20 bg-brand-primary/5 text-neutral-700 text-sm flex items-center gap-2">
                                        {initialContext.deal ? (
                                            <>
                                                <span className="font-bold text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded tracking-wide">DEAL</span>
                                                <span className="font-medium truncate">{initialContext.deal.name}</span>
                                            </>
                                        ) : initialContext.account ? (
                                            <>
                                                <span className="font-bold text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded tracking-wide">ACCOUNT</span>
                                                <span className="font-medium truncate">{initialContext.account.name || "Account"}</span>
                                            </>
                                        ) : null}
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <select
                                            className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all bg-white text-sm appearance-none"
                                            onChange={e => {
                                                const val = e.target.value;
                                                if (!val) setNewTask({ ...newTask, linkedEntity: null });
                                                else {
                                                    const [type, name] = val.split(':');
                                                    setNewTask({ ...newTask, linkedEntity: { type, name } });
                                                }
                                            }}
                                        >
                                            <option value="">-- None --</option>
                                            <option value="Account:Acme Corp">Acme Corp (Account)</option>
                                            <option value="Deal:Q3 Renewal">Q3 Renewal (Deal)</option>
                                            <option value="Contact:John Doe">John Doe (Contact)</option>
                                        </select>
                                        <div className="absolute right-3 top-3 pointer-events-none text-neutral-400">▼</div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-500 mb-1.5 uppercase flex items-center gap-1.5">
                                    <Flag size={14} className="text-neutral-400" /> Priority
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all bg-white text-sm appearance-none"
                                        value={newTask.priority}
                                        onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
                                    >
                                        <option value="Critical">🔴 Critical</option>
                                        <option value="High">🟠 High</option>
                                        <option value="Medium">🟡 Medium</option>
                                        <option value="Low">🔵 Low</option>
                                    </select>
                                    <div className="absolute right-3 top-3 pointer-events-none text-neutral-400">▼</div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-500 mb-1.5 uppercase flex items-center gap-1.5">
                                    <Calendar size={14} className="text-neutral-400" /> Due Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm font-medium text-neutral-700"
                                    value={newTask.dueDate}
                                    onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-500 mb-1.5 uppercase flex items-center gap-1.5">
                                    <User size={14} className="text-neutral-400" /> Assigned To
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all bg-white text-sm appearance-none"
                                        value={newTask.assignee}
                                        onChange={e => setNewTask({ ...newTask, assignee: e.target.value })}
                                    >
                                        {loadingUsers ? <option>Loading users...</option> : (
                                            <>
                                                <option value="Me">Me (Current User)</option>
                                                {users.map(u => (
                                                    <option key={u.id} value={u.id}>{u.first_name} {u.last_name || u.email}</option>
                                                ))}
                                            </>
                                        )}
                                    </select>
                                    <div className="absolute right-3 top-3 pointer-events-none text-neutral-400">▼</div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-500 mb-1.5 uppercase flex items-center gap-1.5">
                                    <Activity size={14} className="text-neutral-400" /> Status
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all bg-white text-sm appearance-none"
                                        value={newTask.status}
                                        onChange={e => setNewTask({ ...newTask, status: e.target.value })}
                                    >
                                        <option value="Pending">To Do</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                    <div className="absolute right-3 top-3 pointer-events-none text-neutral-400">▼</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tag Users Section */}
                    <div className="space-y-3">
                        <label className="block text-xs font-semibold text-neutral-500 uppercase flex items-center gap-1.5">
                            <Users size={14} className="text-neutral-400" /> Tag Users (Notify)
                        </label>
                        <div className="flex flex-wrap gap-2 p-3 border border-neutral-200 rounded-lg bg-neutral-50/50 min-h-[60px]">
                            {loadingUsers ? <span className="text-sm text-neutral-400">Loading...</span> : users.map(user => {
                                const isSelected = (newTask.tagged_users || []).includes(user.id);
                                return (
                                    <button
                                        key={user.id}
                                        type="button"
                                        onClick={() => handleToggleTagUser(user.id)}
                                        className={`
                                            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border
                                            ${isSelected
                                                ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                                                : "bg-white text-neutral-600 border-neutral-200 hover:border-brand-primary/50 hover:text-brand-primary"
                                            }
                                        `}
                                    >
                                        {isSelected ? <Users size={12} /> : <Plus size={12} />}
                                        {user.first_name} {user.last_name || user.email.split('@')[0]}
                                    </button>
                                );
                            })}
                            {users.length === 0 && !loadingUsers && (
                                <span className="text-neutral-400 text-sm">No other users found</span>
                            )}
                        </div>
                    </div>

                    {/* Quick Tip for Automation */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex gap-3 items-start">
                        <div className="mt-0.5 text-blue-600">💡</div>
                        <div className="text-sm text-blue-800">
                            <span className="font-semibold">Automation Tip:</span> Tasks linked to Deals will automatically update the deal's "Last Activity" date when completed.
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-white border-t border-neutral-200 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-medium bg-white text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors border border-neutral-300"
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="px-6 py-2.5 text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors shadow-sm"
                        type="button"
                    >
                        {isEdit ? "Save Changes" : "Create Task"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
