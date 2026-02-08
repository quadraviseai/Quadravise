/**
 * Dashboard API Service
 * Handles all dashboard-related API calls
 */
import api from './api';

export const dashboardAPI = {
    /**
     * Get high-level summary stats (Accounts, Open Deals, Pending Tasks, Revenue)
     */
    getSummary: async () => {
        const response = await api.get('/dashboard/summary/');
        return response.data;
    },

    /**
     * Get sales chart data (Revenue over time)
     */
    getSalesChart: async () => {
        const response = await api.get('/dashboard/sales_chart/');
        return response.data;
    },

    /**
     * Get pipeline status (Deals by Stage)
     */
    getPipelineStatus: async () => {
        const response = await api.get('/dashboard/pipeline_status/');
        return response.data;
    },

    /**
     * Get task overview (By Priority/Status)
     */
    getTaskOverview: async () => {
        const response = await api.get('/dashboard/task_overview/');
        return response.data;
    }
};

export default dashboardAPI;
