import { motion } from "framer-motion";
import {
    MoreVertical,
    Shield,
    ShieldAlert,
    Clock,
    Mail,
    CheckCircle2,
    XCircle,
    Ban
} from "lucide-react";
import { useState } from "react";

export default function UserList({ users, onSelectUser, onEditUser, onDeleteUser }) {
    const [menuOpenId, setMenuOpenId] = useState(null);

    const RoleBadge = ({ role }) => {
        let styles = "bg-neutral-100 text-neutral-600 border-neutral-200";
        if (role === 'ADMIN') styles = "bg-purple-50 text-purple-700 border-purple-200";
        if (role.includes('MANAGER')) styles = "bg-blue-50 text-blue-700 border-blue-200";
        if (role.includes('SALES')) styles = "bg-emerald-50 text-emerald-700 border-emerald-200";

        return (
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${styles}`}>
                {role.replace('_', ' ')}
            </span>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-visible"
        >
            <table className="w-full text-left border-collapse">
                <thead className="bg-neutral-50/50 border-b border-neutral-200 text-xs uppercase text-neutral-500 font-semibold tracking-wider">
                    <tr>
                        <th className="px-6 py-4 rounded-tl-xl pl-6">First Name</th>
                        <th className="px-6 py-4">Last Name</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Security</th>
                        <th className="px-6 py-4">Last Active</th>
                        <th className="px-6 py-4 text-right rounded-tr-xl">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                    {users.map(user => (
                        <tr
                            key={user.id}
                            onClick={() => onSelectUser(user)}
                            className="group hover:bg-neutral-50 transition-colors cursor-pointer"
                        >
                            {/* First Name */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    {(() => {
                                        const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
                                        const displayName = fullName || user.email || 'User';
                                        return (
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`}
                                                alt="avatar"
                                                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                            />
                                        );
                                    })()}
                                    <div className="font-medium text-neutral-900">
                                        {user.first_name || <span className="text-neutral-400 italic">Not set</span>}
                                    </div>
                                </div>
                            </td>

                            {/* Last Name */}
                            <td className="px-6 py-4">
                                <div className="font-medium text-neutral-900">
                                    {user.last_name || <span className="text-neutral-400 italic">Not set</span>}
                                </div>
                            </td>

                            {/* Email */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-sm text-neutral-700">
                                    <Mail size={14} className="text-neutral-400" />
                                    {user.email}
                                </div>
                            </td>

                            <td className="px-6 py-4">
                                <RoleBadge role={user.role} />
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    {user.is_active ? (
                                        <CheckCircle2 size={16} className="text-green-500" />
                                    ) : (
                                        <Ban size={16} className="text-neutral-400" />
                                    )}
                                    <span className={`text-sm font-medium ${user.is_active ? 'text-green-700' : 'text-neutral-500'}`}>
                                        {user.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    {user.mfaEnabled ? (
                                        <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                                            <Shield size={12} /> MFA ON
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                                            <ShieldAlert size={12} /> MFA OFF
                                        </div>
                                    )}
                                </div>
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-neutral-500 text-sm">
                                    <Clock size={14} />
                                    <span>{user.lastLogin || 'Never'}</span>
                                </div>
                            </td>

                            <td className="px-6 py-4 text-right relative">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === user.id ? null : user.id); }}
                                    className="text-neutral-400 hover:text-neutral-600 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                                >
                                    <MoreVertical size={18} />
                                </button>

                                {menuOpenId === user.id && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setMenuOpenId(null); }} />
                                        <div className="absolute right-8 top-8 w-40 bg-white rounded-lg shadow-xl border border-neutral-100 z-20 overflow-hidden py-1 text-left">
                                            <button onClick={(e) => { e.stopPropagation(); onSelectUser(user); setMenuOpenId(null); }} className="w-full text-left px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50">View Profile</button>
                                            <button onClick={(e) => { e.stopPropagation(); onEditUser(user); setMenuOpenId(null); }} className="w-full text-left px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50">Edit User</button>
                                            <button onClick={(e) => { e.stopPropagation(); /* Reset PW logic */ setMenuOpenId(null); }} className="w-full text-left px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50">Reset Password</button>
                                            <div className="h-px bg-neutral-100 my-1" />
                                            <button onClick={(e) => { e.stopPropagation(); onDeleteUser(user.id); setMenuOpenId(null); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Deactivate</button>
                                        </div>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr><td colSpan={8} className="px-6 py-12 text-center text-neutral-400">No users found matching your filters.</td></tr>
                    )}
                </tbody>
            </table>
        </motion.div>
    );
}
