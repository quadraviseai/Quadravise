import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  MoreOutlined,
  BankOutlined,
  DollarOutlined,
  RiseOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { message, Spin } from "antd";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import CreateAccountModal from "./components/CreateAccountModal";
import accountsAPI from "../../../../services/accountsAPI";

export default function AccountsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter/Sort/Search/Pagination State
  const [searchTerm, setSearchTerm] = useState("");
  const [ordering, setOrdering] = useState("-created_at"); // Default: Newest first
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [editingAccount, setEditingAccount] = useState(null);

  // Fetch accounts from backend
  useEffect(() => {
    fetchAccounts();
  }, [currentPage, ordering, searchTerm]); // Re-fetch when these change

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      // Prepare query params
      const params = {
        page: currentPage,
        ordering: ordering,
        search: searchTerm || undefined
      };

      const data = await accountsAPI.getAccounts(params);

      // Handle paginated response
      if (data.results) {
        setAccounts(data.results);
        setTotalCount(data.count);
      } else {
        // Fallback for non-paginated array
        setAccounts(Array.isArray(data) ? data : []);
        setTotalCount(Array.isArray(data) ? data.length : 0);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
      message.error("Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdateAccount = async (formData) => {
    try {
      // Common data mapping
      const apiData = {
        company_name: formData.companyName,
        industry: formData.industry,
        website: formData.website,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        contact_person_name: formData.contactPersonName,
        contact_person_phone: formData.contactPersonPhone,
        lead_source: formData.leadSource,
        status: "Active"
      };

      if (editingAccount) {
        // Update existing
        await accountsAPI.updateAccount(editingAccount.id, apiData);
        message.success("Account updated successfully!");
      } else {
        // Create new
        await accountsAPI.createAccount(apiData);
        message.success("Account created successfully!");
      }

      setIsModalOpen(false);
      setEditingAccount(null);
      fetchAccounts(); // Refresh list
    } catch (error) {
      console.error("Error saving account:", error);
      message.error("Failed to save account");
    }
  };

  const openEditModal = (account) => {
    setEditingAccount(account);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingAccount(null);
    setIsModalOpen(true);
  }

  const handleDeleteAccount = async (id) => {
    try {
      await accountsAPI.deleteAccount(id);
      message.success("Account deleted successfully!");
      fetchAccounts(); // Refresh
    } catch (error) {
      console.error("Error deleting account:", error);
      message.error("Failed to delete account");
    }
  };

  // Stats - Calculated from current view or backend stats endpoint (using hardcoded calculation for now as stats API not integrated here)
  // Note: These stats only reflect the *fetched* accounts which might be just one page. 
  // Ideally, we should have a separate /stats endpoint. For now, we display stats based on visible data or placeholders.
  const stats = [
    { label: "Total Accounts", value: totalCount.toString(), change: "Count", icon: <BankOutlined />, color: "text-blue-600", bg: "bg-blue-50", gradient: "from-blue-50/80 to-white/60" },
    { label: "Active Accounts", value: accounts.filter(a => a.status === "Active").length.toString(), change: "Page View", icon: <DollarOutlined />, color: "text-green-600", bg: "bg-green-50", gradient: "from-green-50/80 to-white/60" }, // Approximate
    { label: "This Month", value: "0", change: "0%", icon: <RiseOutlined />, color: "text-purple-600", bg: "bg-purple-50", gradient: "from-purple-50/80 to-white/60" },
    { label: "Inactive", value: accounts.filter(a => a.status === "Inactive").length.toString(), change: "Page View", icon: <CheckCircleOutlined />, color: "text-red-600", bg: "bg-red-50", gradient: "from-red-50/80 to-white/60" },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700 border-green-200";
      case "Onboarding": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Inactive": return "bg-neutral-100 text-neutral-600 border-neutral-200";
      case "On Hold": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  // Handlers for search/sort
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handleSortChange = (e) => {
    setOrdering(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalCount / 10)) { // Assuming page size 10
      setCurrentPage(newPage);
    }
  };

  const totalPages = Math.ceil(totalCount / 10); // 10 is default page size set in settings.py

  return (
    <div className="space-y-8 pb-10">

      {/* 1. HEADER & ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Accounts</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Overview of all customer and partner organizations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex items-center gap-2" onClick={() => message.info("Advanced filters coming soon!")}>
            <FilterOutlined /> Filters
          </Button>
          <Button onClick={openCreateModal} className="flex items-center gap-2 shadow-lg shadow-brand-primary/20">
            <PlusOutlined /> New Account
          </Button>
        </div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`relative overflow-hidden rounded-xl border border-neutral-200 p-5 shadow-sm transition-all hover:shadow-md bg-gradient-to-br ${stat.gradient}`}>
            <div className="flex justify-between items-start mb-2">
              <div className={`h-10 w-10 rounded-lg ${stat.bg} flex items-center justify-center text-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.change.includes('+') ? 'bg-green-100 text-green-700' : stat.change === 'Alert' ? 'bg-red-100 text-red-700' : 'bg-red-50 text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
            <div className="text-xs text-neutral-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 3. MAIN TABLE CARD */}
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search accounts..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">Sort by:</span>
            <select
              className="text-sm border-none bg-transparent font-medium text-neutral-700 focus:ring-0 cursor-pointer outline-none"
              value={ordering}
              onChange={handleSortChange}
            >
              <option value="-created_at">Last Added (Newest)</option>
              <option value="created_at">Oldest First</option>
              <option value="company_name">Name (A-Z)</option>
              <option value="-company_name">Name (Z-A)</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-50/50 text-neutral-500 font-medium border-b border-neutral-100">
              <tr>
                <th className="px-6 py-4 pl-6 cursor-pointer hover:bg-neutral-100" onClick={() => setOrdering(ordering === 'company_name' ? '-company_name' : 'company_name')}>Company Name</th>
                <th className="px-6 py-4">Industry</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4 cursor-pointer hover:bg-neutral-100" onClick={() => setOrdering(ordering === 'status' ? '-status' : 'status')}>Status</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-neutral-500">
                    <Spin size="default" /> Loading accounts...
                  </td>
                </tr>
              ) : accounts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-neutral-500">
                    No accounts found. Create your first account!
                  </td>
                </tr>
              ) : accounts.map((acc, index) => (
                <tr key={acc.id} className="hover:bg-neutral-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-sm">
                        {acc.company_name.charAt(0)}
                      </div>
                      <div>
                        <Link to={`/crm/accounts/${acc.id}`} className="font-semibold text-neutral-900 hover:text-brand-primary transition-colors block">
                          {acc.company_name}
                        </Link>
                        <div className="text-xs text-neutral-400">ID: #{acc.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{acc.industry}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-neutral-200 flex items-center justify-center text-[10px] text-neutral-600">
                        {acc.owner_name ? acc.owner_name.charAt(0) : 'U'}
                      </div>
                      <span className="text-neutral-700">{acc.owner_name || 'Unassigned'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${getStatusStyle(acc.status)}`}>
                      {acc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-neutral-900">{acc.country || '-'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/crm/accounts/${acc.id}`}
                        className="text-xs font-medium text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10 border border-brand-primary/20 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        View Details
                      </Link>
                      <button
                        className="text-neutral-500 hover:text-brand-primary p-2 hover:bg-brand-primary/5 rounded-lg transition-colors"
                        title="Edit"
                        onClick={() => openEditModal(acc)}
                      >
                        <EditOutlined />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete ${acc.company_name}?`)) {
                            handleDeleteAccount(acc.id);
                          }
                        }}
                        className="text-neutral-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-neutral-100 flex items-center justify-between">
          <div className="text-xs text-neutral-500">
            {totalCount > 0
              ? `Showing ${(currentPage - 1) * 10 + 1}-${Math.min(currentPage * 10, totalCount)} of ${totalCount} accounts`
              : 'No accounts'
            }
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border border-neutral-200 rounded text-xs font-medium text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 border border-neutral-200 rounded text-xs font-medium text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Create/Edit Account Modal */}
      <CreateAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdateAccount}
        initialData={editingAccount}
      />
    </div>
  );
}
