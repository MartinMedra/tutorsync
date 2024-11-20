// components/RightPanel.js
import propTypes from "prop-types";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "../../../socket";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import axios from "axios";
import {Card, CardBody} from "@nextui-org/react";

function RightPanelTutor({ selectedSection }) {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user && user.id) {
        setLoading(true); // Activa el estado de carga antes de la petición
        try {
          const response = await axios.get(
            `http://localhost:3000/notifications/${user.id}`
          );
          setNotifications(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error("Error al obtener notificaciones:", error);
          setError("No se pudieron cargar las notificaciones."); // Mensaje de error
        } finally {
          setLoading(false); // Desactiva el estado de carga al finalizar
        }
      }
    };

    fetchNotifications();

    if (user && user.id) {
      socket.emit("join", user.id);

      socket.on("notification", (data) => {
        setNotifications((prevNotifications) => {
          if (
            !prevNotifications.some(
              (notification) => notification.id === data.id
            )
          ) {
            toast.info(data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            return [data, ...prevNotifications];
          }
          return prevNotifications;
        });
      });
    }

    return () => {
      socket.off("notification");
    };
  }, [user]);

  if (loading) {
    return <p>Cargando notificaciones...</p>; // Mensaje de carga
  }

  if (error) {
    return <p>{error}</p>; // Mensaje de error si ocurre
  }

  return (
    <aside className="w-full md:w-1/4 bg-white p-5 shadow-md border-t md:border-t-0 md:border-l border-gray-200">
      <h3 className="text-xl font-semibold mb-4">Notificaciones</h3>
      <div className="mb-5">
        <ul>
          {notifications.map((notification) => (
            <Card key={notification.id}>
            <CardBody>
              <p>{notification.message}</p>
            </CardBody>
          </Card>
          ))}
        </ul>
        {notifications.length === 0 && <p>No hay notificaciones</p>}
      </div>
      
    </aside>
  );
}

RightPanelTutor.propTypes = {
  selectedSection: propTypes.func.isRequired,
};

export default RightPanelTutor;
