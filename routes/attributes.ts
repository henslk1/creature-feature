import { Router } from "express";
import prisma from "../lib/prisma";
import logger from "../lib/logger";
import { validate } from "../lib/validate";
import { attributeDefinitionSchema } from "../lib/schemas";

const router = Router({ mergeParams: true });

// GET attribute
router.get("/:attributeDefinitionId", async (req, res) => {

  try {
    const found = await prisma.gene.findUnique({
      where: { id: Number(req.params.attributeDefinitionId) },
    })

    if (!found) {
      logger.warn({ attributeDefinitionId: req.params.attributeDefinitionId },
        `Attribute [${req.params.attributeDefinitionId}] not found`);
      res.status(404).json({ message: "Attribute not found" });
      return;
    }

    logger.info({ attribute: found }, "Attribute found");
    res.json(found);
  }

  catch (error) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

// POST attribute
router.post("/", validate(attributeDefinitionSchema), async (req, res) => {

  try {
    const newAttribute = await prisma.attributeDefinition.create({
      data: {
        name: req.body.name,
        type: req.body.type,
        min: req.body.min,
        max: req.body.max,
        options: req.body.options,
        optional: req.body.optional,
        mutable: req.body.mutable,
        speciesId: Number(req.params.speciesId as string),
      }
    })

    logger.info({ attribute: newAttribute }, "New attribute created");
    res.status(201).json(newAttribute);
  }

  catch (error: any) {

    if (error.code === "P2002") {
      res.status(409).json({ message: "Attribute already exists" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

// PATCH attribute
router.patch("/:attributeDefinitionId", async (req, res) => {

  try {
    const updated = await prisma.attributeDefinition.update({
      where: { id: Number(req.params.attributeDefinitionId) },
      data: {
        name: req.body.name,
        type: req.body.type,
        min: req.body.min,
        max: req.body.max,
        options: req.body.options,
        optional: req.body.optional,
        mutable: req.body.mutable,
      }
    });

    logger.info({ attribute: updated }, "Attribute updated");
    res.status(200).json(updated);
  }

  catch (error: any) {

    if (error.code === "P2025") {
      res.status(404).json({ message: "Attribute not found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

// DELETE attribute
router.delete("/:attributeDefinitionId", async (req, res) => {

  try {
    const deletedAttribute = await prisma.attributeDefinition.delete({
      where: { id: Number(req.params.attributeDefinitionId) }
    });

    logger.info({ attribute: deletedAttribute }, "Attribute deleted");
    res.json(deletedAttribute);
  }

  catch (error: any) {

    if (error.code === "P2025") {
      res.status(404).json({ message: "Attribute could not be found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

export default router;
