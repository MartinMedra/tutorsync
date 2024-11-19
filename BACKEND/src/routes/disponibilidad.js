import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient(); // Instancia de PrismaClient

//----------------------------------- Rutas de disponibilidad PROFESOR -----------------------------------

//Crear disponibilidad de un profesor
router.post("/profesor/disponibilidad", async (req, res) => {
  const { date, professorId, startTime, endTime } = req.body;

  if (endTime <= startTime) {
    return res.status(400)
      .json({
        error: "La hora de finalización debe ser después de la hora de inicio",
      });
  }

  try {
    const disponibilidad = await prisma.disponibilidad.create({
      data: {
        date: new Date(date),
        professorId,
        startTime,
        endTime,
      },
    });
    res.json(disponibilidad);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear disponibilidad", details: error.message });
  }
});

//Obtener disponibilidad de un profesor
router.get("/profesor/disponibilidad/:id", async (req, res) => {
  const { id } = req.params; // Cambiar "professorId" a "id"

  try {
    const disponibilidad = await prisma.disponibilidad.findMany({
      where: { professorId: parseInt(id) }, // Cambiar "professorId" a "id" también aquí
    });
    res.json(disponibilidad);
  } catch (error) {
    res.status(500).json({error: "Error al obtener disponibilidad", details: error.message});
  }
});


// Actualizar disponibilidad
router.put("/profesor/disponibilidad/:id", async (req, res) => {
    const { id } = req.params;
    const { date, startTime, endTime } = req.body;
  
    try {
      const updatedDisponibilidad = await prisma.disponibilidad.update({
        where: { id: parseInt(id) },
        data: { date: new Date(date), startTime, endTime },
      });
      res.json(updatedDisponibilidad);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar disponibilidad", details: error.message });
    }
  });

// Eliminar disponibilidad
router.delete("/profesor/disponibilidad/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Primero, verifica si hay citas asociadas
    const citas = await prisma.citas.findMany({
      where: { disponibilidadId: parseInt(id) },
    });

    if (citas.length > 0) {
      return res.status(400).json({
        error: "No se puede eliminar la disponibilidad porque tiene citas asociadas.",
      });
    }

    // Si no hay citas, elimina la disponibilidad
    await prisma.disponibilidad.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Disponibilidad eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar disponibilidad", details: error.message });
  }
});



export default router;
