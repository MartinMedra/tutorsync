import { useState, useContext } from 'react';
import Fuse from 'fuse.js';
import { TutorContext } from '../../../context/TutorContext/TutorContext';
import { AuthContext } from '../../../context/AuthContext/AuthContext'; // Importa tu contexto de autenticación
import axios from 'axios';

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
  const { tutors, loading, error } = useContext(TutorContext);
  const { user } = useContext(AuthContext); // Obtén el usuario autenticado del contexto
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [selectedDisponibilidad, setSelectedDisponibilidad] = useState(null);
  const [modalidad, setModalidad] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fuse = new Fuse(tutors, {
    keys: ['name'],
    includeScore: true,
  });

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      const searchResults = fuse.search(term).slice(0, 2);
      setResults(searchResults.map(result => result.item));
    } else {
      setResults(tutors);
    }
  };

  const handleScheduleClick = async (tutor) => {
    setSelectedTutor(tutor);
    onOpen();

    try {
      const response = await axios.get(`http://localhost:3000/profesor/disponibilidad/${tutor.id}`);
      setDisponibilidades(response.data);
    } catch (error) {
      console.error('Error al obtener disponibilidad:', error);
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
      const response = await axios.post("http://localhost:3000/citas", citaData);
      setSuccessMessage("¡Cita registrada exitosamente!");
      console.log("Cita registrada:", response.data);
      // Restablece el estado
      setSelectedTutor(null);
      setDisponibilidades([]);
      setModalidad('');
      setSelectedDisponibilidad(null);
      onOpenChange(false); // Cierra el modal
    } catch (error) {
      setSubmitError("Error al registrar la cita.");
      console.error(error);
    }
  };

  const formatFecha = (date) => {
    const options = { day: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('es-ES', options).format(new Date(date));
  };
  
  const formatHora = (time) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Intl.DateTimeFormat('es-ES', options).format(new Date(time));
  };
  
  if (loading) return <p>Cargando tutores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Buscar Profesores</h2>
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
            <div>
              <p className="font-medium text-gray-700">Profesor: {item.name}</p>
              <p className="text-gray-500">Materia: {item.subject || 'No especificada'}</p>
            </div>
            <button
              onClick={() => handleScheduleClick(item)}
              className="text-blue-500 font-semibold hover:text-blue-700"
            >
              Agendar
            </button>
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
                          onClick={() => handleDisponibilidadSelect(disponibilidad.id)}
                          className={`px-3 py-2 rounded-md border ${selectedDisponibilidad === disponibilidad.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-300`}
                        >
                          {formatFecha(disponibilidad.date)}  {formatHora(disponibilidad.startTime)} <br /> {formatHora(disponibilidad.endTime)}
                        </button>
                      ))}
                    </div>
                  )}
                  {disponibilidades.length > 0 && (
                    <div className="mt-4">
                      <label htmlFor="modalidad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modalidad</label>
                      <select
                        id="modalidad"
                        value={modalidad}
                        onChange={handleModalidadChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      >
                        <option value="">Selecciona Modalidad</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Virtual">Virtual</option>
                      </select>
                    </div>
                  )}
                  {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
                  {submitError && <p className="text-red-500 mt-4">{submitError}</p>}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" onPress={handleCitaConfirm} disabled={!modalidad || !selectedTutor}>
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
