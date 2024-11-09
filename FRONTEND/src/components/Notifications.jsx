import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from '../socket';
import { AuthContext } from '../context/AuthContext/AuthContext';
import axios from 'axios';

function Notification() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user && user.id) {
        setLoading(true); // Activa el estado de carga antes de la petición
        try {
          const response = await axios.get(`http://localhost:3000/notifications/${user.id}`);
          setNotifications(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error('Error al obtener notificaciones:', error);
          setError('No se pudieron cargar las notificaciones.'); // Mensaje de error
        } finally {
          setLoading(false); // Desactiva el estado de carga al finalizar
        }
      }
    };

    fetchNotifications();

    if (user && user.id) {
      socket.emit('join', user.id);

      socket.on('notification', (data) => {
        setNotifications((prevNotifications) => {
          if (!prevNotifications.some((notification) => notification.id === data.id)) {
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
      socket.off('notification');
    };
  }, [user]);

  if (loading) {
    return <p>Cargando notificaciones...</p>; // Mensaje de carga
  }

  if (error) {
    return <p>{error}</p>; // Mensaje de error si ocurre
  }

  return (
    <div>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
      {notifications.length === 0 && <p>No hay notificaciones</p>}
    </div>
  );
}

export default Notification;
