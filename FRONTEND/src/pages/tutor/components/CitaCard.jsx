import propTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import { useAlert } from "../../../context/AlertContext";

const CitaCard = ({
  student,
  phone,
  mode,
  status,
  onAccept,
  citaId,
  actuallyUrl,
}) => {
  const [url, setUrl] = useState("");
  const { showAlert } = useAlert(); // Acceso al método para mostrar alertas

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSaveUrl = async () => {
    if (!url || url.trim() === "") {
      showAlert("No puedes confirmar la cita sin proporcionar una URL válida.", "failure");
      return;
    }
    
    try {
      const response = await axios.put(
        `http://localhost:3000/citas/${citaId}/url`,
        { url }
      );
      console.log("URL actualizada:", response.data.cita);
      showAlert("URL actualizada correctamente", "success");
    } catch (error) {
      console.error("Error al actualizar la URL:", error);
      showAlert("Error al actualizar la URL", "failure");
    }
  };

  return (
    <div className="flex justify-between items-center p-4 my-4 border rounded-lg shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">Estudiante: {student}</h2>
        <p>Modalidad: {mode}</p>
        {status == "confirmed" && <p>Contacto: {phone}</p>}
        {
          mode === "Virtual" && (
            <div className="relative mt-3">
              <div className=" absolute left-2 -translate-y-1/2 top-1/2 p-1">
                <svg
                  className="w-[16px] h-[16px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                  />
                </svg>
              </div>
              <input
                className="input rounded-full w-full px-10 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
                placeholder="URL de la reunión"
                required=""
                type="text"
                value={url}
                onChange={handleUrlChange}
              />
              <button
                onClick={handleSaveUrl}
                className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
              >
                <svg
                  className="w-[20px] h-[20px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 5a1 1 0 0 1 1-1h11.586a1 1 0 0 1 .707.293l2.414 2.414a1 1 0 0 1 .293.707V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M8 4h8v4H8V4Zm7 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </div>
          )

          // <div className="flex items-center space-x-2">
          //   <input
          //     type="text"
          //     value={url}
          //     onChange={handleUrlChange}
          //     placeholder="URL de la reunión"
          //     className="border rounded-md px-2 py-1"
          //   />
          //   <button
          //     onClick={handleSaveUrl}
          //     className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md"
          //   >
          //     Guardar
          //   </button>
          // </div>
        }
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
          {/* <button
            onClick={onReject}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
          >
            Rechazar
          </button> */}
        </div>
      )}
    </div>
  );
};

CitaCard.propTypes = {
  student: propTypes.string.isRequired,
  phone: propTypes.string.isRequired,
  mode: propTypes.string.isRequired,
  status: propTypes.string.isRequired,
  citaId: propTypes.number.isRequired,
  actuallyUrl: propTypes.string.isRequired,
  onAccept: propTypes.func.isRequired,
  onReject: propTypes.func.isRequired,
};

export default CitaCard;
