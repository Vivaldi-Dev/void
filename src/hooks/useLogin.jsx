import { useState, useContext } from 'react';
import { login } from '../services/api';
import { AuthContext } from '../context/ContextUSer';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null); 
    const { loginUser } = useContext(AuthContext);

    const handleLogin = async (username, password) => {
        setLoading(true);
        setError(null);
        setData(null); 
        try {
            const response = await login(username, password);


            if (response.error === false && response.data?.token) {
                const { user, token } = response.data;
                loginUser(user, token); 
                setData(response.data);
            } else {

                setError(response.message || 'Email ou senha incorretos.');
            }
        } catch (error) {
            setError(error.message || 'Ocorreu um erro durante o login.');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, handleLogin };
};