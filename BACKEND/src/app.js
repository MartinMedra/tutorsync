import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import disponibilidad from "./routes/disponibilidad.js";
import cita from "./routes/cita.js";
import ticket from "./routes/ticket.js";
import user from "./routes/user.js";
import 'dotenv/config';
import { Server } from "socket.io";
import http from "http";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Permitir el acceso desde tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
}));


app.use(express.json());


app.get("/", (req, res) => {
  res.send("app funcionando correctamente");
});

app.use("/", auth);
app.use("/", disponibilidad);
app.use("/", cita);
app.use("/", ticket);
app.use("/", user);

//Creando el servidor HTTP
const server = http.createServer(app);

//Configurando Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Cambia esto al puerto donde corre tu frontend
    methods: ["GET", "POST"]
  }
});

// server.js (actualización)
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) {
    // Verifica el token y obtiene el studentId
    const decoded = jwt.verify(token, 'JWT_SECRET'); // Usa tu método de verificación
    socket.studentId = decoded.id;
    next();
  } else {
    next(new Error("Autenticación requerida"));
  }
});

// Maneja las conexiones de Socket.IO
io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

// Escucha un evento para unirse a una room específica
socket.on('join', (studentId) => {
  socket.join(`user_${studentId}`);
  console.log(`Usuario ${socket.id} se unió a la room user_${studentId}`);
});

// Escucha eventos personalizados si es necesario

socket.on('disconnect', () => {
  console.log(`Usuario desconectado: ${socket.id}`);
});
});

// Exporta io para usarlo en otros archivos
export { io };



app.listen(3000);
console.log("Server on port", 3000);
