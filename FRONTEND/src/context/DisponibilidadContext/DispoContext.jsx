import propTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const DispoContext = createContext();

export const DispoProvider = ({ children }) => {
    const [disponibilidad, setDisponibilidad] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDisponibilidad = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/disponibilidad');
                setDisponibilidad(response.data);
            } catch (error) {
                console.error('Error al obtener la disponibilidad:', error);
                setError('Error al obtener la disponibilidad');
            } finally {
                setLoading(false);
            }
        };

        fetchDisponibilidad();
    }, []);
    
    return (
        <DispoContext.Provider value={{ disponibilidad, setDisponibilidad, loading, error, setError }}>
            {children}
        </DispoContext.Provider>
    );
}

DispoProvider.propTypes = {
    children: propTypes.node.isRequired,
};

export default DispoContext;