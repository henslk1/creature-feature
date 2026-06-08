import { Router } from "express";
import prisma from "../lib/prisma";
import logger from "../lib/logger";
import { validate } from "../lib/validate";
import { breedSchema, overrideSchema, statRangeSchema } from "../lib/schemas";
import { breedPatchSchema } from "../lib/patchSchemas";
import { fetchBreedProfile } from "../services/queries";
import { buildProfile } from "../services/buildBreedProfile";

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
});

// GET individual breed
router.get("/:breedId", async (req, res) => {

  try {
    const found = await fetchBreedProfile(Number(req.params.breedId));

    if (!found) {
      logger.warn({ breedId: req.params.breedId },
        `Breed [${req.params.breedId}] not found`);
      res.status(404).json({ message: "Breed not found" });
      return;
    }

    const breedProfile = buildProfile(found);

    logger.info({ breed: found }, "Breed found");
    res.json(breedProfile);
  }

  catch (error) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST a new breed
router.post("/", validate(breedSchema), async (req, res) => {

  try {
    const newBreed = await prisma.breed.create({
      data: { name: req.body.name, speciesId: req.body.speciesId,
        include: {
          _count: { select: { animals: true } }
        }
       }
    });

    logger.info({ breed: newBreed }, "New breed created");
    res.status(201).json(newBreed);
  }

  catch (error: any) {

    if (error.code === "P2002") {
      res.status(409).json({ message: "Breed name already exists" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
});

// PATCH a specific breed
router.patch("/:breedId", validate(breedPatchSchema), async (req, res) => {

  try {
    const updated = await prisma.breed.update({
      where: { id: Number(req.params.breedId) },
      data: { name: req.body.name, active: req.body.active },
      include: {
        _count: { select: { animals: true } }
      }
    });


    logger.info({ breed: updated }, "Breed updated");
    res.status(200).json(updated);
  }

  catch (error: any) {

    if (error.code === "P2025") {
      res.status(404).json({ message: "Breed not found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT for overrides
router.put("/:breedId/overrides", validate(overrideSchema), async (req, res) => {

  try {
    const override = await prisma.alleleOverride.upsert({
      where: {
        alleleId_breedId: {
          alleleId: req.body.alleleId,
          breedId: Number(req.params.breedId)
        }
      },
      create: {
        alleleId: req.body.alleleId,
        breedId: Number(req.params.breedId),
        probability: req.body.probability
      },
      update: {
        probability: req.body.probability
      }
    });

    logger.info({ override }, "Override upserted");
    res.status(200).json(override);
  }

  catch (error: any) {

    if (error.code === "P2003") {
      res.status(404).json({ message: "Breed not found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT for stat ranges
router.put("/:breedId/statRanges", validate(statRangeSchema), async (req, res) => {
  
  try {
    const statRange = await prisma.statRange.upsert({
      where: {
        stat_breedId: {
          stat: req.body.stat,
          breedId: Number(req.params.breedId)
        }
      },
      create: {
        stat: req.body.stat,
        breedId: Number(req.params.breedId),
        min: req.body.min,
        max: req.body.max
      },
      update: {
        min: req.body.min,
        max: req.body.max
      }
    });

    logger.info({ statRange }, "Stat range upserted");
    res.status(200).json(statRange);
  }

  catch (error: any) {

    if (error.code === "P2003") {
      res.status(404).json({ message: "Breed not found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE a specific breed
router.delete("/:breedId", async (req, res) => {

  try {
    const deletedBreed = await prisma.breed.delete({
      where: { id: Number(req.params.breedId) },
    });

    logger.info({ breed: deletedBreed }, "Breed deleted");
    res.status(200).json(deletedBreed);
  }

  catch (error: any) {

    if (error.code === "P2025") {
      res.status(404).json({ message: "Breed not found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
