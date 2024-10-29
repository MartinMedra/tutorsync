import TeacherSearch from "../estudiante/TeacherSearch";
import AppointmentHistory from "../estudiante/AppointmentHistory";
import Notifications from "../estudiante/Notifications";

function MainContentStudent() {
  return (
    <main className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TeacherSearch />
        <Notifications />
      </div>
      <AppointmentHistory />
    </main>
  );
}

export default MainContentStudent;
