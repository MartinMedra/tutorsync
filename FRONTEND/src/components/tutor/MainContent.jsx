
import RequestedAppointments from "../tutor/RequestedAppointments";
import AvailabilityManagement from "../tutor/AvailabilityManagement";
import AppointmentHistory from "../tutor/AppointmentHistory";
import QuickAccess from "../tutor/QuickAccess";

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
