import { Router } from "express";
import prisma from "../lib/prisma";
import logger from "../lib/logger";
import { validate } from "../lib/validate";
import { speciesSchema } from "../lib/schemas";

const router = Router();

// GET all species
router.get("/", async (req, res) => {

  try {
    const getSpecies = await prisma.species.findMany({
      orderBy: { id: "asc"}
    });

    logger.info({ species: getSpecies }, "Species found");
    res.json(getSpecies);
  }
  
  catch (error) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }

})

// GET individual species
router.get("/:speciesId", async (req, res) => {

  try {
    const found = await prisma.species.findUnique({
      where: { id: Number(req.params.speciesId) },
      include: {
        genes: {
          include: {
            loci: { include: { alleles: true } },
            expressionRules: true
          }
        },
        stats: true,
        attributes: true,
        breeds: true
      }
    });

    if (!found) {
      logger.warn({ speciesId: req.params.speciesId },
        `Species [${req.params.speciesId}] not found`);
      res.status(404).json({ message: "Species not found" });
      return;
    }

    logger.info({ species: found }, "Species found");
    res.json(found);
  }

  catch (error) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

// POST a new species
router.post("/", validate(speciesSchema), async (req, res) => {
  
  try {
    const newSpecies = await prisma.species.create({
      data: { name: req.body.name, description: req.body.description }
    });

    logger.info({ species: newSpecies }, "New species created");
    res.status(201).json(newSpecies);
  }

  catch(error: any) {

    if (error.code === "P2002") {
      res.status(409).json({ message: "Species name already exists" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

// PATCH species
router.patch("/:speciesId", async (req, res) => {

  try {
    const updated = await prisma.species.update({
      where: { id: Number(req.params.speciesId) },
      data: {
        name: req.body.name,
        description: req.body.description
      }
    });

    logger.info({ species: updated }, "Species updated");
    res.status(200).json(updated);
  }

  catch (error: any) {

    if (error.code === "P2025") {
      res.status(404).json({ message: "Species not found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

// DELETE a specific species
router.delete("/:speciesId", async (req, res) => {

  try {
    const deletedSpecies = await prisma.species.delete({
      where: { id: Number(req.params.speciesId) },
    });

    logger.info({ species: deletedSpecies }, "Species deleted");
    res.json(deletedSpecies);
  }

  catch (error: any) {

    if (error.code === "P2025") {
      res.status(404).json({ message: "Species could not be found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" })
  }
})


export default router;
