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
