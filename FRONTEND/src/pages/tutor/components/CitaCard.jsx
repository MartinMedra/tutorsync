import React from "react";

const CitaCard = ({ student, mode, status, onAccept, onReject }) => {
  return (
    <div className="flex justify-between items-center p-4 my-4 border rounded-lg shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">Estudiante: {student}</h2>
        <p>Modalidad: {mode}</p>
        <p className="mt-1">
          Estado:{" "}
          <span
            className={`${
              status === "confirmed"
                ? "text-green-600"
                : status === "rejected"
                ? "text-red-600"
                : "text-orange-500"
            }`}
          >
            {status === "pending"
              ? "Pendiente"
              : status === "confirmed"
              ? "Confirmado"
              : "Rechazado"}
          </span>
        </p>
      </div>

      {/* Mostrar botones solo si el estado es "pending" */}
      {status === "pending" && (
        <div className="flex space-x-2">
          <button
            onClick={onAccept}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md"
          >
            Confirmar
          </button>
          <button
            onClick={onReject}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
          >
            Rechazar
          </button>
        </div>
      )}
    </div>
  );
};

export default CitaCard;
