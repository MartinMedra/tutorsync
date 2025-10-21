import {Router} from "express";
import {PrismaClient} from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get('/message', async (req, res) => {
    const messages = await prisma.message.findMany({
        orderBy: {
            timestamp: 'asc'
        }
    });
    res.json(messages);
});

