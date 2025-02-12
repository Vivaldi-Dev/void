import { useState, useContext } from 'react';
import { login } from '../services/api';
import { AuthContext } from '../context/ContextUSer';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { loginUser } = useContext(AuthContext);

    const handleLogin = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await login(username, password);
            if (response.error === false) {
                const { user, token } = response.data;
                loginUser(user, token); 
            } else {
                setError(response.message || 'Erro desconhecido');
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, handleLogin };
};
