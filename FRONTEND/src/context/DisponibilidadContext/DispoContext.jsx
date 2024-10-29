import { createContext, useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

// Crear el contexto
export const DisponibilidadContext = createContext();

// Proveedor del contexto
export const DisponibilidadProvider = ({ children }) => {
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Función para obtener la disponibilidad de un profesor
  const fetchDisponibilidad = async (professorId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/profesor/disponibilidad/${professorId}`);
      setDisponibilidad(response.data);
    } catch (error) {
      setError('Error al obtener disponibilidad');
      console.error('Error al obtener disponibilidad:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para crear una nueva disponibilidad
  const createDisponibilidad = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/profesor/disponibilidad', data);
      setDisponibilidad((prev) => [...prev, response.data]);
    } catch (error) {
      setError('Error al crear disponibilidad');
      console.error('Error al crear disponibilidad:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar una disponibilidad existente
  const updateDisponibilidad = async (id, data) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:3000/profesor/disponibilidad/${id}`, data);
      setDisponibilidad((prev) =>
        prev.map((item) => (item.id === id ? response.data : item))
      );
    } catch (error) {
      setError('Error al actualizar disponibilidad');
      console.error('Error al actualizar disponibilidad:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar una disponibilidad
  const deleteDisponibilidad = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/profesor/disponibilidad/${id}`);
      setDisponibilidad((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setError('Error al eliminar disponibilidad');
      console.error('Error al eliminar disponibilidad:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DisponibilidadContext.Provider
      value={{
        disponibilidad,
        loading,
        error,
        fetchDisponibilidad,
        createDisponibilidad,
        updateDisponibilidad,
        deleteDisponibilidad,
      }}
    >
      {children}
    </DisponibilidadContext.Provider>
  );
};

DisponibilidadProvider.propTypes = {
  children: propTypes.node.isRequired,
};
