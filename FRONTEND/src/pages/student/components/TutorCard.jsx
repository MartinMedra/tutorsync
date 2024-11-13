// components/TutorCard.js
import propTypes from "prop-types";

function TutorCard({ tutor }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800">{tutor.name}</h3>
      <p className="text-gray-600">Especialidad: {tutor.specialty}</p>
      <p className="text-gray-600">Disponibilidad: {tutor.availability}</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Agendar Cita
      </button>
    </div>
  );
}

TutorCard.propTypes = {
  tutor: propTypes.shape({
    name: propTypes.string.isRequired,
    specialty: propTypes.string.isRequired,
    availability: propTypes.string.isRequired,
  }).isRequired,
};

export default TutorCard;
