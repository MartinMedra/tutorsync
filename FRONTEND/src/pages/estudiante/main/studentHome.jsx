// import Header from "../components/header";
import SidebarStudent from "../components/SidebarStudent";
import MainContentStudent from "../components/MainContent";
import NavigationEstudiante from "../../../components/estudiante/navigationEstudiante";

function StudentHome() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* <SidebarStudent /> */}
      <SidebarStudent />
      <div className="flex-1">
        <NavigationEstudiante />
        <MainContentStudent />
      </div>
    </div>
  );
}

export default StudentHome;
