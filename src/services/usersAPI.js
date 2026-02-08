import api from './api';

const usersAPI = {
    getUsers: async () => {
        const response = await api.get('/auth/users/');
        return response.data;
    },
    createUser: async (userData) => {
        const response = await api.post('/auth/users/create/', userData);
        return response.data;
    },
};

export default usersAPI;
