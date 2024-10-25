import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';


const router = Router();
const prisma = new PrismaClient(); // Instancia de PrismaClient


//----------------------------------- Consultar profesores registrados -----------------------------------

router.get("/tutores", async (req, res) => {
    try {
      // Consultar todos los usuarios con el rol de "professor"
      const profesores = await prisma.user.findMany({
        where: { role: "Tutor" },
        select: {
          id: true,
          name: true,
          email: true,
          identification: true,
        },
      });
  
      res.json(profesores);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los profesores", details: error.message });
    }
  });

//----------------------------------- Rutas para consultar datos de perfil -----------------------------------


const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Toma el token de los encabezados de la petición
    if (!token) 
        return res.status(401).json({ error : 'acceso denegado. No se proporcionó un token.'})
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Almacena los datos del usuario en la petición
        next(); // Continua a la siguiente función
        
    } catch (error) {
        res.status(400).json({ error: 'Token inválido' });
    }
}


//Obtener datos de perfil de un usuario
router.get('/profile', authenticateToken, async (req, res)=>{
    try {
        const user = await prisma.user.findUnique({
            where: {id : req.user.id},
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                identification: true,
            }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos del perfil', detail: error.message });
    }
})

export default router;