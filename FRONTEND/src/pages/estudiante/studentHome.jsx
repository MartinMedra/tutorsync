import Header from "../../components/estudiante/header";
import SidebarStudent from "../../components/estudiante/SidebarStudent";
import MainContentStudent from "../../components/estudiante/MainContent";

function StudentHome() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarStudent />
      <div className="flex-1">
        <Header />
        <MainContentStudent />
      </div>
    </div>
  );
}

export default StudentHome;
