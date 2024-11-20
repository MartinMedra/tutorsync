import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { useAlert } from "../../../context/AlertContext"; // Importar el contexto de alertas
import { Accordion, AccordionItem } from "@nextui-org/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import CitaCard from "./CitaCard";

const RequestAppointments = () => {
  const { user } = useContext(AuthContext);
  const { showAlert } = useAlert(); // Acceso al método para mostrar alertas
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      showAlert("Error al cargar disponibilidades.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar una disponibilidad
  const deleteDisponibilidad = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/profesor/disponibilidad/${id}`);
      setDisponibilidades((prev) => prev.filter((item) => item.id !== id));
      showAlert("Disponibilidad eliminada con éxito.", "success");
    } catch (error) {
      showAlert("La disponibilidad ya tiene estudiantes asociados", "failure");
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

      showAlert(
        "Cita confirmada y otras solicitudes rechazadas automáticamente.",
        "success"
      );
    } catch (error) {
      showAlert("Error al confirmar la cita.", "failure");
      console.error(error);
    }
  };

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
                      citaId={cita.id}
                      student={cita.student.name}
                      mode={cita.mode}
                      status={cita.status}
                      phone={cita.phone}
                      actuallyUrl={cita.url}
                      onAccept={() => confirmCita(cita.id, disponibilidad.id)}
                      onReject={() =>
                        showAlert("Cita rechazada.", "info")
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
    </div>
  );
};

export default RequestAppointments;
