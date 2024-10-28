import Header from "../../components/estudiante/header";
import NextAppointment from "../../components/estudiante/NextAppointment";
import TeacherSearch from "../../components/estudiante/TeacherSearch";
import AppointmentHistory from "../../components/estudiante/AppointmentHistory";
import QuickSchedule from "../../components/estudiante/QuickSchedule";

function StudentHome() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      <main className="p-4 space-y-8">
        <NextAppointment />
        <TeacherSearch />
        <AppointmentHistory />
        <QuickSchedule />
      </main>
    </div>
  );
}

export default StudentHome;
