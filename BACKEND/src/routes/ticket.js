import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Crear ticket para la cita
router.post("/tickets", async (req, res) => {
  const { studentId, citaId } = req.body;

  try {
    // Buscar la cita para la cual se creará el ticket
    const cita = await prisma.citas.findUnique({
      where: { id: parseInt(citaId), studentId: parseInt(studentId) },
      include: {
        professor: true, // Incluye la información del profesor
        student: true,   // Incluye la información del estudiante
      },
    });

    if (!cita) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }

    // Crear el ticket
    const nuevoTicket = await prisma.ticket.create({
      data: {
        citasId: cita.id,
        studentName: cita.student.name,
        studentEmail: cita.student.email,
        studentId: cita.studentId.toString(),
        status: cita.status, // Usa el estado actual de la cita
      },
    });

    res.json({
      ticket: nuevoTicket,
      cita: {
        professorName: cita.professor.name,
        date: cita.date,
        startTime: cita.startTime,
        endTime: cita.endTime,
        mode: cita.mode,
        status: cita.status,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el ticket", details: error.message });
  }
});

export default router;
