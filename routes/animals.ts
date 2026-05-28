import { Router } from "express";
import prisma from "../lib/prisma";
import logger from "../lib/logger";
import { validate } from "../lib/validate";
//import { animalSchema } from "../lib/validate";
import { generateAnimal } from "../services/generator";

const router = Router();

//GET all animals
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

// GET individual animal
router.get("/:animalId", async (req, res) => {

  try {
    const found = await prisma.animal.findUnique({
      where: { id: Number(req.params.animalId) }
    });

    if (!found) {
      logger.warn({ animal: req.params.animalId },
        `Animal [${req.params.animalId }] not found`);
      res.status(404).json({ message: "Animal not found" });
    }

    logger.info({ animal: found }, "Animal found");
    res.json(found);
  }

  catch (error) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})


export default router;
