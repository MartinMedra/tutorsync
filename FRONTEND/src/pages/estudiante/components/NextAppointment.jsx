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
  
          const citasFuturas = response.data.filter((cita) =>
            new Date(cita.date) >= new Date()
          );
  
          const citasOrdenadas = citasFuturas.sort((a, b) =>
            new Date(a.date + " " + a.startTime) - new Date(b.date + " " + b.startTime)
          );
  
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
    return <p><WarningCard  /></p>;
  }

  return (
    <section className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Próxima Cita</h2>
      <p className="text-gray-600">Fecha: {formatFecha(nextAppointment.date)}</p>
      <p className="text-gray-600">Hora: {formatHora(nextAppointment.startTime)}</p>
      <p className="text-gray-600">Profesor: {nextAppointment.professor.name}</p>
      <p className="text-gray-600">Modalidad: {nextAppointment.mode}</p>
      {nextAppointment.url === "" ? null : (
                  <a
                    href={nextAppointment.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500"
                  >
                    Enlace de la reunión
                  </a>
                )}
    </section>
  );
}

export default NextAppointment;
