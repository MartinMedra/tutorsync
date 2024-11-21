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
    if (user) {
      async function fetchHistorial() {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:3000/citas/historial/${user.id}`
          );

          // Filtrar las citas futuras
          const citasFuturas = response.data.filter((cita) => 
            new Date(cita.date) >= new Date()
          );

          // Ordenar las citas por fecha y hora
          const citasOrdenadas = citasFuturas.sort((a, b) => 
            new Date(a.date + " " + a.startTime) - new Date(b.date + " " + b.startTime)
          );

          // Seleccionar la cita más próxima
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
    }
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
    return <p><WarningCard  /></p>;
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
