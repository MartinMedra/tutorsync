import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import WarningCard from "./WarningCard";

function NextAppointment() {
  const { user } = useContext(AuthContext);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let interval;

    if (user) {
      async function fetchHistorial() {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:3000/citas/historial/${user.id}`
          );

          const now = new Date();

          // Filtrar las citas que ocurren a partir del momento actual
          const citasFuturas = response.data.filter((cita) => {
            const citaDateTime = new Date(`${cita.date}T${cita.startTime}`);
            return citaDateTime >= now; // Incluye citas del día de hoy si están en el futuro
          });

          // Ordenar las citas por fecha y hora
          const citasOrdenadas = citasFuturas.sort((a, b) => {
            const aDateTime = new Date(`${a.date}T${a.startTime}`);
            const bDateTime = new Date(`${b.date}T${b.startTime}`);
            return aDateTime - bDateTime;
          });

          setNextAppointment(citasOrdenadas[0] || null);
          setError(null);
        } catch (error) {
          setError(error.response?.data?.error || "Error al obtener las citas");
          console.error("Error en la solicitud:", error.message);
        } finally {
          setLoading(false);
        }
      }

      fetchHistorial();

      // Actualizar cada 30 segundos
      interval = setInterval(fetchHistorial, 30000);
    }

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [user]);

  const formatFecha = (date) => {
    const options = { day: "numeric", month: "long" };
    return new Intl.DateTimeFormat("es-ES", options).format(new Date(date));
  };

  const formatHora = (time) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Intl.DateTimeFormat("es-ES", options).format(new Date(time));
  };

  if (loading) {
    return <p>Cargando próxima cita...</p>;
  }

  if (error) {
    return <WarningCard message={error} />;
  }

  if (!nextAppointment) {
    return <p><WarningCard /></p>;
  }

  return (
    <section className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Próxima Cita</h2>
      <p className="text-gray-600">Fecha: {formatFecha(nextAppointment.date)}</p>
      <p className="text-gray-600">Hora: {formatHora(nextAppointment.startTime)}</p>
      <p className="text-gray-600">Profesor: {nextAppointment.professor.name}</p>
      <p className="text-gray-600">Modalidad: {nextAppointment.mode}</p>
    </section>
  );
}

export default NextAppointment;
