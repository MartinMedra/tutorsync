import Notification from "../../../components/Notifications";

function Notifications() {
  return (
    <>

    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Notificaciones</h2>
        <Notification/>
      {/* <ul className="space-y-3">
        <li className="flex items-center text-gray-700">
          📅 Tienes una cita con el Profesor Juan Pérez el 30 de Octubre.
        </li>
        <li className="flex items-center text-gray-700">
          🔔 Nueva disponibilidad del Profesor Ana López.
        </li>
      </ul> */}
    </div>
    </>
  );
}

export default Notifications;
