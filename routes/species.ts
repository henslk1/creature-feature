import { Router } from "express";
import prisma from "../lib/prisma";
import logger from "../lib/logger";

const router = Router();

// GET all species
router.get("/species", async (req, res) => {

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

export default router;
