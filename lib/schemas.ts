import { z } from "zod";

export const speciesSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const breedSchema = z.object({
  name: z.string().min(1),
  speciesId: z.number().int().positive(),
});
