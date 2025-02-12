// services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://sonil-dev.void.co.mz/api/v4';

export const getAreasBySector = async (sectorId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/areas?sector=${sectorId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar áreas:", error);
        throw error;
    }
};