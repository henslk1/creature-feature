import { Router } from "express";
import prisma from "../lib/prisma";
import logger from "../lib/logger";
import { validate } from "../lib/validate";
import { geneSchema } from "../lib/schemas";

const router = Router({ mergeParams: true });

// GET gene
router.get("/:geneId", async (req, res) => {

  try {
    const found = await prisma.gene.findUnique({
      where: { id: Number(req.params.geneId) },
      include: {
        loci: { include: { alleles: true } },
        expressionRules: true
      }
    });

    if (!found) {
      logger.warn({ geneId: req.params.geneId },
        `Gene [${req.params.geneId}] not found`);
      res.status(404).json({ message: "Gene not found" });
    }

    logger.info({ gene: found }, "Gene found");
    res.json(found);
  }

  catch (error) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error"});
  }
})

export default router;
