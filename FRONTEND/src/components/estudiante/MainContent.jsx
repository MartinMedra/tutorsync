import TeacherSearch from "../estudiante/TeacherSearch";
import AppointmentHistory from "../estudiante/AppointmentHistory";
import Notifications from "../estudiante/Notifications";
import NextAppoiments from "../estudiante/NextAppoiments";
import { TutorProvider } from "../../context/TutorContext/TutorContext";

function MainContentStudent() {
  return (
    <main className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TutorProvider>
          <TeacherSearch />
        </TutorProvider>
        <NextAppoiments />
        <Notifications />
      </div>
      <AppointmentHistory />
    </main>
  );
}

export default MainContentStudent;
