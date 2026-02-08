import api from './api';

/**
 * Accounts API Service
 * Provides methods for CRUD operations on accounts
 */

export const accountsAPI = {
    /**
     * Get all accounts with optional filtering
     * @param {object} params - Query parameters (status, industry, owner, search)
     * @returns {Promise} Array of accounts
     */
    getAccounts: async (params = {}) => {
        const response = await api.get('/accounts/', { params });
        return response.data;
    },

    /**
     * Get a single account by ID
     * @param {number} id - Account ID
     * @returns {Promise} Account object
     */
    getAccount: async (id) => {
        const response = await api.get(`/accounts/${id}/`);
        return response.data;
    },

    /**
     * Create a new account
     * @param {object} accountData - Account data
     * @returns {Promise} Created account object
     */
    createAccount: async (accountData) => {
        const response = await api.post('/accounts/', accountData);
        return response.data;
    },

    /**
     * Update an existing account
     * @param {number} id - Account ID
     * @param {object} accountData - Updated account data
     * @returns {Promise} Updated account object
     */
    updateAccount: async (id, accountData) => {
        const response = await api.put(`/accounts/${id}/`, accountData);
        return response.data;
    },

    /**
     * Partially update an account
     * @param {number} id - Account ID
     * @param {object} accountData - Partial account data
     * @returns {Promise} Updated account object
     */
    patchAccount: async (id, accountData) => {
        const response = await api.patch(`/accounts/${id}/`, accountData);
        return response.data;
    },

    /**
     * Delete an account
     * @param {number} id - Account ID
     * @returns {Promise} void
     */
    deleteAccount: async (id) => {
        const response = await api.delete(`/accounts/${id}/`);
        return response.data;
    },
};

export default accountsAPI;
