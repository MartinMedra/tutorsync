import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { io } from "../app.js"; // Asegúrate de que la ruta esté correcta
import { format } from "date-fns";
import { es } from "date-fns/locale";


const router = Router();
const prisma = new PrismaClient();



router.post("/citas", async (req, res) => {
  const { studentId, phone, disponibilidadId, mode } = req.body;

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
        phone,
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

// Eliminar una cita
router.delete("/deletecitas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si la cita existe
    const cita = await prisma.citas.findUnique({
      where: { id: parseInt(id) },
    });

    if (!cita) {
      return res.status(404).json({ error: "Solicitud de cita no encontrada" });
    }

    // Eliminar la cita (esto eliminará automáticamente los tickets relacionados gracias a la opción onDelete: Cascade)
    await prisma.citas.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Solicitud de cita eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la solicitud", details: error.message });
  }
});


//Obtener todas las solicitudes pendientes de un estudiante

router.get("/citas/pendientes/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    // Obtener las citas pendientes del estudiante
    const citasPendientes = await prisma.citas.findMany({
      where: {
        studentId: parseInt(studentId), // Filtrar por ID del estudiante
        status: "pending", // Filtrar por estado pendiente
      },
      include: {
        professor: { // Relación con el profesor
          select: {
            name: true,
            subject: true,
          },
        },
      },
    });

    res.json(citasPendientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las citas pendientes", details: error.message });
  }
});

//Obtener el historial de citas de un estudiante
router.get("/citas/historial/:studentId", async (req, res) => {
  const { studentId } = req.params;

  if (isNaN(studentId)) {
    return res.status(400).json({ error: "ID de estudiante inválido" });
  }

  try {
    const citasConfirmadas = await prisma.citas.findMany({
      where: {
        studentId: parseInt(studentId),
        status: "confirmed", // Filtrar solo las confirmadas
      },
      include: {
        professor: true, // Incluir datos del profesor
      },
    });

    res.json(citasConfirmadas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el historial de citas", details: error.message });
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

// obtener todas las disponibilidades con sus respectivas solicitudes
router.get("/profesor/disponibilidad-con-solicitudes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener todas las disponibilidades de un profesor con sus citas
    const disponibilidades = await prisma.disponibilidad.findMany({
      where: { professorId: parseInt(id) },
      include: {
        Citas: {
          include:{
            student: true, // Incluir información del estudiante
          }, // Incluir las citas asociadas a cada disponibilidad
      },
    },
  });

    if (disponibilidades.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron disponibilidades para este profesor." });
    }

    res.json(disponibilidades);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener disponibilidades con solicitudes", details: error.message });
  }
});

// Actualizar la url de la reunión de una cita
router.put("/citas/:id/url", async (req, res) => {
  const { id } = req.params;
  const { url } = req.body;

  try {
    // Actualizar la url de la reunión de la cita
    const cita = await prisma.citas.update({
      where: { id: parseInt(id) },
      data: { url },
    });

    res.json({ message: "URL de reunión actualizada con éxito", cita });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la URL de la reunión", details: error.message });
  }
});


router.put("/citas/:id/confirm", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const citaConfirmada = await prisma.citas.update({
      where: { id: parseInt(id) },
      data: { status: "confirmed" },
      include: {
        professor: true,
        student: true,
      },
    });

    await prisma.citas.updateMany({
      where: {
        disponibilidadId: citaConfirmada.disponibilidadId,
        status: "pending",
        id: { not: citaConfirmada.id },
      },
      data: { status: "rejected" },
    });

    // Formatear la fecha
    const formattedDate = format(new Date(citaConfirmada.date), "EEEE dd 'de' MMMM 'de' yyyy", { locale: es });

    // Crear una notificación en la base de datos
    await prisma.notification.create({
      data: {
        studentId: citaConfirmada.student.id,
        message: `Tu cita con el profesor ${citaConfirmada.professor.name} el ${formattedDate} ha sido confirmada.`,
        citaId: citaConfirmada.id,
      },
    });

    // Emitir la notificación al estudiante
    io.to(`user_${citaConfirmada.student.id}`).emit("notification", {
      message: `Tu cita con el profesor ${citaConfirmada.professor.name} el ${formattedDate} ha sido confirmada.`,
      cita: citaConfirmada,
    });

    res.json({ message: "Cita confirmada y otras solicitudes rechazadas", citaConfirmada });
  } catch (error) {
    res.status(500).json({ error: "Error al confirmar la cita", details: error.message });
  }
});


export default router;
