import { useState, useEffect } from "react";
import { X, Mail, Briefcase, Building2, Lock } from "lucide-react";

export default function CreateContactModal({ isOpen, onClose, onSubmit, initialAccount = null, contact = null }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        jobTitle: "",
        company: initialAccount ? initialAccount.name : "",
        serviceRequirement: ""
    });

    useEffect(() => {
        if (isOpen) {
            if (contact) {
                // Pre-populate for edit
                const names = (contact.name || "").split(" ");
                setFormData({
                    firstName: names[0] || "",
                    lastName: names.slice(1).join(" ") || "",
                    email: contact.email || "",
                    phone: contact.phone || "",
                    jobTitle: contact.title || "",
                    company: contact.account_name || "",
                    serviceRequirement: contact.service_requirement || ""
                });
            } else if (initialAccount) {
                setFormData(prev => ({ ...prev, company: initialAccount.name }));
            } else {
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    jobTitle: "",
                    company: "",
                    serviceRequirement: ""
                });
            }
        }
    }, [isOpen, initialAccount, contact]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">

                {/* Header - Dark like Create Deal */}
                <div className="px-6 py-4 bg-neutral-900 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-white">{contact ? 'Edit Contact' : 'New Contact'}</h2>
                        <p className="text-xs text-neutral-400 mt-0.5">{contact ? 'Update contact information' : 'Add a new person to your CRM database'}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-neutral-800 rounded-lg"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-6 font-lato">
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-2.5 text-neutral-400" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-10 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>

                    {/* Job Title & Company */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                Job Title
                            </label>
                            <div className="relative">
                                <Briefcase size={16} className="absolute left-3 top-2.5 text-neutral-400" />
                                <input
                                    type="text"
                                    value={formData.jobTitle}
                                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                    className="w-full pl-10 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="VP Sales"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                Company
                            </label>
                            <div className="relative">
                                {initialAccount ? (
                                    <Lock size={16} className="absolute left-3 top-2.5 text-neutral-400" />
                                ) : (
                                    <Building2 size={16} className="absolute left-3 top-2.5 text-neutral-400" />
                                )}
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className={`w-full pl-10 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${initialAccount ? "bg-neutral-100 text-neutral-500 cursor-not-allowed" : ""}`}
                                    placeholder="Acme Corp"
                                    disabled={!!initialAccount}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Service Requirement */}
                    <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                            Service Requirement <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.serviceRequirement}
                            onChange={(e) => setFormData({ ...formData, serviceRequirement: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            required
                        >
                            <option value="">Select Service Type</option>
                            <option value="Website Development">Website Development</option>
                            <option value="Website Maintenance">Website Maintenance</option>
                            <option value="Mobile App Development">Mobile App Development</option>
                            <option value="E-Commerce Solutions">E-Commerce Solutions</option>
                            <option value="SEO & Digital Marketing">SEO & Digital Marketing</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Cloud Solutions">Cloud Solutions</option>
                            <option value="Consulting">Consulting</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-white border-t border-neutral-200 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-medium bg-white text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors border border-neutral-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2.5 text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors shadow-sm"
                    >
                        {contact ? 'Save Changes' : 'Create Contact'}
                    </button>
                </div>
            </form>
        </div>
    );
}
