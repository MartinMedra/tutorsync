
import Sidebar from "../components/Sidebar";
import Header from "../components/HeaderTutor";
import MainContent from "../components/MainContent";

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
