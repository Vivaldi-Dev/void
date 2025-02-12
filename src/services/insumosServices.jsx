import axios from 'axios';

const API_URL = 'https://sonil-dev.void.co.mz/api/v4/sectors/all/de190ded-d23c-410c-89ac-89faf4dfb36a';

export const fetchinsumosData = async (token) => {
    try {
        console.log("Fazendo requisição para a API com token:", token); 
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        // console.log("Resposta da API:", response.data); 
        return response.data;
    } catch (error) {
        // console.error("Erro ao buscar os dados do dashboard:", error);
        if (error.response) {
            console.error("Resposta de erro da API:", error.response);  
        }
        throw error;
    }
};
