import { useState, useContext } from "react";
import Fuse from "fuse.js";
import { TutorContext } from "../../../context/TutorContext/TutorContext";
import { AuthContext } from "../../../context/AuthContext/AuthContext"; // Importa tu contexto de autenticación
import axios from "axios";
import { useEffect } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

function TeacherSearch() {
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

  // Cargar los tutores predeterminados al iniciar
  useEffect(() => {
  console.log("Tutores cargados desde el contexto:", tutors);
  setResults(tutors);
}, [tutors]);


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
      setSelectedTutor(null);
      setDisponibilidades([]);
      setModalidad("");
      setSelectedDisponibilidad(null);
      onOpenChange(false); // Cierra el modal
    } catch (error) {
      setSubmitError("Error al registrar la cita.");
      console.error(error);
    }
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Buscar Profesores
      </h2>
      <input
        type="text"
        className="w-full p-2 border rounded-md mb-4"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Busca aquí..."
      />
      <ul>
        {results.map((item) => (
          <li className="flex justify-between items-center mb-2" key={item.id}>
            <div className="Tutorcard">
              <div className="card__img">
                <svg
                  className="w-[540] h-[450] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>
              <div className="card__title">{item.name}</div>
              <div className="card__subtitle">{item.subject || 'No especificada'}</div>
              <div className="card__wrapper">
                <button onClick={() => handleScheduleClick(item)} className="card__btn card__btn-solid">Agendar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal para disponibilidad y modalidad */}
      {selectedTutor && (
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
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
                            handleDisponibilidadSelect(disponibilidad.id)
                          }
                          className={`px-3 py-2 rounded-md border ${
                            selectedDisponibilidad === disponibilidad.id
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          } hover:bg-blue-300`}
                        >
                          {formatFecha(disponibilidad.date)}{" "}
                          {formatHora(disponibilidad.startTime)} <br />{" "}
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
                        required
                        onChange={handleModalidadChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      >
                        <option value="">Selecciona Modalidad</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Virtual">Virtual</option>
                      </select>
                    </div>
                  )}
                  {successMessage && (
                    <p className="text-green-500 mt-4">{successMessage}</p>
                  )}
                  {submitError && (
                    <p className="text-red-500 mt-4">{submitError}</p>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
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
  );
}

export default TeacherSearch;
