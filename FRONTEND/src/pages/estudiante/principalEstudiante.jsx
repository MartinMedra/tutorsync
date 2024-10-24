import NavigationEstudiante from "../../components/estudiante/navigationEstudiante";
import TabPrevProfesores from "../../components/estudiante/tablaPreviaProfesores";
import ListaPreviaCita from "../../components/estudiante/listaPreviaCita";
import { useEffect, useState } from "react";
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

axios.get

export default function PrincipalEstudiante() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tutores, setTutores] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState([]);
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [modalidad, setModalidad] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTutores = async () => {
      try {
        const response = await axios.get('http://localhost:3000/profesores');
        setTutores(response.data);
      } catch (error) {
        console.error('Error al obtener los profesores:', error);
        setError('Error al obtener los profesores');
      }
    };

    fetchTutores();

  }, []);

  const handleTutorChange = async (event) => {
    const profesorId = event.target.value;
    setSelectedTutor(profesorId);

    if (profesorId) {
      try {
        const response = await axios.get(`http://localhost:3000/profesor/disponibilidad/${profesorId}`);
        setDisponibilidades(response.data);
      } catch (error) {
        console.error('Error al obtener disponibilidad:', error);
      }
    } else {
      setDisponibilidades([]);
    }
  };

  return (
    <>
      <NavigationEstudiante />
      <div className="lg:mx-10 mx-3 my-3 flex flex-col gap-3 justify-center items-center ">
        <section className="Botones">
          <div className="flex gap-3 justify-center items-center">
            <Button onPress={onOpen} className="bg-rosado hover:bg-rosado-claro text-white font-bold py-2 px-4 rounded">
              Solicitar tutoría
            </Button>
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
                      Solicitar tutoría
                    </ModalHeader>
                    <ModalBody className="gap-0">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Docente</label>
                    <select onChange={handleTutorChange} value={selectedTutor} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option selected="">Selecciona el Docente</option>
                        {tutores.map((profesor) => (
                          <option key={profesor.id} value={profesor.id}>
                            {profesor.name}
                          </option>
                        ))}
                      </select>
                    <label htmlFor="category" className="mt-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Disponibilidad</label>
                        <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">Selecciona disponibilidad</option>
                            {disponibilidades.map((disponibilidad)=>(
                                <option key={disponibilidad.id} value={disponibilidad.id}>
                                  Fecha:{disponibilidad.date} Hora de inicio:{disponibilidad.startTime} - {disponibilidad.endTime}
                                </option>
                            ))}
                    </select>
                    <label htmlFor="category" className="mt-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modalidad</label>
                        <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">Selecciona Modalidad</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Virtual">Virtual</option>
                    </select>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Cerrar
                      </Button>
                      <Button color="primary" onPress={onClose}>
                        Apartar Cita
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <button className="bg-rosado hover:bg-rosado-claro text-white font-bold py-2 px-4 rounded">
              Ver tutorías
            </button>
          </div>
        </section>
        <hr className="w-full border-gray-300"></hr>
        <section className="ProxTutorias">
          <h1 className="text-2xl font-bold text-center">Próximas Tutorías</h1>
          <div className="flex gap-3 justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
              <h2 className="text-xl font-bold">Tutoría de Matemáticas</h2>
              <p>Fecha: 15/10/2021</p>
              <p>Hora: 10:00 am</p>
              <p>Profesor: Juan Perez</p>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center">
              <h2 className="text-xl font-bold">Tutoría de Física</h2>
              <p>Fecha: 20/10/2021</p>
              <p>Hora: 2:00 pm</p>
              <p>Profesor: Maria Gonzalez</p>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center">
              <h2 className="text-xl font-bold">Ver más</h2>
            </div>
          </div>
        </section>
        <section className="HistCitas">
          <div>
            <h1 className="text-xl font-bold">Ultimas citas</h1>
            <ListaPreviaCita />
          </div>
        </section>
        <section className="ProfDisponibles">
          <div>
            <h1 className="text-xl font-bold">Profesores disponibles</h1>
            <TabPrevProfesores />
          </div>
        </section>
      </div>
    </>
  );
}
