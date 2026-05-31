export function weightedRandom<T extends { probability: number }>(items: T[]) {
  let roll = Math.random();
  for (const item of items) {
    roll -= item.probability;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

export function getRange(stat: any, statRanges: any[]): { min: number, max: number } {
  const range = statRanges.find(r => r.stat === stat.name);
  return range ?? { min: stat.min, max: stat.max };
}

export function rollInRange(min: number, max: number) {
  const result = Math.random() * (max - min) + min;
  return Math.round(result);
}

export function rollEnum(options: string[]): string {
  return options[Math.floor(Math.random() * options.length)] ?? "";
}

export function applyOverrides(alleles: any[], overrides: any[]) {
  return alleles.map(allele => {
    const override = overrides.find(o => o.alleleId === allele.id);
    return override ? { ...allele, probability: override.probability } : allele;
  });
}

export function applyStatRanges(stats: any[], statRanges: any[]) {
  return stats.map(stat => {
    const statRange = statRanges.find(r => r.stat === stat.name);
    return statRange ? { ...stat, min: statRange.min, max: statRange.max } : stat;
  });
}

export function mapLoci(gene: any, overrides: any[]) {
  return { ...gene, loci: gene.loci.map((locus: any) =>
    ({ ...locus, alleles: applyOverrides(locus.alleles, overrides) })
  ) }
}
