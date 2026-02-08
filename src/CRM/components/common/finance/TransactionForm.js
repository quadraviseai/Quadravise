import React, { useState, useEffect } from 'react';
import { Plus, Calendar, FileText, Tag, DollarSign, Edit3, MessageSquare } from 'lucide-react';

/**
 * Transaction Form Component
 * @param {Function} onSubmit - Callback when form is submitted
 * @param {Object} initialData - Optional data for editing
 * @param {boolean} isModal - Whether the form is rendered inside a modal
 * @param {Function} onCancel - Callback to cancel the form
 */
export default function TransactionForm({ onSubmit, initialData = null, isModal = false, onCancel }) {
    const isEditing = !!initialData;

    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: '',
        amount: '',
        type: 'income',
        comment: '', // Audit comment
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                comment: '', // Reset comment on load
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.description || !formData.amount || !formData.category) return;
        if (isEditing && !formData.comment) {
            alert('A reason for change is required for auditing.');
            return;
        }

        onSubmit({
            ...formData,
            amount: Number(formData.amount),
        });

        // Reset form if not editing (modal will close anyway)
        if (!isEditing) {
            setFormData({
                date: new Date().toISOString().split('T')[0],
                description: '',
                category: '',
                amount: '',
                type: 'income',
                comment: '',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Type Selection */}
            <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider">
                    Transaction Type <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: 'income' })}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg border transition-all ${formData.type === 'income'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/20'
                                : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                            }`}
                    >
                        Income
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: 'expense' })}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg border transition-all ${formData.type === 'expense'
                                ? 'bg-red-50 border-red-500 text-red-700 ring-2 ring-red-500/20'
                                : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                            }`}
                    >
                        Expense
                    </button>
                </div>
            </div>

            {/* Date */}
            <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider">
                    Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-2.5 text-neutral-400" />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider">
                    Description <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <FileText size={16} className="absolute left-3 top-2.5 text-neutral-400" />
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g. Client Payment"
                        required
                    />
                </div>
            </div>

            {/* Category */}
            <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider">
                    Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <Tag size={16} className="absolute left-3 top-2.5 text-neutral-400" />
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g. Sales, Rent"
                        required
                    />
                </div>
            </div>

            {/* Amount */}
            <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider">
                    Amount (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-2.5 text-neutral-400" />
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-bold text-slate-900"
                        placeholder="0.00"
                        required
                        min="0"
                    />
                </div>
            </div>

            {/* Audit Comment - Mandatory for editing */}
            <div className={`p-4 rounded-lg bg-neutral-50 border transition-all ${isEditing ? 'border-orange-200' : 'border-neutral-200'}`}>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider flex items-center gap-2">
                    <MessageSquare size={14} className={isEditing ? 'text-orange-500' : 'text-neutral-400'} />
                    {isEditing ? 'Reason for Change' : 'Comments (Optional)'}
                    {isEditing && <span className="text-red-500">*</span>}
                </label>
                <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className="w-full p-3 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all min-h-[80px]"
                    placeholder={isEditing ? "Please explain why you are modifying this record..." : "Add any internal notes..."}
                    required={isEditing}
                />
            </div>

            {/* Footer Actions */}
            <div className="pt-4 flex justify-end gap-3 border-t border-neutral-100">
                {isModal && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2.5 text-sm font-medium bg-white text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors border border-neutral-300"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className={`px-6 py-2.5 text-sm font-bold text-white rounded-lg transition-colors shadow-sm flex items-center gap-2 ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-emerald-600 hover:bg-emerald-700'
                        }`}
                >
                    {isEditing ? <Edit3 size={18} /> : <Plus size={18} />}
                    {isEditing ? 'Save Changes' : `Add ${formData.type === 'income' ? 'Income' : 'Expense'}`}
                </button>
            </div>
        </form>
    );
}
