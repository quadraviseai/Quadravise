import api from './api';

export const contactsAPI = {
    getContacts: async (params = {}) => {
        const response = await api.get('/contacts/', { params });
        return response.data;
    },
    getContact: async (id) => {
        const response = await api.get(`/contacts/${id}/`);
        return response.data;
    },
    createContact: async (data) => {
        const response = await api.post('/contacts/', data);
        return response.data;
    },
    updateContact: async (id, data) => {
        const response = await api.put(`/contacts/${id}/`, data);
        return response.data;
    },
    deleteContact: async (id) => {
        const response = await api.delete(`/contacts/${id}/`);
        return response.data;
    },
    getTimeline: async (contactId) => {
        const response = await api.get(`/contacts/${contactId}/timeline/`);
        return response.data;
    },
    getNotes: async (contactId) => {
        const response = await api.get(`/contact-notes/`, { params: { contact: contactId } });
        return response.data.results || response.data;
    },
    createNote: async (data) => {
        const response = await api.post('/contact-notes/', data);
        return response.data;
    },
    updateNote: async (id, data) => {
        const response = await api.put(`/contact-notes/${id}/`, data);
        return response.data;
    },
    deleteNote: async (id) => {
        const response = await api.delete(`/contact-notes/${id}/`);
        return response.data;
    },

};

export default contactsAPI;
