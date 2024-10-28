

function TeacherSearch() {
  return (
    <section className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Buscar Profesor</h2>
      <input
        type="text"
        placeholder="Buscar por nombre o especialidad"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <div className="mt-4 flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Buscar</button>
        <button className="text-gray-600">Filtros</button>
      </div>
    </section>
  );
}

export default TeacherSearch;
