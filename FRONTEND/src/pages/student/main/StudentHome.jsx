import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import RightPanel from "../components/RightPanel";

function StudentIni() {
  const [selectedSection, setSelectedSection] = useState("Profesores Disponibles");

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
      <RightPanel selectedSection={selectedSection} />
    </div>
  );
}

export default StudentIni;