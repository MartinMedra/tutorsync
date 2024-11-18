import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext/AuthContext"; // Ajusta la ruta según tu estructura de archivos
import axios from "axios";

const RequestPending = () => {
  const { user, loading } = useContext(AuthContext); // Obtener el usuario del contexto
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      if (!user || loading) return; // Esperar a que el usuario esté disponible
      try {
        const response = await axios.get(
          `http://localhost:3000/citas/pendientes/${user.id}`
        );
        setSolicitudes(response.data);
      } catch (err) {
        console.error("Error al obtener las solicitudes:", err);
        setError("No se pudieron cargar las solicitudes.");
      }
    };

    fetchSolicitudes();
  }, [user, loading]);

  // Función para eliminar una solicitud
  const eliminarSolicitud = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deletecitas/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSolicitudes(solicitudes.filter((solicitud) => solicitud.id !== id)); // Actualiza el estado
      alert("Solicitud eliminada con éxito.");
    } catch (err) {
      console.error("Error al eliminar la solicitud:", err);
      alert("No se pudo eliminar la solicitud.");
    }
  };

  if (loading) {
    return <p>Cargando...</p>; // Mostrar un estado de carga mientras se obtienen los datos
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Mostrar error si ocurre
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Solicitudes Pendientes</h1>
      {solicitudes.length > 0 ? (
        <ul className="space-y-4">
          {solicitudes.map((solicitud) => (
            <li
              key={solicitud.id}
              className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">
                  Profesor: {solicitud.professor.name}
                </h2>
                <p>Asignatura: {solicitud.professor.subject}</p>
                <p>Fecha: {new Date(solicitud.date).toLocaleDateString()}</p>
                <p>
                  Hora:{" "}
                  {new Date(solicitud.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(solicitud.endTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>Modalidad: {solicitud.mode}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-yellow-500 font-bold">Pendiente</span>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => eliminarSolicitud(solicitud.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes solicitudes pendientes.</p>
      )}
    </div>
  );
};

export default RequestPending;
