// components/RightPanel.js
import propTypes from "prop-types";

function RightPanel({ selectedSection }) {
  return (
    <aside className="w-full md:w-1/4 bg-white p-5 shadow-md border-t md:border-t-0 md:border-l border-gray-200">
    <h3 className="text-xl font-semibold mb-4">Detalles</h3>
    {selectedSection === "Profesores Disponibles" && (
      <div className="text-gray-600">
        <p>Selecciona un profesor para ver sus detalles.</p>
      </div>
    )}
    {selectedSection === "Historial de Citas" && (
      <div className="text-gray-600">
        <p>Selecciona una cita para ver más detalles.</p>
      </div>
    )}
    {selectedSection === "Solicitudes Pendientes" && (
      <div className="text-gray-600">
        <p>Selecciona una solicitud para ver más detalles.</p>
      </div>
    )}
    {selectedSection === "Perfil" && (
      <div className="text-gray-600">
        <p>Aquí podrás editar tus datos personales.</p>
      </div>
    )}
    {selectedSection === "Mensajes" && (
      <div className="text-gray-600">
        <p>Aquí podrás ver tus conversaciones.</p>
      </div>
    )}
  </aside>
  );
}

RightPanel.propTypes = {
  selectedSection: propTypes.func.isRequired,
};

export default RightPanel;
