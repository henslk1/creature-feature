import { weightedRandom, applyOverrides } from "../lib/serviceUtils";

export function rollGenes(genes: any[], overrides: any[]): Record<string, { expression: string, allele1: string, allele2: string }> {
  const expressedTraits: Record<string, { expression: string, allele1: string, allele2: string }> = {};

  for (const gene of genes) {
    for (const locus of gene.loci) {
      const alleles = applyOverrides(locus.alleles, overrides);
      if (alleles.every(a => a.probability === 0)) continue;

      const allele1 = weightedRandom(alleles);
      const allele2 = weightedRandom(alleles);

      const dominantCount = [allele1, allele2].filter(a => a.dominance === "dominant").length;
      const rule = gene.expressionRules
        .filter((r: any) => r.minDominantAlleles <= dominantCount)
        .sort((a: any, b: any) => b.minDominantAlleles - a.minDominantAlleles)[0];

      if (rule) expressedTraits[gene.name] = { expression: rule.expression, allele1: allele1.symbol, allele2: allele2.symbol };
    }

  }

  return expressedTraits;
}
