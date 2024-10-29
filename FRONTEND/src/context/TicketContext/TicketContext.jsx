import { createContext, useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

// Crear el contexto
export const TicketContext = createContext();

// Proveedor del contexto
export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Función para crear un nuevo ticket
  const createTicket = async ({ studentId, citaId }) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/tickets', {
        studentId,
        citaId,
      });
      setTickets((prev) => [...prev, response.data.ticket]);
      setSuccess('Ticket creado correctamente');
      setError('');
    } catch (error) {
      setError('Error al crear el ticket');
      console.error('Error al crear el ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        loading,
        error,
        success,
        createTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

TicketProvider.propTypes = {
  children: propTypes.node.isRequired,
};
