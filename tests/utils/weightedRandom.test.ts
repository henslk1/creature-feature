import * as rollUtils from "../../lib/rollUtils";
import { testAlleles, singleItem } from "./testData";

describe("weightedRandom", () => {

  it("should return an item from the array", () => {
    const result = rollUtils.weightedRandom(testAlleles);
    expect(testAlleles).toContain(result);
  });

  it("should always return the only item when probability is 1", () => {
    const result = rollUtils.weightedRandom(singleItem);
    expect(result).toBeDefined();
    if (result) expect(result.name).toBe("A");
  });

  it("never returns an item with probability of 0", () => {
    for (let i = 0; i < 1000; ++i) {
      const result = rollUtils.weightedRandom(testAlleles);
      if (result) expect(result.name).not.toBe("C");
    }
  });
})
