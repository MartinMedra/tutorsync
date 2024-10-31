

function NextAppointment() {
  return (
    <section className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Proxima Cita</h2>
      <p className="text-gray-600">Fecha: 25 Octubre 2024</p>
      <p className="text-gray-600">Hora: 10:00 AM</p>
      <p className="text-gray-600">Profesor: Juan Pérez</p>
      <p className="text-gray-600">Modalidad: Virtual</p>
      <div className="mt-4">
        <button className="text-blue-500 mr-4">Cancelar</button>
        <button className="text-blue-500">Reprogramar</button>
      </div>
    </section>
  );
}

export default NextAppointment;
