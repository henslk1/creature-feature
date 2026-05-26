import { Router } from "express";
import prisma from "../lib/prisma";
import logger from "../lib/logger";
import { validate } from "../lib/validate";
import { statDefinitionSchema } from "../lib/schemas";

const router = Router({ mergeParams: true });

// GET stat
router.get("/:statDefinitionId", async (req, res) => {
  
  try {
    const found = await prisma.statDefinition.findUnique({
      where: { id: Number(req.params.statDefinitionId) }
    })

    if (!found) {
      logger.warn({ statDefinitionId: req.params.statDefinitionId },
        `Stat [${req.params.statDefinitionId}] not found`);
      res.status(404).json({ message: "Stat not found" });
      return;
    }

    logger.info({ stat: found }, "Stat found");
    res.json(found);
  }

  catch (error) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

// POST a new stat
router.post("/", validate(statDefinitionSchema), async (req, res) => {

  try {
    const newStat = await prisma.statDefinition.create({
      data: {
        name: req.body.name,
        min: req.body.min,
        max: req.body.max,
        speciesId: Number(req.params.speciesId as string),
      }
    })

    logger.info({ stat: newStat }, "New stat created");
    res.status(201).json(newStat);
  }

  catch (error: any) {

    if (error.code === "P2002") {
      res.status(409).json({ message: "Stat already exists" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

// Update stat-level fields
router.patch("/:statDefinitionId", async (req, res) => {

  try {
    const updated = await prisma.statDefinition.update({
      where: { id: Number(req.params.statDefinitionId) },
      data: {
        name: req.body.name,
        min: req.body.min,
        max: req.body.max,
        active: req.body.active
      }
    });

    logger.info({ stat: updated }, "Stat updated");
    res.status(200).json(updated);
  }

  catch (error: any) {

    if (error.code === "P2025") {
      res.status(404).json({ message: "Stat not found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

// DELETE stat
router.delete("/:statDefinitionId", async (req, res) => {

  try {
    const deletedStat = await prisma.statDefinition.delete({
      where: { id: Number(req.params.statDefinitionId) }
    });

    logger.info({ stat: deletedStat }, "Stat deleted");
    res.json(deletedStat);
  }

  catch (error: any) {

    if (error.code === "P2025") {
      res.status(404).json({ message: "Stat could not be found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

