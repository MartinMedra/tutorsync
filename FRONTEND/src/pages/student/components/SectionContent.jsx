// components/SectionContent.js
import propTypes from "prop-types";
import AvailableTutors from "../pages/AvailableTutors";
import ProfilePage from "../pages/UserProfile";
import RequestPending from "../pages/RequestPending";
import AppoimentsHistory from "../pages/AppointmentsHistory";
import Chat from "../pages/Chat";

function SectionContent({ selectedSection }) {


  return (
    <section className="">
      {selectedSection === "Profesores Disponibles" && (
        <AvailableTutors />
      )}
      {selectedSection === "Historial de Citas" && (
        <div className="col-span-3 text-center text-gray-500">
          <AppoimentsHistory />
        </div>
      )}
      {selectedSection === "Solicitudes Pendientes" && (
        <div className="col-span-3 text-center text-gray-500">
          <RequestPending />
        </div>
      )}
      {selectedSection === "Perfil" && (
        <div className="col-span-3 text-center text-gray-500">
          <ProfilePage />
        </div>
      )}
      {selectedSection === "Chat" && (
        <div className="col-span-3 text-center text-gray-500">
          <Chat />
        </div>
      )}
    </section>
  );
}

SectionContent.propTypes = {
  selectedSection: propTypes.func.isRequired,
};

export default SectionContent;
