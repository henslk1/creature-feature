export function weightedRandom<T extends { probability: number }>(items: T[]) {
  let roll = Math.random();
  for (const item of items) {
    roll -= item.probability;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

export function getRange(stat: any, statRanges: any[]): { min: number, max: number } {
  const range = statRanges.find(r =>r.stat === stat.name);
  return range ?? { min: stat.min, max: stat.max };
}

export function rollInRange(min: number, max: number) {
  let result = Math.random() * (max - min) + min;
  return result;
}

export function rollEnum(options: string[]): string {
  return options[Math.floor(Math.random() * options.length)] ?? "";
}

export function rollString(): string {
  return "";
}

export function applyOverrides(alleles: any[], overrides: any[]) {
  return alleles.map(allele => {
    const override = overrides.find(o => o.alleleId === allele.id);
    return override ? { ...alleles, probability: override.probability } : allele;
  })
}
