import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../../components/ui/Button";

/**
 * UserForm - Compact modal form for creating/editing users
 * @param {boolean} isOpen - Whether the modal is open
 * @param {object} formData - Current form data
 * @param {boolean} isEditMode - Whether editing an existing user
 * @param {function} onChange - Handler for form field changes
 * @param {function} onSubmit - Handler for form submission
 * @param {function} onClose - Handler to close the modal
 */
export default function UserForm({
    isOpen,
    formData,
    isEditMode,
    onChange,
    onSubmit,
    onClose
}) {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    const handleChange = (field, value) => {
        onChange({ ...formData, [field]: value });
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
                >
                    {/* Header - Dark like Create Deal */}
                    <div className="flex items-center justify-between px-6 py-4 bg-neutral-900">
                        <div>
                            <h2 className="text-lg font-bold text-white">
                                {isEditMode ? "Edit User" : "Add New User"}
                            </h2>
                            <p className="text-xs text-neutral-400 mt-0.5">
                                {isEditMode ? "Update user information" : "Create a new user account"}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-neutral-800 rounded-lg"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5">
                        <div className="space-y-5">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.firstName || ""}
                                        onChange={(e) => handleChange("firstName", e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                        Last Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.lastName || ""}
                                        onChange={(e) => handleChange("lastName", e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={formData.email || ""}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-neutral-50 disabled:text-neutral-500"
                                    placeholder="user@example.com"
                                    required
                                    disabled={isEditMode}
                                />
                                {isEditMode && (
                                    <p className="text-xs text-neutral-500 mt-1">Email cannot be changed</p>
                                )}
                            </div>

                            {/* Phone & Department */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone || ""}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.department || ""}
                                        onChange={(e) => handleChange("department", e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="e.g., Sales"
                                    />
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-neutral-200 pt-4">
                                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wide mb-3">
                                    Security & Access
                                </h3>
                            </div>

                            {/* Role & Status */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                        Role <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.role || "Sales Rep"}
                                        onChange={(e) => handleChange("role", e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                        required
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Sales Manager">Sales Manager</option>
                                        <option value="Sales Rep">Sales Rep</option>
                                        <option value="Support">Support</option>
                                        <option value="Marketing">Marketing</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                        Status <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.active ? "Active" : "Inactive"}
                                        onChange={(e) => handleChange("active", e.target.value === "Active")}
                                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                        required
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            {/* Password Fields (only for new users) */}
                            {!isEditMode && (
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            value={formData.password || ""}
                                            onChange={(e) => handleChange("password", e.target.value)}
                                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Min. 8 characters"
                                            required={!isEditMode}
                                            minLength={8}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                            Confirm Password <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            value={formData.confirmPassword || ""}
                                            onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Confirm password"
                                            required={!isEditMode}
                                            minLength={8}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* MFA & Permissions */}
                            <div className="bg-neutral-50 rounded-lg p-3 space-y-2.5 border border-neutral-200">
                                <label className="flex items-center gap-2.5 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={formData.mfaEnabled || false}
                                        onChange={(e) => handleChange("mfaEnabled", e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900">
                                        Enable Multi-Factor Authentication
                                    </span>
                                </label>
                                {isEditMode && (
                                    <>
                                        <label className="flex items-center gap-2.5 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={formData.canExportData || false}
                                                onChange={(e) => handleChange("canExportData", e.target.checked)}
                                                className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900">
                                                Can Export Data
                                            </span>
                                        </label>
                                        <label className="flex items-center gap-2.5 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={formData.canDeleteRecords || false}
                                                onChange={(e) => handleChange("canDeleteRecords", e.target.checked)}
                                                className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900">
                                                Can Delete Records
                                            </span>
                                        </label>
                                    </>
                                )}
                            </div>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 px-6 py-4 bg-white border-t border-neutral-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 text-sm font-medium bg-white text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors border border-neutral-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="px-6 py-2.5 text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors shadow-sm"
                        >
                            {isEditMode ? "Update User" : "Create User"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
