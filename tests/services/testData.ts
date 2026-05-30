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

export const testGeneA = {
  name: "Test Gene A",
  loci: [{ name: "Test Locus A", alleles: [
        { id: 1, symbol: "A", dominance: "dominant", probability: 0.5 },
        { id: 2, symbol: "a", dominance: "recessive", probability: 0.5}
      ]}],
  expressionRules: [
    { minDominantAlleles: 0, expression: "No Expression" },
    { minDominantAlleles: 1, expression: "Test Expression" },
    { minDominantAlleles: 2, expression: "Full Expression"}
  ]
};

export const testGeneB = {
  name: "Test Gene B",
  loci: [{ name: "Test Locus B", alleles: [
    { id: 3, dominance: "dominant", probability: 1 },
    { id: 4, dominance: "recessive", probability: 0}
  ]}],
  expressionRules: [
    { minDominantAlleles: 0, expression: "No Expression" },
    { minDominantAlleles: 1, expression: "Test Expression"}
  ]
};

export const testGeneOverrides = {
  allDominant: [{ alleleId: 1, probability: 1 }],
  allRecessive: [{ alleleId: 1, probability: 0 }],
  noOverride: []
};

export const mockBreedData = {
  id: 1,
  statRanges: testStatRanges,
  overrides: [],
  species: {
    stats: testStatsArray,
    attributes: Object.values(testAttributes),
    genes: [testGeneA, testGeneB]
  }
};
