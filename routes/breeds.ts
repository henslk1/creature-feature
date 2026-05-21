import { Router } from "express";
import prisma from "../lib/prisma";
import logger from "../lib/logger";

const router = Router();

// GET all breeds
router.get("/", async (req, res) => {
  
  try {
    const getBreeds = await prisma.breed.findMany({
      orderBy: { id: "asc" }
    });

    logger.info({ breeds: getBreeds }, "Breeds found");
    res.json(getBreeds);
  }

  catch(error) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

export default router;
