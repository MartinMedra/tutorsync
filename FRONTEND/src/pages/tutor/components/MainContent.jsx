import SectionContent from "./SectionContentTutor";
import propTypes from "prop-types";

function MainContent({ selectedSection }) {
  return (
    <main className="p-4 md:p-8">
      <SectionContent selectedSection={selectedSection} />
    </main>
  );
}

MainContent.propTypes = {
    selectedSection: propTypes.func.isRequired,
}

export default MainContent;



// import RequestedAppointments from "./RequestedAppointments";
  // import AvailabilityManagement from "./AvailabilityManagement";
  // import AppointmentHistory from "./AppointmentHistory";
  // // import QuickAccess from "./QuickAccess";
  // import ProfessorAvailability from "./ProfessorAvailability";
  // import { DisponibilidadProvider } from "../../../context/DisponibilidadContext/DispoContext";
  // import { AuthContext } from "../../../context/AuthContext/AuthContext";
  // import { useContext } from "react";

  // function MainContent() {
  // const { user } = useContext(AuthContext);

  //   return (
  //     <main className="p-6 space-y-6">
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //         <RequestedAppointments />
  //         <AvailabilityManagement />
  //         <DisponibilidadProvider professorId={user.id}>
  //           <ProfessorAvailability />
  //         </DisponibilidadProvider>
  //       </div>
  //       <AppointmentHistory />
  //     </main>
  //   );
  // }

  // export default MainContent;
