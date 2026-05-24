import { z } from "zod";

export const speciesSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const breedSchema = z.object({
  name: z.string().min(1),
  speciesId: z.number().int().positive(),
});

export const alleleSchema = z.object({
  name: z.string().min(1),
  symbol: z.string().min(1),
  dominance: z.string().min(1),
  probability: z.number().max(1),
})


