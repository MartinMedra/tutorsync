import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext/AuthContext"; // Ajusta la ruta según tu estructura
import axios from "axios";

const AppoimentsHistory = () => {
  const { user, loading } = useContext(AuthContext);
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistorial = async () => {
      if (!user || loading) return; // Esperar a que el usuario esté disponible
      try {
        const response = await axios.get(
          `http://localhost:3000/citas/historial/profesor/${user.id}`
        );
        setCitas(response.data);
      } catch (err) {
        console.error("Error al obtener el historial de citas:", err);
        setError("No se pudo cargar el historial.");
      }
    };

    fetchHistorial();
  }, [user, loading]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Historial de Citas</h1>
      {citas.length > 0 ? (
        <ul className="space-y-4">
          {citas.map((cita) => (
            <li
              key={cita.id}
              className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">
                  Profesor: {cita.student.name}
                </h2>
                <p>Fecha: {new Date(cita.date).toLocaleDateString()}</p>
                <p>
                  Hora:{" "}
                  {new Date(cita.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(cita.endTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>Modalidad: {cita.mode}</p>
              </div>
              <span className="text-green-500 font-bold">Confirmada</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes citas confirmadas en tu historial.</p>
      )}
    </div>
  );
};

export default AppoimentsHistory;
