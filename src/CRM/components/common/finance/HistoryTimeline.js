import React from 'react';
import { History, User, Clock, MessageSquare, Info } from 'lucide-react';
import styles from './Finance.module.css';

/**
 * History Timeline Component for Finance Audits
 * @param {Array} audits - List of audit records
 * @param {boolean} loading - Loading state
 */
export default function HistoryTimeline({ audits, loading }) {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-300 mb-4"></div>
                <p className="text-sm">Loading audit history...</p>
            </div>
        );
    }

    if (!audits || audits.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-slate-400 text-center">
                <Info size={32} className="mb-3 opacity-20" />
                <p className="font-semibold text-slate-500">No History Found</p>
                <p className="text-xs max-w-[200px] mt-1">Audit logs will appear here as transactions are created, edited, or deleted.</p>
            </div>
        );
    }

    const getActionColor = (action) => {
        switch (action) {
            case 'CREATE': return 'bg-emerald-500 text-white';
            case 'EDIT': return 'bg-blue-500 text-white';
            case 'DELETE': return 'bg-red-500 text-white';
            default: return 'bg-slate-500 text-white';
        }
    };

    const getActionLabel = (action) => {
        switch (action) {
            case 'CREATE': return 'NEW RECORD';
            case 'EDIT': return 'MODIFIED';
            case 'DELETE': return 'REMOVED';
            default: return action;
        }
    };

    return (
        <div className="space-y-4 p-2">
            <div className="flex items-center gap-2 mb-4 px-2">
                <History size={18} className="text-slate-400" />
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Audit Trail</h3>
            </div>

            <div className="relative border-l-2 border-slate-100 ml-4 space-y-6 pb-4">
                {audits.map((audit, idx) => (
                    <div key={audit.id || idx} className="relative pl-8">
                        {/* Dot */}
                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${getActionColor(audit.action)}`}>
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>

                        {/* Content */}
                        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${getActionColor(audit.action)}`}>
                                    {getActionLabel(audit.action)}
                                </span>
                                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                    <Clock size={10} />
                                    {new Date(audit.timestamp).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>

                            <p className="text-sm font-bold text-slate-900 mb-1">
                                Transaction #{audit.transaction_id}
                                {audit.data_snapshot?.description && (
                                    <span className="text-slate-400 font-normal ml-2">
                                        — {audit.data_snapshot.description}
                                    </span>
                                )}
                            </p>

                            <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100 italic text-xs text-slate-600 mb-3">
                                <MessageSquare size={12} className="mt-0.5 flex-shrink-0 opacity-50" />
                                <span>"{audit.comment || 'No comment provided.'}"</span>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-50 pt-2 text-[10px]">
                                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                                    <User size={12} className="opacity-50" />
                                    {audit.user_name}
                                </div>
                                {audit.data_snapshot?.amount && (
                                    <div className="font-black text-slate-900">
                                        Value: ₹{Number(audit.data_snapshot.amount).toLocaleString('en-IN')}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
