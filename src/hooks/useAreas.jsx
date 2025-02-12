// hooks/useAreas.js
import { useState, useEffect } from 'react';
import { getAreasBySector } from '../services/areasServices';

export const useAreas = (sectorId, token) => {
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (sectorId) {
            setLoading(true);
            getAreasBySector(sectorId, token)
                .then((response) => {
                    setAreas(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err);
                    setLoading(false);
                });
        } else {
            setAreas([]);
        }
    }, [sectorId, token]);

    return { areas, loading, error };
};