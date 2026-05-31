import { rollInRange } from "../../lib/serviceUtils";
import { testStats } from "./testData";

describe("rollInRange", () => {

  it("should return a result between statA min and max", () => {
    const result = rollInRange(testStats.statA.min, testStats.statA.max);
    expect(result).toBeGreaterThanOrEqual(testStats.statA.min);
    expect(result).toBeLessThanOrEqual(testStats.statA.max);
    expect(typeof result).toBe("number");
  });

  it("should return a result between statC min and max", () => {
    const result = rollInRange(testStats.statC.min, testStats.statC.max);
    expect(result).toBeGreaterThanOrEqual(testStats.statC.min);
    expect(result).toBeLessThanOrEqual(testStats.statC.max);
    expect(typeof result).toBe("number");
  });

})
