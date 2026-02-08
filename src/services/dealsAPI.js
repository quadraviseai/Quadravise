import api from './api';

export const dealsAPI = {
    getDeals: async (params = {}) => {
        const response = await api.get('/deals/', { params });
        return response.data;
    },
    getDeal: async (id) => {
        const response = await api.get(`/deals/${id}/`);
        return response.data;
    },
    createDeal: async (data) => {
        const response = await api.post('/deals/', data);
        return response.data;
    },
    updateDeal: async (id, data) => {
        const response = await api.patch(`/deals/${id}/`, data);
        return response.data;
    },
    deleteDeal: async (id) => {
        const response = await api.delete(`/deals/${id}/`);
        return response.data;
    },
};

export default dealsAPI;
