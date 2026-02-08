import React from 'react';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './Finance.module.css';

/**
 * Transaction List Component
 * @param {Array} transactions - List of transactions
 * @param {Function} onDelete - Callback when a transaction is deleted
 */
export default function TransactionList({
    transactions,
    onDelete,
    onEdit,
    onSearch,
    onPeriodChange,
    period,
    totalCount,
    currentPage,
    onPageChange,
    hidePagination = false
}) {
    const pageSize = 10; // Default DRF page size if not changed
    const totalPages = Math.ceil(totalCount / pageSize);

    const periods = [
        { label: 'All', value: '' },
        { label: 'Monthly', value: 'month' },
        { label: 'Quarterly', value: 'quarter' },
        { label: 'Yearly', value: 'year' },
    ];

    return (
        <div className={styles.listCard}>
            <div className={styles.cardHeader}>
                <div className="flex flex-col gap-1">
                    <h3 className={styles.cardTitle}>
                        {hidePagination ? 'Recent Activity' : 'Financial Report'}
                    </h3>
                    {!hidePagination && (
                        <p className="text-xs text-slate-400">View and manage your transaction history</p>
                    )}
                </div>

                {!hidePagination && (
                    <div className="flex items-center gap-4">
                        {/* Period Filters */}
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            {periods.map((p) => (
                                <button
                                    key={p.value}
                                    onClick={() => onPeriodChange(p.value)}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${period === p.value
                                        ? 'bg-white text-slate-900 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search records..."
                                onChange={(e) => onSearch(e.target.value)}
                                className={styles.input}
                                style={{ width: '200px', paddingLeft: '32px' }}
                            />
                            <SearchOutlined style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions && transactions.length > 0 ? (
                            transactions.map((t) => (
                                <tr key={t.id} className={styles.row}>
                                    <td>{new Date(t.date).toLocaleDateString('en-GB')}</td>
                                    <td>{t.description}</td>
                                    <td>{t.category}</td>
                                    <td>
                                        <span className={`${styles.badge} ${t.type === 'income' ? styles.badgeIncome : styles.badgeExpense}`}>
                                            {t.type}
                                        </span>
                                    </td>
                                    <td className={styles.amount}>
                                        <span style={{ color: t.type === 'income' ? '#059669' : '#dc2626' }}>
                                            {t.type === 'income' ? '+' : '-'}₹{Number(t.amount).toLocaleString('en-IN')}
                                        </span>
                                    </td>
                                    <td className="flex items-center gap-1 justify-end">
                                        <button
                                            className={`${styles.deleteBtn} !text-blue-500 hover:!bg-blue-50`}
                                            onClick={() => onEdit(t)}
                                            title="Edit transaction"
                                        >
                                            <EditOutlined />
                                        </button>
                                        <button
                                            className={styles.deleteBtn}
                                            onClick={() => onDelete(t)}
                                            title="Delete transaction"
                                        >
                                            <DeleteOutlined />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                    No transactions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {!hidePagination && totalPages > 1 && (
                <div className="flex items-center justify-between p-4 border-t border-slate-100">
                    <div className="text-xs text-slate-500">
                        Showing {transactions.length} of {totalCount} records
                    </div>
                    <div className="flex gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => onPageChange(currentPage - 1)}
                            className={`${styles.submitBtn} !p-2 !text-xs !bg-slate-100 !text-slate-600 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:!bg-slate-200'}`}
                        >
                            Previous
                        </button>
                        <span className="flex items-center px-2 text-xs font-bold text-slate-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => onPageChange(currentPage + 1)}
                            className={`${styles.submitBtn} !p-2 !text-xs !bg-slate-100 !text-slate-600 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:!bg-slate-200'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
