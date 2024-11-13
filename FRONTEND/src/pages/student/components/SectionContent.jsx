// components/SectionContent.js

import TutorCard from "./TutorCard";
import propTypes from "prop-types";

const tutors = [
  { name: "Juan Pérez", specialty: "Matemáticas", availability: "Lunes y Miércoles" },
  { name: "Ana López", specialty: "Inglés", availability: "Martes y Jueves" },
];

function SectionContent({ selectedSection }) {
  return (
    <section className="grid grid-cols-3 gap-6">
      {selectedSection === "Profesores Disponibles" &&
        tutors.map((tutor, index) => (
          <TutorCard key={index} tutor={tutor} />
        ))}
      {selectedSection === "Historial de Citas" && (
        <div className="col-span-3 text-center text-gray-500">
          Aquí se mostrarán las citas pasadas.
        </div>
      )}
      {selectedSection === "Solicitudes Pendientes" && (
        <div className="col-span-3 text-center text-gray-500">
          Aquí se mostrarán las solicitudes de cita pendientes.
        </div>
      )}
      {selectedSection === "Perfil" && (
        <div className="col-span-3 text-center text-gray-500">
          Aquí podrás ver y editar tu perfil.
        </div>
      )}
      {selectedSection === "Mensajes" && (
        <div className="col-span-3 text-center text-gray-500">
          Aquí podrás ver tus mensajes.
        </div>
      )}
    </section>
  );
}

SectionContent.propTypes = {
    selectedSection: propTypes.func.isRequired,
}

export default SectionContent;
