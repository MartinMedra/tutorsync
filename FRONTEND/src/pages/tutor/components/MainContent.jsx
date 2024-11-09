import RequestedAppointments from "./RequestedAppointments";
import AvailabilityManagement from "./AvailabilityManagement";
import AppointmentHistory from "./AppointmentHistory";
// import QuickAccess from "./QuickAccess";
import ProfessorAvailability from "./ProfessorAvailability";
import { DisponibilidadProvider } from "../../../context/DisponibilidadContext/DispoContext";

function MainContent() {
  return (
    <main className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RequestedAppointments />
        <AvailabilityManagement />
        <DisponibilidadProvider professorId={2}>
          <ProfessorAvailability />
        </DisponibilidadProvider>
      </div>
      <AppointmentHistory />
    </main>
  );
}

export default MainContent;
