import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

const AvailabilityManagement = () => {
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.role !== "Tutor") {
      setMessage("Solo los profesores pueden crear disponibilidad.");
      return;
    }

    // Combina la fecha con los tiempos de inicio y fin
    const startDateTime = new Date(
      `${date.toISOString().split("T")[0]}T${startTime.toISOString().split("T")[1]}`
    );
    const endDateTime = new Date(
      `${date.toISOString().split("T")[0]}T${endTime.toISOString().split("T")[1]}`
    );

    // Validación: la hora de inicio debe ser anterior a la hora de fin
    if (startDateTime >= endDateTime) {
      setMessage("La hora de inicio debe ser anterior a la hora de fin.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/profesor/disponibilidad",
        {
          date: date.toISOString(),
          professorId: user.id,
          startTime: startDateTime,
          endTime: endDateTime,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setMessage("Disponibilidad creada con éxito.");
    } catch (error) {
      setMessage("Error al crear disponibilidad: " + error.response?.data?.error || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="disponibilidad-form">
      <h2 className="font-semibold">Crear Disponibilidad</h2>
      {message && <p>{message}</p>}

      <div className="flex justify-evenly">
        <div>
          <DatePicker
            selected={date}
            onChange={(newDate) => setDate(newDate)}
            minDate={new Date()}
            dateFormat="yyyy-MM-dd"
            inline
          />
        </div>
        <div className="flex flex-col justify-evenly">
          <div className="flex flex-col gap-2">
            <label className="text-green-400">Hora Inicio:</label>
            <DatePicker
              selected={startTime}
              onChange={(newTime) => setStartTime(newTime)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Hora"
              dateFormat="h:mm aa"
              className="w-full px-6 py-3 text-black bg-white border cursor-pointer border-green-400 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-red-400">Hora Fin:</label>
            <DatePicker
              selected={endTime}
              onChange={(newTime) => setEndTime(newTime)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Hora"
              dateFormat="h:mm aa"
              className="w-full px-6 py-3 text-black bg-white border cursor-pointer border-red-400 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="buttonHero inline-flex text-white bg-rosado border-0 py-2 px-6 focus:outline-none hover:border-1 hover:border-rosado hover:text-rosado rounded text-lg"
        >
          Crear Disponibilidad
        </button>
      </div>
    </form>
  );
};

export default AvailabilityManagement;

