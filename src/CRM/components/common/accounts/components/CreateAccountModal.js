import { useState, useEffect } from "react";
import { X, Mail, Phone, MapPin, Building2, Globe } from "lucide-react";

export default function CreateAccountModal({ isOpen, onClose, onSubmit, initialData = null }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        companyName: "",
        industry: "",
        website: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        contactPersonName: "",
        contactPersonPhone: "",
        leadSource: "",
        serviceRequirement: ""
    });

    // Initialize form with data when editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                companyName: initialData.company_name || "",
                industry: initialData.industry || "",
                website: initialData.website || "",
                email: initialData.email || "",
                phone: initialData.phone || "",
                address: initialData.address || "",
                city: initialData.city || "",
                state: initialData.state || "",
                country: initialData.country || "",
                contactPersonName: initialData.contact_person_name || "",
                contactPersonPhone: initialData.contact_person_phone || "",
                leadSource: initialData.lead_source || "",
                serviceRequirement: initialData.service_requirement || ""
            });
        } else {
            // Reset for create
            setFormData({
                companyName: "",
                industry: "",
                website: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                state: "",
                country: "",
                contactPersonName: "",
                contactPersonPhone: "",
                leadSource: ""
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (onSubmit) await onSubmit(formData);
            // Only close and reset if not passed from parent (parent handles closing)
            if (!initialData) {
                setFormData({
                    companyName: "",
                    industry: "",
                    website: "",
                    email: "",
                    phone: "",
                    address: "",
                    city: "",
                    state: "",
                    country: "",
                    contactPersonName: "",
                    contactPersonPhone: "",
                    leadSource: ""
                });
            }
            onClose();
        } catch (error) {} finally {
            setLoading(false);
        }
    };

    const isEditMode = !!initialData;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">

                {/* Header - Dark like Create Deal */}
                <div className="px-6 py-4 bg-neutral-900 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-white">{isEditMode ? "Edit Account" : "New Account"}</h2>
                        <p className="text-xs text-neutral-400 mt-0.5">{isEditMode ? "Update company details" : "Add a new company to your CRM database"}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-neutral-800 rounded-lg"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="p-6 overflow-y-auto space-y-5">
                    {/* Company Information */}
                    <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                            Company Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Building2 size={16} className="absolute left-3 top-2.5 text-neutral-400" />
                            <input
                                type="text"
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                className="w-full pl-10 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Acme Corporation"
                                required
                            />
                        </div>
                    </div>

                    {/* Industry & Website */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                Industry <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.industry}
                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                required
                            >
                                <option value="">Select Industry</option>
                                <option value="Technology">Technology</option>
                                <option value="Finance">Finance</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Retail">Retail</option>
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Consulting">Consulting</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                Website
                            </label>
                            <div className="relative">
                                <Globe size={16} className="absolute left-3 top-2.5 text-neutral-400" />
                                <input
                                    type="url"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    className="w-full pl-10 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="www.example.com"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-2 gap-3">
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
                                    placeholder="info@company.com"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone size={16} className="absolute left-3 top-2.5 text-neutral-400" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full pl-10 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Service Requirement & Lead Source */}
                    <div className="grid grid-cols-2 gap-3">
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
                                <option value="">Select Service</option>
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
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                Lead Source <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.leadSource}
                                onChange={(e) => setFormData({ ...formData, leadSource: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                required
                            >
                                <option value="">Select Lead Source</option>
                                <option value="Website">Website</option>
                                <option value="Referral">Referral</option>
                                <option value="Cold Call">Cold Call</option>
                                <option value="Email Campaign">Email Campaign</option>
                                <option value="Social Media">Social Media</option>
                                <option value="Trade Show">Trade Show</option>
                                <option value="Partner">Partner</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                            Street Address
                        </label>
                        <div className="relative">
                            <MapPin size={16} className="absolute left-3 top-2.5 text-neutral-400" />
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full pl-10 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="123 Main Street"
                            />
                        </div>
                    </div>

                    {/* City, State & Country */}
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="San Francisco"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                State/Province
                            </label>
                            <input
                                type="text"
                                value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="CA"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                Country <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                required
                            >
                                <option value="">Select</option>
                                <option value="United States">United States</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Canada">Canada</option>
                                <option value="India">India</option>
                                <option value="Australia">Australia</option>
                                <option value="Germany">Germany</option>
                                <option value="France">France</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Contact Person Information */}
                    <div className="pt-3 border-t border-neutral-200">
                        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wide mb-3">
                            Primary Contact Person
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                    Contact Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.contactPersonName}
                                    onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
                                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                                    Contact Phone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={formData.contactPersonPhone}
                                    onChange={(e) => setFormData({ ...formData, contactPersonPhone: e.target.value })}
                                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="+1 (555) 000-0000"
                                    required
                                />
                            </div>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1.5">
                            This contact will also be created in the Contacts page
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-white border-t border-neutral-200 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="px-6 py-2.5 text-sm font-medium bg-white text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors border border-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {isEditMode ? "Updating..." : "Creating..."}
                            </>
                        ) : (
                            isEditMode ? "Update Account" : "Create Account"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
