import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

const AvailabilityWithRequests = () => {
  const { user } = useContext(AuthContext);
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user && user.role === "Tutor") {
      fetchDisponibilidades();
    }
  }, [user]);

  // Obtener disponibilidades con citas asociadas
  const fetchDisponibilidades = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/profesor/disponibilidad-con-citas/${user.id}`);
      setDisponibilidades(response.data); // Este endpoint debería devolver disponibilidades con sus citas relacionadas
    } catch (error) {
      setError("Error al cargar disponibilidades y citas");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar una disponibilidad
  const deleteDisponibilidad = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/profesor/disponibilidad/${id}`);
      setDisponibilidades((prev) => prev.filter((item) => item.id !== id));
      setMessage("Disponibilidad eliminada.");
    } catch (error) {
      setError("Error al eliminar disponibilidad");
      console.error(error);
    }
  };

  // Confirmar una cita
  const confirmCita = async (citaId, disponibilidadId) => {
    try {
      const response = await axios.put(`http://localhost:3000/citas/${citaId}/confirm`);
      const confirmedCita = response.data.citaConfirmada;

      // Actualizar el estado local
      setDisponibilidades((prev) =>
        prev.map((disponibilidad) =>
          disponibilidad.id === disponibilidadId
            ? {
                ...disponibilidad,
                citas: disponibilidad.citas.map((cita) =>
                  cita.id === confirmedCita.id
                    ? { ...cita, status: "confirmed" }
                    : cita.status === "pending"
                    ? { ...cita, status: "rejected" }
                    : cita
                ),
              }
            : disponibilidad
        )
      );

      setMessage("Cita confirmada y otras solicitudes rechazadas.");
    } catch (error) {
      setError("Error al confirmar la cita");
      console.error(error);
    }
  };

  return (
    <div className="availability-with-requests">
      <h2>Disponibilidad con Solicitudes</h2>
      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Cargando...</p>
      ) : disponibilidades.length > 0 ? (
        <div>
          {disponibilidades.map((disponibilidad) => (
            <div key={disponibilidad.id} className="disponibilidad-card">
              <h3>
                Fecha: {new Date(disponibilidad.date).toLocaleDateString()} | Horario:{" "}
                {new Date(disponibilidad.startTime).toLocaleTimeString()} -{" "}
                {new Date(disponibilidad.endTime).toLocaleTimeString()}
              </h3>
              <button onClick={() => deleteDisponibilidad(disponibilidad.id)}>Eliminar Disponibilidad</button>

              <div className="citas-list">
                {disponibilidad.citas.length > 0 ? (
                  disponibilidad.citas.map((cita) => (
                    <div key={cita.id} className="cita-item">
                      <p>Estudiante: {cita.student.name}</p>
                      <p>Modalidad: {cita.mode}</p>
                      <p>Estado: {cita.status}</p>
                      {cita.status === "pending" && (
                        <button onClick={() => confirmCita(cita.id, disponibilidad.id)}>Confirmar Cita</button>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No hay solicitudes para esta disponibilidad.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay disponibilidades para mostrar.</p>
      )}
    </div>
  );
};

export default AvailabilityWithRequests;
