import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/citas", async (req, res) => {
    const { studentId, disponibilidadId, mode } = req.body;
  
    try {
      // Buscar la disponibilidad seleccionada
      const disponibilidad = await prisma.disponibilidad.findUnique({
        where: { id: parseInt(disponibilidadId) },
      });
  
      if (!disponibilidad) {
        return res.status(404).json({ error: "Disponibilidad no encontrada" });
      }
  
      // Crear la cita utilizando la disponibilidad
      const nuevaCita = await prisma.citas.create({
        data: {
          studentId,
          professorId: disponibilidad.professorId,
          date: disponibilidad.date,
          startTime: disponibilidad.startTime,
          endTime: disponibilidad.endTime,
          mode,
          disponibilidadId: disponibilidad.id,
          status: "pending", // Estado inicial de la cita
        },
      });
  
      res.json(nuevaCita);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la cita", details: error.message });
    }
  });

  // Obtener todas las citas de un profesor
    router.get("/profesor/:id/citas", async (req, res) => {
    const { id } = req.params; // ID del profesor
  
    try {
      const citas = await prisma.citas.findMany({
        where: { professorId: parseInt(id) }, // Filtrar citas por ID del profesor
        include: {
          student: true, // Incluir información del estudiante, si es necesario
          disponibilidad: true, // Incluir la disponibilidad, si deseas ver esa información también
        },
      });
  
      // Si no hay citas, devolver un mensaje
      if (citas.length === 0) {
        return res.status(404).json({ message: "No se encontraron citas para este profesor." });
      }
  
      res.json(citas);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener citas", details: error.message });
    }
  });


  //Confirmar una cita
  router.put("/citas/:id/confirm", async (req, res) => {
    const { id } = req.params;
    const studentId = req.userId;
  
    // Validar el ID para asegurarse de que sea un número
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
  
    try {
      // Confirmar la cita seleccionada
      const citaConfirmada = await prisma.citas.update({
        where: { id: parseInt(id) },
        data: { status: "confirmed" },
      });
  
      // Rechazar citas pendientes para la misma disponibilidad, excluyendo la confirmada
      await prisma.citas.updateMany({
        where: {
          disponibilidadId: citaConfirmada.disponibilidadId,
          status: "pending",
          id: { not: citaConfirmada.id }, // Excluir la cita confirmada
        },
        data: { status: "rejected" },
      });

      //! Crear una notificación en la base de datos
      await prisma.notification.create({
        data: {
          studentId: studentId,
          message: `Tu cita con el profesor ${citaConfirmada.professor.name} ha sido confirmada.`,
          citaId: citaConfirmada.id,
        },
      });

      //! Emitir una notificación al estudiante
      io.to(`user_${studentId}`).emit('notification', {
        message: `Tu cita con el profesor ${citaConfirmada.professor.name} ha sido confirmada.`,
        cita: citaConfirmada,
      });
  
      // Enviar una respuesta JSON con el resultado
      res.json({ message: "Cita confirmada y otras solicitudes rechazadas", citaConfirmada });
    } catch (error) {
      res.status(500).json({ error: "Error al confirmar la cita", details: error.message });
    }
  });
  

  export default router;