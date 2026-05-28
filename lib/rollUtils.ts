export function weightedRandom<T extends { probability: number }>(items: T[]) {
  let roll = Math.random();
  for (const item of items) {
    roll -= item.probability;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

export function applyOverrides(alleles: any[], overrides: any[]) {
  return alleles.map(allele => {
    const override = overrides.find(o => o.alleleId === allele.id);
    return override ? { ...alleles, probability: override.probability } : allele;
  })
}
