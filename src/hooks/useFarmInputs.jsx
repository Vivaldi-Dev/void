

// hooks/useFarmInputs.js
import { useState, useEffect } from 'react';
import { getFarmInputs } from '../services/servicesanalytics';

export const useFarmInputs = (token, phaseId) => {
    const [farmData, setFarmData] = useState(null); // Alterado para farmData
    const [isLoading, setIsLoading] = useState(false); // Alterado para isLoading
    const [fetchError, setFetchError] = useState(null); // Alterado para fetchError

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getFarmInputs(token, phaseId);
                setFarmData(response.data);
                setIsLoading(false);
            } catch (err) {
                setFetchError(err);
                setIsLoading(false);
            }
        };

        if (token && phaseId) {
            fetchData();
        }
    }, [token, phaseId]);

    return { farmData, isLoading, fetchError }; // Retornando os novos nomes
};
