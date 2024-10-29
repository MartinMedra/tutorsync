
function TeacherSearch() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Buscar Profesores</h2>
      <input
        type="text"
        placeholder="Buscar por nombre o materia..."
        className="w-full p-2 border rounded-md mb-4"
      />
      <ul className="space-y-3">
        <li className="flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-700">Profesor: Juan Pérez</p>
            <p className="text-gray-500">Materia: Matemáticas</p>
          </div>
          <button className="text-blue-500 font-semibold hover:text-blue-700">Agendar</button>
        </li>
        {/* Otros profesores... */}
      </ul>
    </div>
  );
}

export default TeacherSearch;

