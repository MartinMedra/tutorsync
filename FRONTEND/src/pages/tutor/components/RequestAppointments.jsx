import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import CitaCard from "./CitaCard";
import ModalTutor from "./ModalTutor";

const RequestAppointments = () => {
  const { user } = useContext(AuthContext);
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estado para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

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
        citas: disponibilidad.Citas || [],
      }));
      setDisponibilidades(transformedData);
    } catch (error) {
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
      setModalContent("Disponibilidad eliminada.");
      setIsModalOpen(true);
    } catch (error) {
      setModalContent("Error al eliminar disponibilidad.");
      setIsModalOpen(true);
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

      setModalContent("Cita confirmada y otras solicitudes rechazadas.");
      setIsModalOpen(true);
    } catch (error) {
      setModalContent("Error al confirmar la cita.");
      setIsModalOpen(true);
      console.error(error);
    }
  };

  // Función para cerrar el modal
  const closeModalTutor = () => setIsModalOpen(false);

  return (
    <div className="availability-with-requests">
      <h2 className="mb-4 text-center font-semibold text-large">
        Disponibilidad con Solicitudes
      </h2>
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
                    <CitaCard
                      key={cita.id}
                      student={cita.student.name}
                      mode={cita.mode}
                      status={cita.status}
                      onAccept={() => confirmCita(cita.id, disponibilidad.id)}
                      onReject={() =>
                        setModalContent("Cita rechazada.") ||
                        setIsModalOpen(true)
                      }
                    />
                  ))
                ) : (
                  <p>Aún no hay solicitudes para esta disponibilidad.</p>
                )}
                {/* Botón para eliminar la disponibilidad */}
                <div className="mt-4 flex justify-end">
                <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => deleteDisponibilidad(disponibilidad.id)}
              >
                Eliminar
              </button>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : (
        <p className="font-extralight">No hay disponibilidades disponibles.</p>
      )}

      {/* Modal */}
      <ModalTutor isOpen={isModalOpen} closeModalTutor={closeModalTutor}>
        <p>{modalContent}</p>
        <button
          onClick={closeModalTutor}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Cerrar
        </button>
      </ModalTutor>
    </div>
  );
};

export default RequestAppointments;
