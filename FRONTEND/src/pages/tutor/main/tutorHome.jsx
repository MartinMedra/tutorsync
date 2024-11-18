import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/HeaderTutor";
import MainContent from "../components/MainContent";
import RightPanelTutor from "../components/RightPanelTutor";

function TutorHome() {
  const [selectedSection, setSelectedSection] = useState("Gestion de Citas");

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <Sidebar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <MainContent selectedSection={selectedSection} />
      </div>

      {/* Right panel */}
      <RightPanelTutor selectedSection={selectedSection} />
    </div>
  );
}

export default TutorHome;