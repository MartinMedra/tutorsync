import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

const RequestedAppointments = () => {
    const { user } = useContext(AuthContext);
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Obtener todas las citas del profesor al cargar el componente
    useEffect(() => {
        if (user && user.role === "Tutor") {
            fetchCitas();
        }
    }, [user]);

    const fetchCitas = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/profesor/${user.id}/citas`);
            setCitas(response.data);
        } catch (error) {
            setError("Error al obtener citas");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Confirmar una cita
    const confirmCita = async (citaId) => {
        try {
            const response = await axios.put(`http://localhost:3000/citas/${citaId}/confirm`);
            const confirmedCita = response.data.citaConfirmada;

            setCitas((prevCitas) =>
                prevCitas.map((cita) =>
                    cita.id === confirmedCita.id
                        ? { ...cita, status: "confirmed" }
                        : cita.disponibilidadId === confirmedCita.disponibilidadId && cita.status === "pending"
                        ? { ...cita, status: "rejected" }
                        : cita
                )
            );
            setMessage("Cita confirmada y otras solicitudes rechazadas.");
        } catch (error) {
            setError("Error al confirmar la cita");
            console.error(error);
        }
    };

    return (
        <div className="manage-postulations">
            <h2>Postulaciones a Disponibilidad</h2>
            {message && <p>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {loading ? (
                <p>Cargando citas...</p>
            ) : citas.length > 0 ? (
                <ul>
                    {citas.map((cita) => (
                        <li key={cita.id}>
                            <p>Estudiante: {cita.student.name}</p>
                            <p>Fecha: {new Date(cita.date).toLocaleDateString()}</p>
                            <p>Hora: {new Date(cita.startTime).toLocaleTimeString()} - {new Date(cita.endTime).toLocaleTimeString()}</p>
                            <p>Modalidad: {cita.mode}</p>
                            <p>Estado: {cita.status}</p>
                            {cita.status === "pending" && (
                                <button onClick={() => confirmCita(cita.id)}>Confirmar Cita</button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay citas para mostrar.</p>
            )}
        </div>
    );
};

export default RequestedAppointments;
