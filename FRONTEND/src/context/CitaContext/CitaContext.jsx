import  { propTypes } from 'prop-types';
import {createContext, useState } from 'react';

export const CitaContext = createContext();

export const CitaProvider = ({ children }) => {
    const [cita, setCita] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSucess] = useState('');

    const fetchCita = async ({studentId, disponibilidadId, mode}) => {
        try {
            const response = await axios.post('http://localhost:3000/citas', {
                studentId, disponibilidadId, mode
            });

            setSucess("Cita creada correctamente");
            setError('');
        } catch (error) {
            
        }
    }
    
    return (
        
        <CitaContext.Provider value={{ cita, setCita, loading, error, setError, success, setSucess, fetchCita }}>
            {children}
        </CitaContext.Provider>
    );
};

CitaProvider.propTypes = {
    
};

export default CitaContext;