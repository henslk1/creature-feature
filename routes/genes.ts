import { Router } from "express";
import prisma from "../lib/prisma";
import logger from "../lib/logger";
import { validate } from "../lib/validate";
import { geneSchema } from "../lib/schemas";

const router = Router({ mergeParams: true });


export default router;
