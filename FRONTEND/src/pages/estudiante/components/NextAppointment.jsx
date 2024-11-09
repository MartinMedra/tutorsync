import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import WarningCard from "./WarningCard";

function NextAppointment() {
  const { user } = useContext(AuthContext);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    if (user) {
    async function fetchTickets() {
      setLoading(true); // Activa el estado de carga al iniciar la petición
      try {
        const response = await axios.get(`http://localhost:3000/tickets/${user.id}`);
        setNextAppointment(response.data[0]); // Asigna el primer ticket como próxima cita
        setError(null); // Limpia el error en caso de éxito
      } catch (error) {
        setError(error.response?.data?.error || "Error al obtener los tickets");
        console.error("Error en la solicitud:", error.message);
      } finally {
        setLoading(false); // Desactiva el estado de carga al finalizar
      }
    }

    if (user) {
      fetchTickets();
    }
  }
  }, [user,loading]);

  const formatFecha = (date) => {
    const options = { day: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('es-ES', options).format(new Date(date));
  };
  
  const formatHora = (time) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Intl.DateTimeFormat('es-ES', options).format(new Date(time));
  };

  if (loading) {
    return <p>Cargando próxima cita...</p>; // Mensaje de carga
  }

  if (error) {
    return <WarningCard message={error} />; // Muestra el mensaje de error usando WarningCard
  }

  if (!nextAppointment) {
    return <p>No tienes próximas citas</p>; // Mensaje si no hay citas
  }

  return (
    <section className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Próxima Cita</h2>
      <p className="text-gray-600">Fecha: {formatFecha(nextAppointment.citas.date)}</p>
      <p className="text-gray-600">Hora: {formatHora(nextAppointment.citas.startTime)}</p>
      <p className="text-gray-600">Profesor: {nextAppointment.citas.professor.name}</p>
      <p className="text-gray-600">Modalidad: {nextAppointment.citas.mode}</p>
      <div className="mt-4">
        <button className="text-blue-500 mr-4">Cancelar</button>
        <button className="text-blue-500">Reprogramar</button>
      </div>
    </section>
  );
}

export default NextAppointment;
