import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import DeleteButton from "../../../components/deleteButton";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import CitaCard from "./CitaCard";
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
      const response = await axios.get(
        `http://localhost:3000/profesor/disponibilidad-con-solicitudes/${user.id}`
      );
      const transformedData = response.data.map((disponibilidad) => ({
        ...disponibilidad,
        citas: disponibilidad.Citas || [], // Aseguramos que siempre haya un arreglo `citas`
      }));
      setDisponibilidades(transformedData);
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
      const response = await axios.put(
        `http://localhost:3000/citas/${citaId}/confirm`
      );
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
      <h2 className="mb-4 text-center font-semibold text-large">
        Disponibilidad con Solicitudes
      </h2>
      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Cargando...</p>
      ) : disponibilidades.length > 0 ? (
        <div>
          <Accordion
            defaultExpandedKeys={disponibilidades.map((d) => String(d.id))}
          >
            {disponibilidades.map((disponibilidad) => (
              <AccordionItem
                key={disponibilidad.id}
                subtitle={`De ${format(
                  new Date(disponibilidad.startTime),
                  "hh:mm a"
                )} a ${format(new Date(disponibilidad.endTime), "hh:mm a")}`}
                title={format(
                  new Date(disponibilidad.date),
                  "EEEE, d 'de' MMMM",
                  { locale: es }
                )}
              >
                {disponibilidad.citas.length > 0 ? (
                  disponibilidad.citas.map((cita) => (
                    <CitaCard key={cita.id}
        student={cita.student.name}
        mode={cita.mode}
        status={cita.status}
        onAccept={() => confirmCita(cita.id, disponibilidad.id)}
        onReject={() => alert('Cita rechazada')}
      />
                    
                  ))
                ) : (
                  <p>No hay solicitudes para esta disponibilidad.</p>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : (
        <p>No hay disponibilidades disponibles.</p>
      )}
    </div>
  );
};

export default AvailabilityWithRequests;
