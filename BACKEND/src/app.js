import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import disponibilidad from "./routes/disponibilidad.js";
import cita from "./routes/cita.js";
import ticket from "./routes/ticket.js";
import user from "./routes/user.js";
import notification from "./routes/notifications.js";
import 'dotenv/config';
import { Server } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken"; // Asegúrate de tener jwt en tus dependencias

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
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
app.use('/', notification);

// Creando el servidor HTTP
const server = http.createServer(app);

// Configurando Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware de autenticación para WebSocket
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.studentId = decoded.id;
      next();
    } catch (err) {
      next(new Error("Token inválido"));
    }
  } else {
    next(new Error("Autenticación requerida"));
  }
});

// Manejo de conexiones de Socket.IO
io.on("connection", (socket) => {
  socket.on("join", (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User with ID ${userId} joined room user_${userId}`);
  });

  socket.on('disconnect', () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });
});

// Iniciar el servidor HTTP y Socket.IO
server.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});

export { io };
