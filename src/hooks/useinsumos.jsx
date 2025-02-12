import { useState, useEffect } from 'react';
import { fetchinsumosData } from '../services/insumosServices';

export const useInsumos = (token) => {
    const [dados, setDados] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const obterDados = async () => {
            setCarregando(true);
           
            try {
                const dadosRecebidos = await fetchinsumosData(token);
                console.log("Dados recebidos no hook:", dadosRecebidos); 
                setDados(dadosRecebidos.data.data); // <-- Corrigido
            } catch (erro) {
                console.error("Erro ao carregar os dados:", erro);  
                setErro('Falha ao carregar os dados');
            } finally {
                setCarregando(false);
            }
        };

        if (token) {
            console.log("Token presente, fazendo requisição..."); 
            obterDados();
        } else {
            console.log("Token não encontrado, não fazendo requisição.");
        }
    }, [token]); 

    return { dados, carregando, erro };
};
