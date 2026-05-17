import { Router } from "express";
import prisma from "../lib/prisma";
import logger from "../lib/logger";

const router = Router();

// GET all species
router.get("/", async (req, res) => {

  try {
    const getSpecies = await prisma.species.findMany({
      orderBy: { id: "asc"}
    });

    logger.info({ species: getSpecies }, "species found");
    res.json(getSpecies);
  }
  
  catch(error) {
    logger.error({ error }, "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }

})

// GET individual species
router.get("/:speciesId", async (req, res) => {

  try {
    const found = await prisma.species.findUnique({
      where: { id: Number(req.params.speciesId) }
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

export default router;
