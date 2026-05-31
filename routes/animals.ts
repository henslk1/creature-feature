import { Router } from "express";
import prisma from "../lib/prisma";
import logger from "../lib/logger";
import { validate } from "../lib/validate";
import { animalSchema } from "../lib/schemas";
import { generateAnimal } from "../services/generator";
import { animalPatchSchema } from "../lib/patchSchemas";

const router = Router();

// GET all animals
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
});

// GET individual animal
router.get("/:animalId", async (req, res) => {

  try {
    const found = await prisma.animal.findUnique({
      where: { id: Number(req.params.animalId) }
    });

    if (!found) {
      logger.warn({ animalId: req.params.animalId },
        `Animal [${req.params.animalId}] not found`);
      res.status(404).json({ message: "Animal not found" });
      return;
    }

    logger.info({ animal: found }, "Animal found");
    res.json(found);
  }

  catch (error) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST animal - generated
router.post("/", validate(animalSchema), async (req, res) => {

  try {
    const generated = await generateAnimal(req.body.breedId);

    const newAnimal = await prisma.animal.create({
      data: {
        name: req.body.name,
        breedId: req.body.breedId,
        stats: generated.stats,
        expressedTraits: generated.expressedTraits,
        attributes: generated.attributes
      }
    });

    logger.info({ animal: newAnimal }, "New animal generated");
    res.status(201).json(newAnimal);
  }

  catch (error: any) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
});

// PATCH animal
router.patch("/:animalId", validate(animalPatchSchema), async (req, res) => {

  try {
    const updated = await prisma.animal.update({
      where: { id: Number(req.params.animalId) },
      data: {
        name: req.body.name,
        breedId: req.body.breedId
      }
    });

    logger.info({ animal: updated }, "Animal updated");
    res.status(200).json(updated);
  }

  catch (error: any) {

    if (error.code === "P2025") {
      res.status(404).json({ message: "Animal not found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE animal
router.delete("/:animalId", async (req, res) => {

  try {
    const deletedAnimal = await prisma.animal.delete({
      where: { id: Number(req.params.animalId) }
    });

    logger.info({ animal: deletedAnimal }, "Animal deleted");
    res.status(200).json(deletedAnimal);
  }

  catch (error: any) {

    if (error.code === "P2025") {
      res.status(404).json({ message: "Animal not found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
