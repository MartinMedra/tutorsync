
import RequestedAppointments from "./RequestedAppointments";
import AvailabilityManagement from "./AvailabilityManagement";
import AppointmentHistory from "./AppointmentHistory";
import QuickAccess from "./QuickAccess";


function MainContent() {
  return (
    <main className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RequestedAppointments />
        <AvailabilityManagement />
        <QuickAccess />
      </div>
      <AppointmentHistory />
    </main>
  );
}

export default MainContent;
