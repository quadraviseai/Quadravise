import api from './api';

const usersAPI = {
    getUsers: async () => {
        const response = await api.get('/auth/users/');
        return response.data;
    },
};

export default usersAPI;
