export interface Allele {
  id: number,
  name: string,
  symbol: string,
  dominance: string,
  probability: number,
  locusId: number,
}

export interface Locus {
  id: number,
  name: string,
  alleles: Allele[],
  geneId: number
}

export interface ExpressionRule {
  id: number,
  minDominantAlleles: number,
  expression: string,
  geneId: number
}

export interface Gene {
  id: number,
  createdAt: string,
  name: string,
  category: string,
  loci: Locus[],
  expressionRules: ExpressionRule[],
  active: boolean,
  speciesId: number
}

export interface AlleleOverride {
  id: number,
  probability: number,
  alleleId: number,
  breedId: number
}

export interface Stat {
  id: number,
  name: string,
  min: number,
  max: number,
  speciesId: number
}

export interface StatRange {
  id: number,
  min: number,
  max: number,
  stat: string,
  breedId: number
}

export interface Attribute {
  id: number,
  name: string,
  type: string,
  min?: number,
  max?: number,
  options: string[],
  optional: boolean,
  mutable: boolean,
  speciesId: number
}

export interface Animal {
  id: number,
  createdAt: string,
  name: string,
  age: number,
  breedId: number,
  expressedTraits: any,
  stats: any,
  attributes: any,
  modifier?: any
}

export interface Breed {
  id: number,
  createdAt: string,
  name: string,
  active: boolean,
  overrides: AlleleOverride[],
  statRanges: StatRange[],
  genes: Gene[],
  stats: Stat[],
  attributes: Attribute[],
  speciesId: number
}

export interface Species {
  id: number,
  createdAt: string,
  name: string,
  description?: string,
  attributes: Attribute[],
  stats: Stat[],
  genes: Gene[],
  breeds: Breed[]
}
