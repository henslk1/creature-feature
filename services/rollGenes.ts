import { weightedRandom, applyOverrides } from "../lib/rollUtils";

export function rollGenes(genes: any[], overrides: any[]): Record<string, string> {
  const expressedTraits: Record<string, string> = {};

  for (const gene of genes) {
    for (const locus of gene.loci) {

      const alleles = applyOverrides(locus.alleles, overrides);

      const allele1 = weightedRandom(alleles);
      const allele2 = weightedRandom(alleles);

      const dominantCount = [allele1, allele2].filter(a => a.dominance === "dominant").length;
      const rule = gene.expressionRules.find((r: any) => r.minDominantAlleles === dominantCount);

      if (rule) expressedTraits[gene.name] = rule.expression;

    }

  }

  return expressedTraits;
}
