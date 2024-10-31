
function AppointmentHistory() {
  return (
    <section className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Historial de Citas</h2>
      <ul className="space-y-4">
        <li className="border-b pb-2 flex justify-between items-center">
          <div>
            <p className="text-gray-700 font-medium">Estudiante: Ana López</p>
            <p className="text-gray-500">Fecha: 15 Octubre 2024</p>
          </div>
          <button className="text-blue-500 hover:text-blue-700">Ver detalles</button>
        </li>
        {/* Más citas en el historial... */}
      </ul>
    </section>
  );
}

export default AppointmentHistory;
