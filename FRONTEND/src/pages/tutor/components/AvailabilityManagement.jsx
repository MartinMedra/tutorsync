import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

const AvailabilityManagement = () => {
    const { user } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("17:00");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || user.role !== "Tutor") {
        setMessage("Solo los profesores pueden crear disponibilidad.");
        return;
    }

    // Combina la fecha con los tiempos de inicio y fin
    const startDateTime = new Date(`${date.toISOString().split("T")[0]}T${startTime}:00.000Z`);
    const endDateTime = new Date(`${date.toISOString().split("T")[0]}T${endTime}:00.000Z`);

    try {
        const response = await axios.post(
            "http://localhost:3000/profesor/disponibilidad",
            {
                date: date.toISOString(), // Enviar solo la fecha
                professorId: user.id,
                startTime: startDateTime, // Enviar como DateTime
                endTime: endDateTime, // Enviar como DateTime
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
        );

        setMessage("Disponibilidad creada con éxito.");
    } catch (error) {
        setMessage("Error al crear disponibilidad: " + error.response.data.error);
    }
};

    return (
        <form onSubmit={handleSubmit} className="disponibilidad-form">
            <h2>Crear Disponibilidad</h2>
            {message && <p>{message}</p>}

            <label>Fecha:</label>
            <DatePicker
                selected={date}
                onChange={(newDate) => setDate(newDate)}
                minDate={new Date()} // Restringir fechas anteriores
                dateFormat="yyyy-MM-dd"
            />

            <label>Hora de Inicio:</label>
            <TimePicker
                onChange={setStartTime}
                value={startTime}
                disableClock
            />

            <label>Hora de Fin:</label>
            <TimePicker
                onChange={setEndTime}
                value={endTime}
                disableClock
            />

            <button type="submit">Crear Disponibilidad</button>
        </form>
    );
};

export default AvailabilityManagement;
