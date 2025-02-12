
import axios from 'axios';

const API_BASE_URL = 'https://sonil-dev.void.co.mz/api/v4';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, {
            username,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

