import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Obtener todas las notificaciones de un usuario
router.get('/notifications/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const notifications = await prisma.notification.findMany({
        where: { studentId: parseInt(userId) },
        orderBy: { createdAt: 'desc' }, // Opcional: para ordenar por fecha de creación
      });
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener notificaciones', details: error.message });
    }
  });


export default router;