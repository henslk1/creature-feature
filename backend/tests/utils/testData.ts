export const testAlleles = [
  { id: 1, name: "A", probability: 0.5 },
  { id: 2, name: "B", probability: 0.5 },
  { id: 3, name: "C", probability: 0.0 }
];

export const singleItem = [{ id: 1, name: "A", probability: 1 }];

export const testOverrides = {
  matchFirst: [{ alleleId: 1, probability: 0.8 }],
  matchSecond: [{ alleleId: 2, probability: 0.8 }],
  noMatch: [{ alleleId: 99, probability: 0.8 }]
};

export const testStats = {
  statA: { name: "Stat A", min: 0, max: 100 },
  statB: { name: "Stat B", min: 0, max: 100 },
  statC: { name: "Stat C", min: 25, max: 75 }
};

export const testStatRanges = {
  withMatch: [{ stat: "Stat A", min: 50, max: 100 }],
  noMatch: [{ stat: "Stat Z", min: 50, max: 100 }],
  doubleRange: [
    { stat: "Stat A", min: 50, max: 100 },
    { stat: "Stat B", min: 25, max: 100 }
  ]
};

export const testEnumOptions = {
  colors: ["Red", "Blue", "Green"],
  empty: []
};
