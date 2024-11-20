import { useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import {Alert} from 'flowbite-react'
import Sidebar from "../components/Sidebar";
import Header from "../components/HeaderTutor";
import MainContent from "../components/MainContent";
import RightPanelTutor from "../components/RightPanelTutor";

function TutorHome() {
  const [selectedSection, setSelectedSection] = useState("Gestion de Citas");
  const { alert } = useAlert();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 font-sans">
      {/* Alert */}
      {alert.isVisible && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-down animate-ease-in rounded-md shadow-medium">
          <Alert color={alert.type}>
            {alert.message}
          </Alert>
        </div>
      )}

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