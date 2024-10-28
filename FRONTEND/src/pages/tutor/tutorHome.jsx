
import Sidebar from "../../components/tutor/Sidebar";
import Header from "../../components/tutor/HeaderTutor";
import MainContent from "../../components/tutor/MainContent";

function TutorHome() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <MainContent />
      </div>
    </div>
  );
}

export default TutorHome;
