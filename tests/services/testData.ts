export const testStatsArray = [
  { name: "StatA", min: 0, max: 100 },
  { name: "StatB", min: 10, max: 80}
];

export const testStatRanges = [
  { stat: "StatA", min: 50, max: 75 }
];

export const emptyStatRanges = [];

export const testAttributes = {
  numAttr: { name: "numberAttr", type: "number", min: 14, max: 18 },
  enumAttr: { name: "enumAttr", type: "enum", options: ["1", "2", "3"] },
  stringAttr: { name: "stringAttr", type: "string" }
};

export const testGene = {
  name: "Test Gene",
  category: "Color",
  loci: [
    {
      name: "Test Locus",
      alleles: [
        { id: 1, name: "Allele A", symbol: "A", dominance: "dominant", probability: 0.5 },
        { id: 2, name: "Allele a", symbol: "a", dominance: "recessive", probability: 0.5}
      ]
    }
  ],
  expressionRules: [
    { minDominantAlleles: 0, expression: "No Expression" },
    { minDominantAlleles: 1, expression: "Test Expression" },
    { minDominantAlleles: 2, expression: "Full Expression"}
  ]
}
