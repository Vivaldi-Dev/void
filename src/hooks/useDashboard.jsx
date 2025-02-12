import { useState, useEffect } from 'react';
import { fetchDashboardData } from '../services/dashboardService';

export const useDashboard = (token) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            // console.log("Iniciando a requisição para os dados com token:", token); 
            try {
                const fetchedData = await fetchDashboardData(token);
                console.log("Dados recebidos no hook:", fetchedData); 
                setData(fetchedData);
            } catch (error) {
                console.error("Erro ao carregar os dados:", error);  
                setError('Falha ao carregar os dados');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            console.log("Token presente, fazendo requisição..."); 
            getData();
        } else {
            console.log("Token não encontrado, não fazendo requisição.");
        }
    }, [token]); 

    return { data, loading, error };
};
