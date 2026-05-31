import { z } from "zod";
import { animalSchema, speciesSchema } from "./schemas";

export const speciesPatchSchema = speciesSchema.partial();
export const animalPatchSchema = animalSchema.partial();

export const breedPatchSchema = z.object({
  name: z.string().min(1).optional(),
  active: z.boolean().optional(),
});

export const genePatchSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  active: z.boolean().optional(),
});


