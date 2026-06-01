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

export interface Stat {
  id: number,
  name: string,
}

export interface Attribute {
  id: number,
  name: string,
}

export interface Animal {
  id: number,
  name: string,
}

export interface Breed {
  id: number,
  name: string,
}

export interface Species {
  id: number,
  name: string,
}
