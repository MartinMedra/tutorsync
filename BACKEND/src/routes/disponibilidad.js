import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient(); // Instancia de PrismaClient

//----------------------------------- Rutas de disponibilidad PROFESOR -----------------------------------

//Crear disponibilidad de un profesor
router.get("/profesor/disponibilidad", async (req, res) => {
  const { date, professorId, startTime, endTime } = req.body;

  if (end <= start) {
    return res
      .status(400)
      .json({
        error: "La hora de finalización debe ser después de la hora de inicio",
      });
  }

  try {
    const disponibilidad = await prisma.disponibilidad.create({
      data: {
        date: new Date(date),
        professorId,
        startTime: start,
        endTime: end,
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
  const { professorId } = req.params;

  try {
    const disponibilidad = await prisma.disponibilidad.findMany({
      where: { professorId: parseInt(professorId) },
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
      await prisma.disponibilidad.delete({ where: { id: parseInt(id) } });
      res.json({ message: "Disponibilidad eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar disponibilidad", details: error.message });
    }
  });

export default router;
