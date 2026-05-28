import { Router } from "express";
import prisma from "../lib/prisma";
import logger from "../lib/logger";
import { validate } from "../lib/validate";
//import { animalSchema } from "../lib/validate";
import { generateAnimal } from "../services/generator";

const router = Router();

router.get("/", async (req, res) => {

  try {
    const getAnimals = await prisma.animal.findMany({
      orderBy: { id: "asc" }
    });

    logger.info({ animals: getAnimals }, "Animals found");
    res.json(getAnimals);
  }

  catch (error) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})


export default router;
