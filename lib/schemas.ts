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
});

export const locusSchema = z.object({
  name: z.string().min(1),
  alleles: z.array(alleleSchema).min(1),
});

export const expressionRuleSchema = z.object({
  minDominantAlleles: z.number().int().min(0),
  expression: z.string().min(1),
});

export const geneSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  loci: z.array(locusSchema).min(1),
  expressionRules: z.array(expressionRuleSchema).min(1),
});
