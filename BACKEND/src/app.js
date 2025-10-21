import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import disponibilidad from "./routes/disponibilidad.js";
import cita from "./routes/cita.js";
import ticket from "./routes/ticket.js";
import user from "./routes/user.js";
import notification from "./routes/notifications.js";
// import message from "./routes/message.js";
import 'dotenv/config';
import { Server } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken"; // Asegúrate de tener jwt en tus dependencias
import logger from 'morgan';
import { PrismaClient } from '@prisma/client';
import { id } from "date-fns/locale";


const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
app.use(logger('dev'));

app.get("/", (req, res) => {
  res.send("app funcionando correctamente");
});

app.use("/", auth);
app.use("/", disponibilidad);
app.use("/", cita);
app.use("/", ticket);
app.use("/", user);
app.use('/', notification);
// app.user('/', message)

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

  socket.on('joinRoom', async ({roomId, userId}) => {
    const cita= await prisma.citas.findUnique({
      where : { id: citaId},
      include: {
        student: true, professor: true
      }
    })

    if (!cita || cita.student.id !== "confirmed") {
      socket.emit("error", "No tienes permiso para unirte a esta sala.");
      return;
    }

    const room = await prisma.room.create({
      data: {
        citaId,
      },
    })

    return room;
})

  socket.on('sendMessage', async ({ content, senderId, roomId }) => {
    const room = await prisma.room.findUnique({
      where: { id:room },
      include: {
        cita: {include: {
          student: true, professor: true
        }},
      },
    })

    if (!room || [room.cita.studentId, room.cita.professorId].includes(senderId)) {
      socket.emit("error", "No tienes permiso para enviar mensajes a esta sala.");
      return;
    }

    //crea el mensaje
    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        roomId,
      },
    });

    return message;

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
