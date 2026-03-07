import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, phone, region, address } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res.status(400).json({ success: false, message: "Имя обязательно" });
      return;
    }
    if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
      res.status(400).json({ success: false, message: "Телефон обязателен" });
      return;
    }

    await prisma.lead.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        region: (region ?? "").trim(),
        address: address ? address.trim() : null,
      },
    });

    res.status(201).json({ success: true, message: "Заявка принята!" });
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

export default router;
