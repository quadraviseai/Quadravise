import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { message } from 'antd'; // Assuming antd is installed

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        try {
            const { data } = await api.get('/auth/me/');
            console.log("AuthContext: User data fetched", data);
            setUser(data);
        } catch (error) {
            console.error("AuthContext: User check failed", error);
            setUser(null);
        } finally {
            console.log("AuthContext: Finished loading");
            setIsLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            // CSRF cookie is important for Django session auth
            // We usually rely on defaults or get it from a cookie endpoint if needed.
            // For now, assuming session cookie is set by response.

            await api.post('/auth/login/', { email, password });
            await checkUserLoggedIn(); // Refresh user data

            const origin = location.state?.from?.pathname || '/crm'; // Default to CRM home
            navigate(origin);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.detail || 'Login failed'
            };
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout/');
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
