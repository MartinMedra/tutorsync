

function AppointmentHistory() {
  return (
    <section className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Historial de Citas</h2>
      <ul className="space-y-2">
        <li className="border-b pb-2">
          <p className="text-gray-600">Profesor: Ana López</p>
          <p className="text-gray-600">Fecha: 15 Octubre 2024</p>
          <button className="text-blue-500">Ver detalles</button>
        </li>
        <li className="border-b pb-2">
          <p className="text-gray-600">Profesor: Carlos Ruiz</p>
          <p className="text-gray-600">Fecha: 5 Octubre 2024</p>
          <button className="text-blue-500">Ver detalles</button>
        </li>
        {/* Agregar más citas según sea necesario */}
      </ul>
    </section>
  );
}

export default AppointmentHistory;
