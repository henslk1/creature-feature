import * as rollUtils from "../../lib/rollUtils";

describe("weightedRandom", () => {
  const items = [
    { name: "A", probability: 0.5},
    { name: "B", probability: 0.5},
    { name: "C", probability: 0.0}
  ];

  it ("should return an item from the array", () => {
    const result = rollUtils.weightedRandom(items);
    expect(items).toContain(result);
  });

  it("should always return the only item when probability is 1", () => {
    const single = [{ name: "A", probability: 1 }];
    const result = rollUtils.weightedRandom(single);
    expect(result).toBeDefined();
    if (result) expect(result.name).toBe("A");
  })

  it("never returns an item with probability of 0", () => {
    for (let i = 0; i < 1000; ++i) {
      const result = rollUtils.weightedRandom(items);
      if (result) expect(result.name).not.toBe("C");
    }
  });
})
