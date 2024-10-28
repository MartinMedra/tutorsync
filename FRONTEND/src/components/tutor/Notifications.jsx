

function Notifications() {
  return (
    <section className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Notificaciones</h2>
      <ul className="space-y-4">
        <li className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
          <p className="text-blue-700">Recordatorio: Cita con Luis Gómez mañana a las 10:00 AM</p>
        </li>
        <li className="p-3 border-l-4 border-green-500 bg-green-50 rounded">
          <p className="text-green-700">Nueva solicitud de cita de Maria Torres</p>
        </li>
        {/* Más notificaciones... */}
      </ul>
    </section>
  );
}

export default Notifications;
