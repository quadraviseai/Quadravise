import api from './api';

/**
 * Finance Service for handling transactions and balance sheet data.
 * Connects to the Django backend using the centralized api utility.
 */

/**
 * Get all transactions with pagination and filters
 * @param {number} page - Page number
 * @param {string} search - Search query
 * @param {string} period - month, quarter, year
 * @returns {Promise<Object>}
 */
export const getTransactions = async (page = 1, search = '', period = '') => {
    const response = await api.get('/finance/', {
        params: { page, search, period }
    });
    return response.data;
};

/**
 * Add a new transaction
 * @param {Object} transaction 
 * @returns {Promise<Object>}
 */
export const addTransaction = async (transaction) => {
    const response = await api.post('/finance/', transaction);
    return response.data;
};

/**
 * Update an existing transaction
 * @param {number|string} id 
 * @param {Object} data - Updated transaction data including mandatory 'comment'
 * @returns {Promise<Object>}
 */
export const updateTransaction = async (id, data) => {
    const response = await api.put(`/finance/${id}/`, data);
    return response.data;
};

/**
 * Delete a transaction
 * @param {number|string} id 
 * @param {string} comment - Mandatory reason for deletion
 * @returns {Promise<boolean>}
 */
export const deleteTransaction = async (id, comment) => {
    // We send comment in the body. DRF's destroy override in views.py will catch it.
    await api.delete(`/finance/${id}/`, { data: { comment } });
    return true;
};

/**
 * Get finance summary (Total Income, Expenses, Balance)
 * @returns {Promise<Object>}
 */
export const getFinanceSummary = async () => {
    const response = await api.get('/finance/summary/');
    return response.data;
};

/**
 * Get audit history for a specific transaction
 * @param {number|string} id 
 * @returns {Promise<Array>}
 */
export const getTransactionAudit = async (id) => {
    const response = await api.get(`/finance/${id}/audit_log/`);
    return response.data;
};

/**
 * Get all finance audits (for the timeline)
 * @returns {Promise<Array>}
 */
export const getAllFinanceAudits = async () => {
    const response = await api.get('/finance/all_audits/');
    return response.data;
};

/**
 * Get the latest AI-generated report
 * @returns {Promise<Object>}
 */
export const getLatestAIReport = async () => {
    try {
        const response = await api.get('/finance-ai-reports/latest/');
        return response.data;
    } catch (error) {
        // If not found, return null instead of throwing
        if (error.response?.status === 404) return null;
        throw error;
    }
};

/**
 * Save a newly generated AI report
 * @param {Object} reportData - The JSON result from AI
 * @returns {Promise<Object>}
 */
export const saveAIReport = async (reportData) => {
    const response = await api.post('/finance-ai-reports/', { report_data: reportData });
    return response.data;
};

export const financeService = {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getFinanceSummary,
    getTransactionAudit,
    getAllFinanceAudits,
    getLatestAIReport,
    saveAIReport
};

export default financeService;
