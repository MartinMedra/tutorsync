import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { io } from "../app.js"; // Asegúrate de que la ruta esté correcta

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

// Obtener todas las citas pendientes de un profesor
router.get("/profesor/:id/citas", async (req, res) => {
  const { id } = req.params; // ID del profesor

  try {
    const citas = await prisma.citas.findMany({
      where: { 
        professorId: parseInt(id),
        status: "pending" // Filtrar solo citas pendientes
      },
      include: {
        student: true,
        disponibilidad: true,
      },
    });

    if (citas.length === 0) {
      return res.status(404).json({ message: "No se encontraron citas pendientes para este profesor." });
    }

    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener citas", details: error.message });
  }
});


router.put("/citas/:id/confirm", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    // Confirmar la cita e incluir información del profesor y el estudiante
    const citaConfirmada = await prisma.citas.update({
      where: { id: parseInt(id) },
      data: { status: "confirmed" },
      include: { 
        professor: true,  // Información del profesor
        student: true     // Información del estudiante
      },
    });

    // Rechazar otras citas pendientes con la misma disponibilidad
    await prisma.citas.updateMany({
      where: {
        disponibilidadId: citaConfirmada.disponibilidadId,
        status: "pending",
        id: { not: citaConfirmada.id },
      },
      data: { status: "rejected" },
    });

    // Crear una notificación en la base de datos usando el studentId de citaConfirmada
    await prisma.notification.create({
      data: {
        studentId: citaConfirmada.student.id, // Usamos el ID del estudiante obtenido en citaConfirmada
        message: `Tu cita con el profesor ${citaConfirmada.professor.name} ha sido confirmada.`,
        citaId: citaConfirmada.id,
      },
    });

    // Emitir una notificación al estudiante
    io.to(`user_${citaConfirmada.student.id}`).emit("notification", {
      message: `Tu cita con el profesor ${citaConfirmada.professor.name} ha sido confirmada.`,
      cita: citaConfirmada,
    });

    res.json({ message: "Cita confirmada y otras solicitudes rechazadas", citaConfirmada });
  } catch (error) {
    res.status(500).json({ error: "Error al confirmar la cita", details: error.message });
  }
});


export default router;
