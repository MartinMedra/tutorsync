import { Router } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
  const { email, password, role, identification, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, role, identification, name },
    });
    res.json(newUser);
  } catch (error) {
    console.log(error); // Imprimir el error en la consola para ver detalles
    res
      .status(500)
      .json({ error: "Error al crear usuario", details: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca al usuario por email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Compara la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Genera el token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Error al iniciar sesión" , details: error.message});
  }
});

export default router;
