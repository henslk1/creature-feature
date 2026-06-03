import { Router } from "express";
import prisma from "../lib/prisma";
import logger from "../lib/logger";
import { validate } from "../lib/validate";
import { geneSchema } from "../lib/schemas";
import { genePatchSchema } from "../lib/patchSchemas";

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
    res.status(500).json({ message: "Internal server error" });
  }
});

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
});

// Update gene fields and optionally upsert loci/alleles/expressionRules
router.patch("/:geneId", validate(genePatchSchema), async (req, res) => {

  const geneId = Number(req.params.geneId);
  const { name, category, active, loci, expressionRules } = req.body;

  try {
    const updated = await prisma.$transaction(async (tx) => {

      const exists = await tx.gene.findUnique({ where: { id: geneId } });
      if (!exists) return null;

      const geneData: any = {};
      if (name !== undefined) geneData.name = name;
      if (category !== undefined) geneData.category = category;
      if (active !== undefined) geneData.active = active;

      if (Object.keys(geneData).length > 0) {
        await tx.gene.update({ where: { id: geneId }, data: geneData });
      }

      if (loci !== undefined) {
        const keptLocusIds = loci.filter((l: any) => l.id).map((l: any) => l.id);
        await tx.locus.deleteMany({ where: { geneId, id: { notIn: keptLocusIds } } });

        for (const locus of loci) {
          if (locus.id) {
            await tx.locus.update({ where: { id: locus.id }, data: { name: locus.name } });
            const keptAlleleIds = locus.alleles.filter((a: any) => a.id).map((a: any) => a.id);
            await tx.allele.deleteMany({ where: { locusId: locus.id, id: { notIn: keptAlleleIds } } });
            for (const allele of locus.alleles) {
              if (allele.id) {
                await tx.allele.update({
                  where: { id: allele.id },
                  data: { name: allele.name, symbol: allele.symbol, dominance: allele.dominance, probability: allele.probability }
                });
              } else {
                await tx.allele.create({
                  data: { name: allele.name, symbol: allele.symbol, dominance: allele.dominance, probability: allele.probability, locusId: locus.id }
                });
              }
            }
          } else {
            await tx.locus.create({
              data: {
                name: locus.name,
                geneId,
                alleles: {
                  create: locus.alleles.map((a: any) => ({
                    name: a.name, symbol: a.symbol, dominance: a.dominance, probability: a.probability
                  }))
                }
              }
            });
          }
        }
      }

      if (expressionRules !== undefined) {
        const keptRuleIds = expressionRules.filter((r: any) => r.id).map((r: any) => r.id);
        await tx.expressionRule.deleteMany({ where: { geneId, id: { notIn: keptRuleIds } } });
        for (const rule of expressionRules) {
          if (rule.id) {
            await tx.expressionRule.update({
              where: { id: rule.id },
              data: { minDominantAlleles: rule.minDominantAlleles, expression: rule.expression }
            });
          } else {
            await tx.expressionRule.create({
              data: { minDominantAlleles: rule.minDominantAlleles, expression: rule.expression, geneId }
            });
          }
        }
      }

      return tx.gene.findUnique({
        where: { id: geneId },
        include: { loci: { include: { alleles: true } }, expressionRules: true }
      });
    });

    if (!updated) {
      res.status(404).json({ message: "Gene not found" });
      return;
    }

    logger.info({ gene: updated }, "Gene updated");
    res.status(200).json(updated);
  }

  catch (error: any) {

    if (error.code === "P2002") {
      res.status(409).json({ message: "Gene name already exists" });
      return;
    }

    if (error.code === "P2025") {
      res.status(404).json({ message: "Gene not found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
});

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
      res.status(404).json({ message: "Gene not found" });
      return;
    }

    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
