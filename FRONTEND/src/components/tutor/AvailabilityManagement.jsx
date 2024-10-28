import React from "react";

function AvailabilityManagement() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Gestión de Disponibilidad</h2>
      <div className="border p-4 rounded-md bg-gray-50 text-gray-600">
        {/* Implementa un calendario o selector de horas */}
        <p>Selecciona tu disponibilidad</p>
      </div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors">
        Actualizar Disponibilidad
      </button>
    </div>
  );
}

export default AvailabilityManagement;
