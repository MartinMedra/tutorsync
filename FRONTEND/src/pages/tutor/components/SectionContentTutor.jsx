// components/SectionContent.js
import propTypes from "prop-types";
import AvailabilityManagement from "../pages/Appointments";
import ProfilePage from "../pages/TutorProfile";
import RequestPending from "../pages/RequestAppointments";
import AppoimentsHistory from "../pages/AppointmentsHistory";

function SectionContent({ selectedSection }) {


  return (
    <section className="">
      {selectedSection === "Gestion de Citas" && (
        <AvailabilityManagement />
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
    </section>
  );
}

SectionContent.propTypes = {
  selectedSection: propTypes.func.isRequired,
};

export default SectionContent;
