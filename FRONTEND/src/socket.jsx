// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // Cambia al URL de tu backend

const socket = io(SOCKET_URL, {
  transports: ['websocket'], // Opcional: fuerza el uso de websockets
});

// Exporta el socket para usarlo en otros componentes
export default socket;
