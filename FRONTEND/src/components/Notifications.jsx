// src/components/Notification.js
import { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from '../socket';
import { AuthContext } from '../context/AuthContext/AuthContext';
import axios from 'axios';

function Notification() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      // Unirse a la room específica del usuario para notificaciones en tiempo real
      socket.emit('join', user.id);

      // Obtener notificaciones anteriores
      axios.get(`http://localhost:3000/notifications/${user.id}`)
        .then((response) => {
          setNotifications(response.data); // Guardar notificaciones en el estado
        })
        .catch((error) => {
          console.error('Error al obtener notificaciones:', error);
        });
    }

    // Escuchar notificaciones en tiempo real
    socket.on('notification', (data) => {
      toast.info(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Agregar la nueva notificación al estado
      setNotifications((prevNotifications) => [data, ...prevNotifications]);
    });

    // Limpieza al desmontar el componente
    return () => {
      socket.off('notification');
    };
  }, [user]);

  return (
    <div>
      <ToastContainer />
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notification;
