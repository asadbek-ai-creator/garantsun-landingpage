import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { fullName, phone, address, region, calculatorResults } = req.body;

    // Validate required fields
    const errors: string[] = [];
    if (!fullName || typeof fullName !== "string" || fullName.trim().length === 0) {
      errors.push("fullName is required");
    }
    if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
      errors.push("phone is required");
    }
    if (!address || typeof address !== "string" || address.trim().length === 0) {
      errors.push("address is required");
    }
    if (!region || typeof region !== "string" || region.trim().length === 0) {
      errors.push("region is required");
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const lead = await prisma.lead.create({
      data: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        region: region.trim(),
        calculatorResults: calculatorResults ?? null,
      },
    });

    res.status(201).json(lead);
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
