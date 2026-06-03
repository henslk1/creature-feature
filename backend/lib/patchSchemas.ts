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
  loci: z.array(z.object({
    id: z.number().int().positive().optional(),
    name: z.string().min(1),
    alleles: z.array(z.object({
      id: z.number().int().positive().optional(),
      name: z.string().min(1),
      symbol: z.string().min(1),
      dominance: z.string().min(1),
      probability: z.number().min(0).max(1),
    })).min(1),
  })).optional(),
  expressionRules: z.array(z.object({
    id: z.number().int().positive().optional(),
    minDominantAlleles: z.number().int().min(0),
    expression: z.string().min(1),
  })).optional(),
});

export const statPatchSchema = z.object({
  name: z.string().min(1).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
}).refine(data => {
  if (data.min !== undefined && data.max !== undefined) {
    return data.min < data.max;
  }
  return true;
}, { message: "min must be less than max" });

export const attributePatchSchema = z.object({
  name: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  options: z.array(z.string()).optional(),
  optional: z.boolean().optional(),
  mutable: z.boolean().optional(),
}).refine(data => {
  if (data.min !== undefined && data.max !== undefined) {
    return data.min < data.max;
  }
  return true;
}, { message: "min must be less than max" });
