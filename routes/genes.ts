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
      return;
    }

    logger.info({ gene: found }, "Gene found");
    res.json(found);
  }

  catch (error) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error"});
  }
})

// POST a new gene
router.post("/", validate(geneSchema), async (req, res) => {

  try {
    const newGene = await prisma.gene.create({
      data: {
        name: req.body.name,
        category: req.body.category,
        speciesId: Number(req.params.speciesId as string),
        loci: {
          create: req.body.loci.map((locus: any) => ({
            name: locus.name,
            alleles: {
              create: locus.alleles
            }
          }))
        },
        expressionRules: {
          create: req.body.expressionRules
        }
      },
      include: {
        loci: { include: { alleles: true } },
        expressionRules: true
      }
    });

    logger.info({ gene: newGene }, "New gene created");
    res.status(201).json(newGene);
  }

  catch (error: any) {

    if (error.code === "P2002") {
      res.status(409).json({ message: "Gene name already exists" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

// Update gene-level fields
router.patch("/:geneId", async (req, res) => {
  
  try {
    const updated = await prisma.gene.update({
      where: {id: Number(req.params.geneId) },
      data: {
        name: req.body.name,
        category: req.body.category,
        active: req.body.active
      }
    });

    logger.info({ gene: updated }, "Gene updated");
    res.status(200).json(updated);
  }

  catch (error: any) {

    if (error.code === "P2025") {
      res.status(404).json({ message: "Gene not found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
})

// Update any gene field
router.put("/:geneId", validate(geneSchema), async (req, res) => {
  
  try {
    const updated = await prisma.gene.update({
      where: { id: Number(req.params.geneId) },
      data: {
        name: req.body.name,
        category: req.body.category,
        loci: {
          deleteMany: {},
          create: req.body.loci.map((locus: any) => ({
            name: locus.name,
            alleles: {
              create: locus.alleles
            }
          }))
        },
        expressionRules: {
          deleteMany: {},
          create: req.body.expressionRules
        }
      },
      include: {
        loci: { include: { alleles: true } },
        expressionRules: true
      }
    });

    logger.info({ gene: updated }, "Gene updated");
    res.status(200).json(updated);
  }

  catch (error: any) {

    if (error.code === "P2025") {
      res.status(404).json({ message: "Gene not found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error"});
  }
})

// DELETE gene
router.delete("/:geneId", async (req, res) => {

  try { 
    const deletedGene = await prisma.gene.delete({
      where: { id: Number(req.params.geneId) }
    });

    logger.info({ gene: deletedGene }, "Gene deleted");
    res.status(200).json(deletedGene);
  }

  catch (error: any) {

    if (error.code === "P2025") {
      res.status(404).json({ message: "Gene could not be found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error"});
  }
})

export default router;
