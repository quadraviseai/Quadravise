import React, { useState, useEffect, useCallback } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import FinanceSummary from './FinanceSummary';
import TransactionList from './TransactionList';
import FinanceProjections from './FinanceProjections';
import TransactionModal from './TransactionModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import HistoryTimeline from './HistoryTimeline';
import * as financeService from '../../../../services/financeService';
import styles from './Finance.module.css';

/**
 * Finance Dashboard - Main entry point for finance management
 */
export default function FinanceDashboard() {
    const [data, setData] = useState({ results: [], count: 0 });
    const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0, balance: 0 });
    const [audits, setAudits] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [period, setPeriod] = useState(''); // '', 'month', 'quarter', 'year'

    const [loading, setLoading] = useState(true);
    const [auditsLoading, setAuditsLoading] = useState(false);

    const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, report

    // Modals state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [deletingTransaction, setDeletingTransaction] = useState(null);

    // memoize fetchData to avoid stale closures
    const fetchData = useCallback(async (p = page, q = searchQuery, pr = period) => {
        setLoading(true);
        try {
            const response = await financeService.getTransactions(p, q, pr);
            const summ = await financeService.getFinanceSummary();
            setData(response);
            setSummary(summ);
        } catch (error) {} finally {
            setLoading(false);
        }
    }, [page, searchQuery, period]);

    const fetchAudits = useCallback(async () => {
        setAuditsLoading(true);
        try {
            const auditData = await financeService.getAllFinanceAudits();
            setAudits(auditData);
        } catch (error) {} finally {
            setAuditsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        fetchAudits();
    }, [fetchData, fetchAudits]);

    const handleFormSubmit = async (formData) => {
        try {
            if (editingTransaction) {
                await financeService.updateTransaction(editingTransaction.id, formData);
            } else {
                await financeService.addTransaction(formData);
            }

            // Refresh and reset
            setSearchQuery('');
            setPage(1);
            setPeriod('');
            await fetchData(1, '', '');
            await fetchAudits();

            // Close modal is handled by the modal child calling onClose
        } catch (error) {alert('Failed to save transaction. Please check your inputs and mandatory comments.');
        }
    };

    const handleDeleteConfirm = async (comment) => {
        if (!deletingTransaction) return;

        try {
            await financeService.deleteTransaction(deletingTransaction.id, comment);
            setDeletingTransaction(null);
            fetchData();
            fetchAudits();
        } catch (error) {alert('Failed to delete transaction. A comment is mandatory for this action.');
        }
    };

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setIsAddModalOpen(true);
    };

    const handleDeleteRequest = (transaction) => {
        setDeletingTransaction(transaction);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setEditingTransaction(null);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className={styles.dashboardGrid}>
                        <FinanceSummary summary={summary} />
                        <FinanceProjections transactions={data.results || []} summary={summary} />
                        <TransactionList
                            transactions={data.results?.slice(0, 5) || []}
                            totalCount={data.count}
                            hidePagination={true}
                            onDelete={handleDeleteRequest}
                            onEdit={handleEdit}
                            onSearch={setQueryAndResetPage}
                        />
                    </div>
                );
            case 'report':
                return (
                    <div className={`${styles.contentGrid} ${styles.fullWidth}`}>
                        <TransactionList
                            transactions={data.results || []}
                            totalCount={data.count}
                            currentPage={page}
                            period={period}
                            onPeriodChange={handlePeriodChange}
                            onPageChange={setPage}
                            onDelete={handleDeleteRequest}
                            onEdit={handleEdit}
                            onSearch={setQueryAndResetPage}
                        />
                    </div>
                );
            case 'audit':
                return (
                    <div className={`${styles.contentGrid} ${styles.fullWidth}`}>
                        <div className={styles.auditTabContent}>
                            <HistoryTimeline audits={audits} loading={auditsLoading} />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const setQueryAndResetPage = (query) => {
        setSearchQuery(query);
        setPage(1);
    };

    const handlePeriodChange = (newPeriod) => {
        setPeriod(newPeriod);
        setPage(1);
    };

    return (
        <div className={styles.financeContainer}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className="flex items-center gap-4">
                        <h1 className={styles.title}>Finance Management</h1>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className={styles.addTriggerBtn}
                            title="Add Transaction"
                        >
                            <PlusOutlined />
                        </button>
                    </div>
                    <p className={styles.subtitle}>Track your daily income, expenses, and overall balance sheet.</p>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'dashboard' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        DASHBOARD
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'report' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('report')}
                    >
                        FULL REPORT
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'audit' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('audit')}
                    >
                        AUDIT LOG
                    </button>
                </div>
            </div>

            {renderTabContent()}

            <TransactionModal
                isOpen={isAddModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleFormSubmit}
                initialData={editingTransaction}
            />

            <DeleteConfirmationModal
                isOpen={!!deletingTransaction}
                onClose={() => setDeletingTransaction(null)}
                onConfirm={handleDeleteConfirm}
                transaction={deletingTransaction}
            />

            {loading && (
                <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-[100]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                </div>
            )}
        </div>
    );
}
