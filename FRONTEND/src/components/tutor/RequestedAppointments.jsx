import React from "react";

function RequestedAppointments() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Citas Solicitadas</h2>
      <ul className="space-y-4">
        <li className="flex justify-between items-center border-b pb-2">
          <div>
            <p className="text-gray-700 font-medium">Estudiante: Luis Gómez</p>
            <p className="text-gray-500">Fecha: 28 Octubre 2024</p>
          </div>
          <div className="flex space-x-2">
            <button className="text-green-600 font-semibold hover:text-green-800">Aceptar</button>
            <button className="text-red-600 font-semibold hover:text-red-800">Rechazar</button>
          </div>
        </li>
        {/* Más citas... */}
      </ul>
    </div>
  );
}

export default RequestedAppointments;
