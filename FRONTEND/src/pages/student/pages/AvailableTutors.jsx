import { useState, useContext } from "react";
import Fuse from "fuse.js";
import { TutorContext } from "../../../context/TutorContext/TutorContext";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import NextAppointment from "../../estudiante/components/NextAppointment.jsx";
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
import { useEffect } from "react";

const AvailableTutors = () => {
  const { tutors, loading, error } = useContext(TutorContext); // Obtén los tutores del contexto
  const { user } = useContext(AuthContext); // Obtén el usuario autenticado del contexto
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [selectedDisponibilidad, setSelectedDisponibilidad] = useState(null);
  const [modalidad, setModalidad] = useState("");
  const [phone, setPhone] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fuse = new Fuse(tutors, {
    keys: ["name"],
    includeScore: true,
  });

  useEffect(() => {
    console.log("Tutores cargados desde el contexto:", tutors);
    setResults(tutors);
  }, [tutors]);

  const isFormValid = () => {
    return (
      modalidad &&
      phone &&
      phone.length === 10 && // Asegúrate de que el número tiene 10 dígitos
      selectedDisponibilidad &&
      selectedTutor
    );
  };


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

  const handlePhoneChange = (e) => {
    const input = e.target.value;
  
    // Permitir solo dígitos y limitar a 10 caracteres
    if (/^\d*$/.test(input) && input.length <= 10) {
      setPhone(input);
    }

    setPhone(e.target.value);
  };

  const handleCitaConfirm = async () => {
    if (!user) {
      setSubmitError("Usuario no autenticado.");
      return;
    }

    if (!isFormValid()) {
      setSubmitError("Por favor, completa todos los campos antes de confirmar.");
      return;
    }

    setSubmitError(""); // Resetea errores si el envío es exitoso

    const citaData = {
      studentId: user.id, // Obtén el studentId del contexto
      disponibilidadId: selectedDisponibilidad,
      mode: modalidad,
      phone: phone,
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
    <div className="mb-5">
      <NextAppointment />
    </div>

      <div className="flex flex-col gap-3">
        <input
          className="bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadowLg focus:shadow-rose-400 dark:shadow-md dark:shadow-purple-500"
          autoComplete="off"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Busca aquí tus tutores..."
        />
        <div>
          <ul className="grid grid-cols-3 gap-1">
            {results.length === 0 && (
              <p className="text-gray-500 font-light dark:text-gray-400">
                No hay tutores disponibles.
              </p>
            )}
            {results.map((item) => (
              <li key={item.id}>
                <div className="Tutorcard">
    <div className="card__img"><svg width="100%" xmlns="http://www.w3.org/2000/svg"><rect height="350" width="440" fill="#ffffff"></rect><defs><linearGradient gradientTransform="rotate(222,648,379)" y2="100%" y1="0" x2="0" x1="0" gradientUnits="userSpaceOnUse" id="a"><stop stopColor="#ffffff" offset="0"></stop><stop stop-color="#FC726E" offset="1"></stop></linearGradient><pattern viewBox="0 0 1080 900" y="0" x="0" height="250" width="300" id="b" patternUnits="userSpaceOnUse"><g fill-opacity="0.5"><polygon points="90 150 0 300 180 300" fill="#444"></polygon><polygon points="90 150 180 0 0 0"></polygon><polygon points="270 150 360 0 180 0" fill="#AAA"></polygon><polygon points="450 150 360 300 540 300" fill="#DDD"></polygon><polygon points="450 150 540 0 360 0" fill="#999"></polygon><polygon points="630 150 540 300 720 300"></polygon><polygon points="630 150 720 0 540 0" fill="#DDD"></polygon><polygon points="810 150 720 300 900 300" fill="#444"></polygon><polygon points="810 150 900 0 720 0" fill="#FFF"></polygon><polygon points="990 150 900 300 1080 300" fill="#DDD"></polygon><polygon points="990 150 1080 0 900 0" fill="#444"></polygon><polygon points="90 450 0 600 180 600" fill="#DDD"></polygon><polygon points="90 450 180 300 0 300"></polygon><polygon points="270 450 180 600 360 600" fill="#666"></polygon><polygon points="270 450 360 300 180 300" fill="#AAA"></polygon><polygon points="450 450 360 600 540 600" fill="#DDD"></polygon><polygon points="450 450 540 300 360 300" fill="#999"></polygon><polygon points="630 450 540 600 720 600" fill="#999"></polygon><polygon points="630 450 720 300 540 300" fill="#FFF"></polygon><polygon points="810 450 720 600 900 600"></polygon><polygon points="810 450 900 300 720 300" fill="#DDD"></polygon><polygon points="990 450 900 600 1080 600" fill="#AAA"></polygon><polygon points="990 450 1080 300 900 300" fill="#444"></polygon><polygon points="90 750 0 900 180 900" fill="#222"></polygon><polygon points="270 750 180 900 360 900"></polygon><polygon points="270 750 360 600 180 600" fill="#DDD"></polygon><polygon points="450 750 540 600 360 600"></polygon><polygon points="630 750 540 900 720 900"></polygon><polygon points="630 750 720 600 540 600" fill="#444"></polygon><polygon points="810 750 720 900 900 900" fill="#AAA"></polygon><polygon points="810 750 900 600 720 600" fill="#666"></polygon><polygon points="990 750 900 900 1080 900" fill="#999"></polygon><polygon points="180 0 90 150 270 150" fill="#999"></polygon><polygon points="360 0 270 150 450 150" fill="#444"></polygon><polygon points="540 0 450 150 630 150" fill="#FFF"></polygon><polygon points="900 0 810 150 990 150"></polygon><polygon points="0 300 -90 450 90 450" fill="#222"></polygon><polygon points="0 300 90 150 -90 150" fill="#FFF"></polygon><polygon points="180 300 90 450 270 450" fill="#FFF"></polygon><polygon points="180 300 270 150 90 150" fill="#666"></polygon><polygon points="360 300 270 450 450 450" fill="#222"></polygon><polygon points="360 300 450 150 270 150" fill="#FFF"></polygon><polygon points="540 300 450 450 630 450" fill="#444"></polygon><polygon points="540 300 630 150 450 150" fill="#222"></polygon><polygon points="720 300 630 450 810 450" fill="#AAA"></polygon><polygon points="720 300 810 150 630 150" fill="#666"></polygon><polygon points="900 300 810 450 990 450" fill="#FFF"></polygon><polygon points="900 300 990 150 810 150" fill="#999"></polygon><polygon points="0 600 -90 750 90 750"></polygon><polygon points="0 600 90 450 -90 450" fill="#666"></polygon><polygon points="180 600 90 750 270 750" fill="#AAA"></polygon><polygon points="180 600 270 450 90 450" fill="#444"></polygon><polygon points="360 600 270 750 450 750" fill="#444"></polygon><polygon points="360 600 450 450 270 450" fill="#999"></polygon><polygon points="540 600 630 450 450 450" fill="#666"></polygon><polygon points="720 600 630 750 810 750" fill="#222"></polygon><polygon points="900 600 810 750 990 750" fill="#FFF"></polygon><polygon points="900 600 990 450 810 450" fill="#222"></polygon><polygon points="0 900 90 750 -90 750" fill="#DDD"></polygon><polygon points="180 900 270 750 90 750" fill="#444"></polygon><polygon points="360 900 450 750 270 750" fill="#FFF"></polygon><polygon points="540 900 630 750 450 750" fill="#AAA"></polygon><polygon points="720 900 810 750 630 750" fill="#FFF"></polygon><polygon points="900 900 990 750 810 750" fill="#222"></polygon><polygon points="1080 300 990 450 1170 450" fill="#222"></polygon><polygon points="1080 300 1170 150 990 150" fill="#FFF"></polygon><polygon points="1080 600 990 750 1170 750"></polygon><polygon points="1080 600 1170 450 990 450" fill="#666"></polygon><polygon points="1080 900 1170 750 990 750" fill="#DDD"></polygon></g></pattern></defs><rect height="100%" width="100%" fill="url(#a)" y="0" x="0"></rect><rect height="100%" width="100%" fill="url(#b)" y="0" x="0"></rect></svg></div>
    <div className="card__avatar">
    <svg className=" text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>

    </div>
    <div className="card__title">{item.name}</div>
    <div className="card__subtitle">{item.subject || "Materia no especificada"}
    </div>
    <div className="card__wrapper">
        <button  onClick={() => handleScheduleClick(item)} className="card__btn card__btn-solid">Agendar</button>
    </div>
</div>

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
                                    required
                                    onChange={handleModalidadChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm roundedLg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                  >
                                    <option value="">
                                      Selecciona Modalidad
                                    </option>
                                    <option value="Presencial">
                                      Presencial
                                    </option>
                                    <option value="Virtual">Virtual</option>
                                  </select>

                                  <div className="relative mt-3">
                                    <div className=" absolute left-2 -translate-y-1/2 top-1/2 p-1">
                                      <svg
                                        className="w-[16px] h-[16px] text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="17"
                                        height="17"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"
                                        />
                                      </svg>
                                    </div>
                                    <input
                                      className="input rounded-full w-full px-8 py-3 border-1 focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
                                      placeholder="¿Cuál es tu número de teléfono?"
                                      required
                                      value={phone}
                                      onChange={handlePhoneChange}
                                      type="text" // Usa "text" en lugar de "number" para controlar la longitud
                                      maxLength={10} 
                                    />
                                  </div>
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
                                disabled={!isFormValid()}
                              >
                                Confirmar Cita
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AvailableTutors;
