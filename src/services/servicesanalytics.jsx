
import axios from 'axios';

const API_BASE_URL = 'https://sonil-dev.void.co.mz/api/v4';

export const getFarmInputs = async (token, phaseId, offset = 1, limit = 10, filter = '') => {
    try {
        const response = await axios.get(`${API_BASE_URL}/analytics/farm-inputs/${phaseId}?offset=${offset}&limit=${limit}&filter=${filter}&phase=nurseries`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados de insumos:", error);
        throw error;
    }
};