import { createContext, useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

// Crear el contexto
export const CitaContext = createContext();

// Proveedor del contexto
export const CitaProvider = ({ children }) => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Función para crear una nueva cita
  const createCita = async ({ studentId, disponibilidadId, mode }) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/citas', {
        studentId,
        disponibilidadId,
        mode,
      });
      setCitas((prev) => [...prev, response.data]);
      setSuccess('Cita creada correctamente');
      setError('');
    } catch (error) {
      setError('Error al crear la cita');
      console.error('Error al crear la cita:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener todas las citas de un profesor
  const fetchCitasByProfessor = async (professorId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/profesor/${professorId}/citas`);
      setCitas(response.data);
      setError('');
    } catch (error) {
      setError('Error al obtener citas');
      console.error('Error al obtener citas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para confirmar una cita
  const confirmCita = async (citaId) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/citas/${citaId}/confirm`);
      setCitas((prev) =>
        prev.map((cita) => (cita.id === citaId ? { ...cita, status: 'confirmed' } : cita))
      );
      setSuccess('Cita confirmada correctamente');
      setError('');
    } catch (error) {
      setError('Error al confirmar la cita');
      console.error('Error al confirmar la cita:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CitaContext.Provider
      value={{
        citas,
        loading,
        error,
        success,
        createCita,
        fetchCitasByProfessor,
        confirmCita,
      }}
    >
      {children}
    </CitaContext.Provider>
  );
};

CitaProvider.propTypes = {
  children: propTypes.node.isRequired,
};
