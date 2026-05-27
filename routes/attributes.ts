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

// PATCH attribute

// DELETE attribute

export default router;
