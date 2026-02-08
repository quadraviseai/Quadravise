import React, { useState } from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';

/**
 * Delete Confirmation Modal
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {Function} onClose - Callback to close the modal
 * @param {Function} onConfirm - Callback with comment when deletion is confirmed
 * @param {Object} transaction - The transaction being deleted
 */
export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, transaction }) {
    const [comment, setComment] = useState('');

    if (!isOpen || !transaction) return null;

    const handleConfirm = () => {
        if (!comment.trim()) {
            alert('A reason for deletion is required for auditing.');
            return;
        }
        onConfirm(comment);
        setComment('');
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="px-6 py-4 bg-red-50 border-b border-red-100 flex justify-between items-center">
                    <div className="flex items-center gap-3 text-red-600">
                        <AlertTriangle size={24} />
                        <h2 className="text-lg font-bold">Delete Transaction?</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-neutral-600 transition-colors p-2 hover:bg-neutral-100 rounded-lg"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-100">
                        <p className="text-sm text-neutral-600 font-medium mb-1">Deleting record:</p>
                        <p className="text-base font-bold text-neutral-900">
                            {transaction.description} — ₹{Number(transaction.amount).toLocaleString('en-IN')}
                        </p>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider">
                            Reason for Deletion <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full p-3 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all min-h-[100px]"
                            placeholder="Please explain why this transaction is being removed..."
                            required
                        />
                        <p className="text-[10px] text-neutral-400 mt-2 italic">
                            All deletions are permanently logged in the audit history.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-medium bg-white text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors border border-neutral-300"
                    >
                        Keep Transaction
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-6 py-2.5 text-sm font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-sm flex items-center gap-2"
                    >
                        <Trash2 size={18} />
                        Delete Permanently
                    </button>
                </div>
            </div>
        </div>
    );
}
