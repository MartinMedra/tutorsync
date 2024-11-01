// src/components/Notification.js
import { useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from '../socket';
import { AuthContext } from '../context/AuthContext/AuthContext';

function Notification() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.id) {
      // Unirse a la room específica del usuario
      socket.emit('join', user.id);
    }

    // Escuchar eventos de notificación
    socket.on('notification', (data) => {
      toast.info(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });

    // Limpieza al desmontar el componente
    return () => {
      socket.off('notification');
    };
  }, [user]);

  return <ToastContainer />;
}

export default Notification;
