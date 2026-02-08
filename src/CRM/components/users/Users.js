import React, { useState, useEffect } from "react";
import { message } from "antd"; // Retaining for toast only, can switch to custom later
import { AnimatePresence } from "framer-motion";
import usersAPI from "../../../services/usersAPI";
import api from "../../../services/api";

import UserHeader from "./components/UserHeader";
import UserList from "./components/UserList";
import UserProfilePanel from "./components/UserProfilePanel";
import UserForm from "./components/UserForm";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // State
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedUser, setSelectedUser] = useState(null);

    // User Form Modal State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        role: "Sales Rep",
        active: true,
        password: "",
        confirmPassword: "",
        mfaEnabled: false,
        canExportData: false,
        canDeleteRecords: false
    });

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await usersAPI.getUsers();

            // Handle both paginated ({results: []}) and non-paginated ([]) responses
            const userList = Array.isArray(data) ? data : (data?.results || []);

            // Enrich with UI defaults (MFA/LastLogin) if not provided by backend
            const enrichedData = userList.map(u => ({
                ...u,
                mfaEnabled: u.mfaEnabled !== undefined ? u.mfaEnabled : false,
                lastLogin: u.last_login ? new Date(u.last_login).toLocaleDateString() : "Never",
                activityScore: u.activityScore || 0
            }));

            setUsers(enrichedData);
        } catch (error) {
            console.error("Failed to fetch users", error);
            message.error("Failed to load users from server");
            setUsers([]); // Clear users on error instead of using dummy data
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    /**
     * Reset form to default state
     */
    const resetForm = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            department: "",
            role: "Sales Rep",
            active: true,
            password: "",
            confirmPassword: "",
            mfaEnabled: false,
            canExportData: false,
            canDeleteRecords: false
        });
        setEditingUserId(null);
        setIsFormOpen(false);
    };

    /**
     * Open modal for creating new user
     */
    const handleCreateUser = () => {
        resetForm();
        setIsFormOpen(true);
    };

    /**
     * Open modal for editing existing user
     */
    const handleEditUser = (user) => {
        setEditingUserId(user.id);
        setFormData({
            firstName: user.first_name || "",
            lastName: user.last_name || "",
            email: user.email || "",
            phone: user.phone || "",
            department: user.department || "",
            role: user.role || "Sales Rep",
            active: user.is_active !== undefined ? user.is_active : true,
            password: "",
            confirmPassword: "",
            mfaEnabled: user.mfaEnabled || false,
            canExportData: user.canExportData || false,
            canDeleteRecords: user.canDeleteRecords || false
        });
        setIsFormOpen(true);
    };

    /**
     * Handle form submission for create/update
     */
    const handleSaveUser = async () => {
        // Validation
        if (!formData.firstName.trim()) {
            message.error("Please enter a first name");
            return;
        }

        if (!formData.lastName.trim()) {
            message.error("Please enter a last name");
            return;
        }

        if (!formData.email.trim()) {
            message.error("Please enter an email address");
            return;
        }

        // Password validation for new users
        if (!editingUserId) {
            if (!formData.password || formData.password.length < 8) {
                message.error("Password must be at least 8 characters");
                return;
            }

            if (formData.password !== formData.confirmPassword) {
                message.error("Passwords do not match");
                return;
            }
        }

        try {
            if (editingUserId) {
                // UPDATE USER
                const updatedUser = {
                    id: editingUserId,
                    first_name: formData.firstName.trim(),
                    last_name: formData.lastName.trim(),
                    email: formData.email,
                    phone: formData.phone,
                    department: formData.department,
                    role: formData.role,
                    is_active: formData.active,
                    mfaEnabled: formData.mfaEnabled,
                    canExportData: formData.canExportData,
                    canDeleteRecords: formData.canDeleteRecords
                };

                // API call would be here
                // await api.put(`/auth/users/${editingUserId}/`, updatedUser);

                // Update local state
                setUsers(users.map(u => u.id === editingUserId ? { ...u, ...updatedUser } : u));
                message.success("User updated successfully");
            } else {
                // CREATE NEW USER
                const newUser = {
                    id: Date.now(), // Mock ID
                    first_name: formData.firstName.trim(),
                    last_name: formData.lastName.trim(),
                    email: formData.email,
                    phone: formData.phone,
                    department: formData.department,
                    role: formData.role,
                    is_active: formData.active,
                    mfaEnabled: formData.mfaEnabled,
                    canExportData: formData.canExportData,
                    canDeleteRecords: formData.canDeleteRecords,
                    lastLogin: "Never",
                    activityScore: 0
                };

                // API call would be here
                // const { data } = await api.post("/auth/users/", {
                //     ...newUser,
                //     password: formData.password
                // });

                // Update local state
                setUsers([newUser, ...users]);
                message.success("User created successfully");
            }

            resetForm();
        } catch (error) {
            console.error("Failed to save user", error);
            message.error(`Failed to ${editingUserId ? "update" : "create"} user`);
        }
    };

    /**
     * Handle user deletion (deactivation)
     */
    const handleDeleteUser = (id) => {
        if (window.confirm("Are you sure you want to deactivate this user?")) {
            setUsers(users.map(u => u.id === id ? { ...u, is_active: false } : u));
            message.success("User deactivated successfully");
        }
    };

    // Filtering Logic
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            statusFilter === 'All' ? true :
                statusFilter === 'Active' ? user.is_active :
                    !user.is_active;

        return matchesSearch && matchesStatus;
    });

    // Stats Logic
    const stats = {
        total: users.length,
        active: users.filter(u => u.is_active).length,
        inactive: users.filter(u => !u.is_active).length,
        mfaEnabled: users.filter(u => u.mfaEnabled).length
    };

    return (
        <div className="min-h-full space-y-6">
            <UserHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                onAddUser={handleCreateUser}
                stats={stats}
            />

            <UserList
                users={filteredUsers}
                onSelectUser={setSelectedUser}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
            />

            {/* User Profile Panel */}
            <AnimatePresence>
                {selectedUser && (
                    <UserProfilePanel
                        user={selectedUser}
                        onClose={() => setSelectedUser(null)}
                        onUpdate={(updated) => {
                            setUsers(users.map(u => u.id === updated.id ? updated : u));
                            setSelectedUser(null);
                            message.success("User updated");
                        }}
                    />
                )}
            </AnimatePresence>

            {/* User Form Modal */}
            <UserForm
                isOpen={isFormOpen}
                formData={formData}
                isEditMode={!!editingUserId}
                onChange={setFormData}
                onSubmit={handleSaveUser}
                onClose={resetForm}
            />
        </div>
    );
}
