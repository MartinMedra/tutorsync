// components/Sidebar.js
import propTypes from "prop-types";

const sections = [
  { name: "Profesores Disponibles", icon: "📘" },
  { name: "Historial de Citas", icon: "🕒" },
  { name: "Solicitudes Pendientes", icon: "📬" },
  { name: "Perfil", icon: "👤" },
  { name: "Mensajes", icon: "💬" },
];

function Sidebar({ selectedSection, setSelectedSection }) {
  return (
    <aside className="md:w-1/5 w-full bg-white p-5 shadow-md md:block">
      <h1 className="text-2xl font-bold mb-4">Tutorías</h1>
      <nav className="flex md:flex-col w-full space-y-2 md:space-y-0">
        {sections.map((section) => (
          <button
            key={section.name}
            className={`flex items-center space-x-3 py-2 px-3 w-full text-left rounded-md hover:bg-gray-200 ${selectedSection === section.name ? "bg-gray-200" : ""
              }`}
            onClick={() => setSelectedSection(section.name)}
          >
            <span>{section.icon}</span>
            <span>{section.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  selectedSection: propTypes.func.isRequired,
  setSelectedSection: propTypes.func.isRequired,
};

export default Sidebar;
