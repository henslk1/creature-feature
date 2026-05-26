import { Router } from "express";
import prisma from "../lib/prisma";
import logger from "../lib/logger";
import { validate } from "../lib/validate";
import { statDefinitionSchema } from "../lib/schemas";

const router = Router({ mergeParams: true });

// GET stat
router.get("/:statDefintionId", async (req, res) => {
  
  try {
    const found = await prisma.statDefinition.findUnique({
      where: { id: Number(req.params.statDefintionId) }
    })

    if (!found) {
      logger.warn({ statDefinitionId: req.params.statDefintionId },
        `Stat [${req.params.statDefintionId}] not found`);
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
