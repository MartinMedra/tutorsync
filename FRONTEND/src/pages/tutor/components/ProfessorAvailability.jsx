import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

const AvailabilityManagement = () => {
    const { user } = useContext(AuthContext);
    const [disponibilidad, setDisponibilidad] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Obtener la disponibilidad del profesor al cargar el componente
    useEffect(() => {
        if (user && user.role === "Tutor") {
            fetchDisponibilidad();
        }
    }, [user]);

    const fetchDisponibilidad = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/profesor/disponibilidad/${user.id}`);
            setDisponibilidad(response.data);
        } catch (error) {
            setError("Error al obtener disponibilidad");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    

    // Eliminar una disponibilidad
    const deleteDisponibilidad = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/profesor/disponibilidad/${id}`);
            setDisponibilidad((prev) => prev.filter((item) => item.id !== id));
            setMessage("Disponibilidad eliminada.");
        } catch (error) {
            setError("Error al eliminar disponibilidad");
            console.error(error);
        }
    };

    return (
        <div className="disponibilidad-management">
            <h2>Disponibilidad del Profesor</h2>
            {message && <p>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Mostrar lista de disponibilidades */}
            {loading ? (
                <p>Cargando...</p>
            ) : disponibilidad.length > 0 ? (
                <ul>
                    {disponibilidad.map((slot) => (
                        <li key={slot.id}>
                            Fecha: {new Date(slot.date).toLocaleDateString()} | Desde: {new Date(slot.startTime).toLocaleTimeString()} | Hasta: {new Date(slot.endTime).toLocaleTimeString()}
                            <button onClick={() => deleteDisponibilidad(slot.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay disponibilidad para mostrar.</p>
            )}
        </div>
    );
};

export default AvailabilityManagement;
