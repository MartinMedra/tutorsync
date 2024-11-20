// components/Sidebar.js
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const sections = [
  { name: "Profesores Disponibles", icon: "📘" },
  { name: "Historial de Citas", icon: "🕒" },
  { name: "Solicitudes Pendientes", icon: "📬" },
  { name: "Perfil", icon: "👤" },
];

function Sidebar({ selectedSection, setSelectedSection }) {

    const navigate = useNavigate();
    const handlelogout = () =>{
      localStorage.removeItem('token');
      navigate('/');
  }
  return (
    <aside className="md:w-1/5 w-full bg-white p-5 shadow-md md:block">
      <h1 className="text-2xl font-bold mb-4">Tutorías</h1>
      <nav className="flex md:flex-col w-full space-y-2 md:space-y-0">
        {sections.map((section) => (
          <button
            key={section.name}
            className={`flex items-center space-x-3 py-2 px-3 w-full text-left rounded-md hover:bg-gray-200 hover:font-semibold ${selectedSection === section.name ? "bg-gray-200" : ""
              }`}
            onClick={() => setSelectedSection(section.name)}
          >
            <span>{section.icon}</span>
            <span>{section.name}</span>
          </button>
        ))}
        <button key="logout" disabled className="flex items-center cursor-no-drop bg-gray-50 space-x-3 py-2 px-3 w-full text-left rounded-md">
          <span>💭</span>
          <span className="text-gray-300">Chat - Proximamente</span>
        </button>

        <button onClick={handlelogout} key="logout" className="flex items-center space-x-3 py-2 px-3 w-full text-left rounded-md hover:bg-[#FF5484] hover:text-white hover:font-bold">
          <span>🚪</span>
          <span>Salir</span>
        </button>
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  selectedSection: propTypes.func.isRequired,
  setSelectedSection: propTypes.func.isRequired,
};

export default Sidebar;
