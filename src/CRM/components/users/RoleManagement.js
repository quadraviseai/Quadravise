import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RefreshCw, Shield, CheckCircle, XCircle, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { message, Modal, Input } from 'antd';
import permissionService from '../../../services/permissionService';

export default function RoleManagement() {
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState(true);
    const availableModules = permissionService.getAvailableModules();

    // UI State for Editing
    const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
    const [newRoleName, setNewRoleName] = useState("");
    const [editingRole, setEditingRole] = useState(null); // Role being renamed
    const [editRoleName, setEditRoleName] = useState("");

    const availableRoles = Object.keys(permissions);

    useEffect(() => {
        loadPermissions();
    }, []);

    const loadPermissions = async () => {
        setLoading(true);
        try {
            const data = await permissionService.getAllPermissions();
            setPermissions(data);
        } catch (error) {message.error("Failed to load permissions");
            // Ensure permissions is always an object to prevent crashes
            setPermissions({});
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = (role, moduleKey) => {
        setPermissions(prev => {
            const currentRolePerms = prev[role] || [];
            if (currentRolePerms.includes(moduleKey)) {
                // Remove
                return { ...prev, [role]: currentRolePerms.filter(k => k !== moduleKey) };
            } else {
                // Add
                return { ...prev, [role]: [...currentRolePerms, moduleKey] };
            }
        });
    };

    const handleSave = async () => {
        try {
            await permissionService.savePermissions(permissions);
            message.success("Permissions updated successfully.");
            window.dispatchEvent(new Event('permissions-updated'));
        } catch (error) {
            message.error("Failed to save settings");
        }
    };

    const handleReset = async () => {
        if (window.confirm("Reset all permissions to default?")) {
            localStorage.removeItem('quadravise_role_permissions');
            await loadPermissions();
            message.info("Permissions reset to defaults");
        }
    };

    // --- CRUD Actions ---

    const handleAddRole = async () => {
        if (!newRoleName.trim()) return;
        const normalizedRole = newRoleName.toUpperCase().replace(/\s+/g, '_');

        if (permissions[normalizedRole]) {
            message.warning("Role already exists");
            return;
        }

        // Add to local state first (will be saved when they click Save or we can save immediately)
        // Let's create it immediately via savePermissions logic to persist it
        const newPerms = { ...permissions, [normalizedRole]: [] };

        try {
            await permissionService.savePermissions(newPerms);
            setPermissions(newPerms);
            setIsAddRoleOpen(false);
            setNewRoleName("");
            message.success(`Role ${normalizedRole} created`);
        } catch (error) {
            message.error("Failed to create role");
        }
    };

    const handleDeleteRole = async (role) => {
        if (role === 'ADMIN') {
            message.error("Cannot delete ADMIN role");
            return;
        }
        if (!window.confirm(`Are you sure you want to delete ${role}?`)) return;

        try {
            await permissionService.deleteRole(role);
            loadPermissions(); // Reload to sync
            message.success("Role deleted");
        } catch (error) {
            message.error("Failed to delete role");
        }
    };

    const startEditing = (role) => {
        setEditingRole(role);
        setEditRoleName(role);
    };

    const saveRename = async () => {
        if (!editRoleName.trim()) return;
        const normalized = editRoleName.toUpperCase().replace(/\s+/g, '_');

        if (normalized === editingRole) {
            setEditingRole(null);
            return;
        }

        try {
            await permissionService.renameRole(editingRole, normalized);
            message.success("Role renamed");
            setEditingRole(null);
            loadPermissions();
        } catch (error) {
            message.error("Failed to rename role");
        }
    };

    return (
        <div className="p-6 max-w-full mx-auto">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 mb-2">Role Management</h1>
                    <p className="text-neutral-500">Configure access control and manage system roles.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsAddRoleOpen(true)}
                        className="px-4 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 font-medium flex items-center gap-2 shadow-sm transition-colors"
                    >
                        <Plus size={16} /> Add Role
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 font-medium flex items-center gap-2 transition-colors"
                    >
                        <RefreshCw size={16} /> Reset
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-white bg-slate-900 rounded-lg hover:bg-slate-800 font-medium flex items-center gap-2 shadow-sm transition-colors"
                    >
                        <Save size={16} /> Save Perms
                    </button>
                </div>
            </div>

            {/* Add Role Modal/Input Area */}
            {isAddRoleOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-white border border-emerald-200 rounded-xl shadow-sm flex items-center gap-4 max-w-md"
                >
                    <Input
                        placeholder="New Role Name (e.g. MARKETING_MANAGER)"
                        value={newRoleName}
                        onChange={e => setNewRoleName(e.target.value)}
                        onPressEnter={handleAddRole}
                    />
                    <button onClick={handleAddRole} className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-full"><Check size={20} /></button>
                    <button onClick={() => setIsAddRoleOpen(false)} className="text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 p-2 rounded-full"><X size={20} /></button>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-neutral-50 border-b border-neutral-200 font-semibold text-neutral-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 sticky left-0 bg-neutral-50 z-20 w-64 border-r border-neutral-200 shadow-[4px_0_8px_rgba(0,0,0,0.02)]">
                                    Module / Feature
                                </th>
                                {availableRoles.map(role => (
                                    <th key={role} className="px-6 py-4 text-center min-w-[160px] group relative whitespace-nowrap">
                                        <div className="flex flex-col items-center gap-1 group-hover:opacity-100">
                                            {editingRole === role ? (
                                                <div className="flex items-center gap-1">
                                                    <Input
                                                        size="small"
                                                        value={editRoleName}
                                                        onChange={e => setEditRoleName(e.target.value)}
                                                        onPressEnter={saveRename}
                                                    />
                                                    <button onClick={saveRename} className="text-emerald-600"><Check size={14} /></button>
                                                    <button onClick={() => setEditingRole(null)} className="text-neutral-400"><X size={14} /></button>
                                                </div>
                                            ) : (
                                                <span className={`font-bold ${role === 'ADMIN' ? 'text-purple-600' : 'text-neutral-700'}`}>
                                                    {role.replace(/_/g, ' ')}
                                                </span>
                                            )}

                                            {/* Action Buttons (Only for non-Admins usually, effectively hidden for ADMIN for safety/simplicity or keep them enabled if backend allows) */}
                                            {role !== 'ADMIN' && !editingRole && (
                                                <div className="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => startEditing(role)} className="text-blue-400 hover:text-blue-600" title="Rename"><Edit2 size={14} /></button>
                                                    <button onClick={() => handleDeleteRole(role)} className="text-red-300 hover:text-red-500" title="Delete"><Trash2 size={14} /></button>
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {availableModules.map(module => (
                                <tr key={module.key} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-neutral-900 sticky left-0 bg-white z-10 border-r border-neutral-200/50 shadow-[4px_0_8px_rgba(0,0,0,0.02)]">
                                        <div className="flex items-center gap-3">
                                            <Shield size={16} className="text-neutral-400" />
                                            {module.label}
                                        </div>
                                    </td>
                                    {availableRoles.map(role => {
                                        const hasAccess = (permissions[role] || []).includes(module.key);
                                        return (
                                            <td key={role} className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleToggle(role, module.key)}
                                                    className={`
                                                        p-2 rounded-lg transition-all duration-200
                                                        ${hasAccess
                                                            ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                                            : 'bg-neutral-50 text-neutral-300 hover:bg-neutral-100 hover:text-neutral-400'
                                                        }
                                                    `}
                                                    title={hasAccess ? `Allowed for ${role}` : `Denied for ${role}`}
                                                >
                                                    {hasAccess ? <CheckCircle size={20} /> : <XCircle size={20} />}
                                                </button>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
