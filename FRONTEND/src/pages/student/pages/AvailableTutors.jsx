import { useState, useContext } from "react";
import Fuse from "fuse.js";
import { TutorContext } from "../../../context/TutorContext/TutorContext";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const AvailableTutors = () => {
  const { tutors, loading, error } = useContext(TutorContext); // Obtén los tutores del contexto
  const { user } = useContext(AuthContext); // Obtén el usuario autenticado del contexto
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [selectedDisponibilidad, setSelectedDisponibilidad] = useState(null);
  const [modalidad, setModalidad] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fuse = new Fuse(tutors, {
    keys: ["name"],
    includeScore: true,
  });

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      const searchResults = fuse.search(term).slice(0, 2);
      setResults(searchResults.map((result) => result.item));
    } else {
      setResults(tutors);
    }
  };

  const handleScheduleClick = async (tutor) => {
    setSelectedTutor(tutor);
    onOpen();

    try {
      const response = await axios.get(
        `http://localhost:3000/profesor/disponibilidad/${tutor.id}`
      );
      setDisponibilidades(response.data);
    } catch (error) {
      console.error("Error al obtener disponibilidad:", error);
    }
  };

  const handleDisponibilidadSelect = (disponibilidadId) => {
    setSelectedDisponibilidad(disponibilidadId);
  };

  const handleModalidadChange = (e) => {
    setModalidad(e.target.value);
  };

  const handleCitaConfirm = async () => {
    if (!user) {
      setSubmitError("Usuario no autenticado.");
      return;
    }

    const citaData = {
      studentId: user.id, // Obtén el studentId del contexto
      disponibilidadId: selectedDisponibilidad,
      mode: modalidad,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/citas",
        citaData
      );
      setSuccessMessage("¡Cita registrada exitosamente!");
      console.log("Cita registrada:", response.data);
      // Restablece el estado
      setSubmitError(null); //Limpia el error
    } catch (error) {
      setSubmitError("Error al registrar la cita.");
      console.error(error);
    }
  };

  const handleModalClose = () => {
    onOpenChange(false); // Cierra el modal
    setSuccessMessage(null); // Limpia el mensaje de éxito
    setSubmitError(null); // Limpia cualquier error
  };

  const formatFecha = (date) => {
    const options = { day: "numeric", month: "long" };
    return new Intl.DateTimeFormat("es-ES", options).format(new Date(date));
  };

  const formatHora = (time) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Intl.DateTimeFormat("es-ES", options).format(new Date(time));
  };

  if (loading) return <p>Cargando tutores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="flex flex-col gap-3">
        <input
          className="bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-rose-400 dark:shadow-md dark:shadow-purple-500"
          autoComplete="off"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Busca aquí tus tutores..."
        />
        <div>
          <ul className="grid grid-cols-3 gap-6">
            {results.map((item) => (
              <li key={item.id}>
                <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">
                    Materia: {item.subject || "Materia no especificada"}
                  </p>
                  <button
                    onClick={() => handleScheduleClick(item)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Agendar Cita
                  </button>

                  {/* Modal para disponibilidad y modalidad */}
                  {selectedTutor && (
                    <Modal
                      backdrop="blur"
                      isOpen={isOpen}
                      onOpenChange={handleModalClose}
                      placement="top-center"
                    >
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">
                              Disponibilidad de {selectedTutor?.name}
                            </ModalHeader>
                            <ModalBody>
                              {disponibilidades.length === 0 ? (
                                <p>No hay disponibilidades para este tutor.</p>
                              ) : (
                                <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                                  {disponibilidades.map((disponibilidad) => (
                                    <button
                                      key={disponibilidad.id}
                                      onClick={() =>
                                        handleDisponibilidadSelect(
                                          disponibilidad.id
                                        )
                                      }
                                      className={`px-3 py-2 rounded-md border ${
                                        selectedDisponibilidad ===
                                        disponibilidad.id
                                          ? "bg-blue-500 text-white"
                                          : "bg-gray-200 text-gray-700"
                                      } hover:bg-blue-300`}
                                    >
                                      {formatFecha(disponibilidad.date)}{" "}
                                      {formatHora(disponibilidad.startTime)}{" "}
                                      <br />{" "}
                                      {formatHora(disponibilidad.endTime)}
                                    </button>
                                  ))}
                                </div>
                              )}
                              {disponibilidades.length > 0 && (
                                <div className="mt-4">
                                  <label
                                    htmlFor="modalidad"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Modalidad
                                  </label>
                                  <select
                                    id="modalidad"
                                    value={modalidad}
                                    onChange={handleModalidadChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                  >
                                    <option value="">
                                      Selecciona Modalidad
                                    </option>
                                    <option value="Presencial">
                                      Presencial
                                    </option>
                                    <option value="Virtual">Virtual</option>
                                  </select>
                                </div>
                              )}
                              {successMessage && (
                                <p className="text-green-500 mt-4">
                                  {successMessage}
                                </p>
                              )}
                              {submitError && (
                                <p className="text-red-500 mt-4">
                                  {submitError}
                                </p>
                              )}
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="danger"
                                variant="flat"
                                onPress={onClose}
                              >
                                Cerrar
                              </Button>
                              <Button
                                color="primary"
                                onPress={handleCitaConfirm}
                                disabled={!modalidad || !selectedTutor}
                              >
                                Confirmar Cita
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AvailableTutors;
