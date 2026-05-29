import { rollInRange } from "../../lib/rollUtils";
import { testStats } from "./testData";

describe("rollInRange", () => {

  it("should return a result between statA min and max", () => {
    const result = rollInRange(testStats.statA.min, testStats.statA.max);
    expect(result).toBeGreaterThanOrEqual(testStats.statA.min);
    expect(result).toBeLessThanOrEqual(testStats.statA.max);
    expect(typeof result).toBe("number");
  });

})
