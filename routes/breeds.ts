import { Router } from "express";
import prisma from "../lib/prisma";
import logger from "../lib/logger";
import { validate } from "../lib/validate";
import { breedSchema } from "../lib/schemas";

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

  catch (error) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

// GET individual breeds
router.get("/:breedId", async (req, res) => {

  try {
    const found = await prisma.breed.findUnique({
      where: { id: Number(req.params.breedId) }
    });

    if (!found) {
      logger.warn({ breedId: req.params.breedId },
        `Breed [${req.params.breedId}] not found`);
      res.status(404).json({ message: "Breed not found" });
      return;
    }
    
    logger.info({ breed: found }, "Breed found");
    res.json(found);
  }

  catch (error) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

// POST a new breed
router.post("/", validate(breedSchema), async (req, res) => {

  try {
    const newBreed = await prisma.breed.create({
      data: { name: req.body.name, speciesId: req.body.speciesId }
    });

    logger.info({ breed: newBreed }, "New breed created");
    res.status(201).json(newBreed);
  }

  catch (error: any) {

    if (error.code === "P2002") {
      res.status(409).json({ message: "Breed name already exists"});
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error"});
  }
})

// DELETE a specific breed
router.delete("/:breedId", async (req, res) => {

  try {
    const deletedBreed = await prisma.breed.delete({
      where: { id: Number(req.params.breedId) },
    });

    logger.info({ breed: deletedBreed }, "Breed deleted");
    res.json(deletedBreed);
  }

  catch (error: any) {

    if (error.code === "P2025") {
      res.status(404).json({ message: "Breed could not be found"});
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

export default router;
