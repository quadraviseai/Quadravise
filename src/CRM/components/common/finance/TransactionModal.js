import React from 'react';
import { X } from 'lucide-react';
import TransactionForm from './TransactionForm';

/**
 * Transaction Modal Component
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {Function} onClose - Callback to close the modal
 * @param {Function} onSubmit - Callback when a transaction is added or edited
 * @param {Object} initialData - Optional data for editing
 */
export default function TransactionModal({ isOpen, onClose, onSubmit, initialData = null }) {
    if (!isOpen) return null;

    const isEditing = !!initialData;

    const handleSubmit = (data) => {
        onSubmit(data);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in duration-200">

                {/* Header - Dark like Create Account */}
                <div className="px-6 py-4 bg-neutral-900 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-white">
                            {isEditing ? 'Edit Transaction' : 'Add New Transaction'}
                        </h2>
                        <p className="text-xs text-neutral-400 mt-0.5">
                            {isEditing
                                ? 'Modify existing record and provide a reason for the change'
                                : 'Record a new income or expense entry'}
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
                <div className="p-6 overflow-y-auto font-lato">
                    <TransactionForm
                        onSubmit={handleSubmit}
                        initialData={initialData}
                        isModal={true}
                        onCancel={onClose}
                    />
                </div>
            </div>
        </div>
    );
}
