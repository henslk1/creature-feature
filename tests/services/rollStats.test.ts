import { rollStats } from "../../services/rollStats";
import { testStatsArray, testStatRanges, emptyStatRanges } from "./testData";

describe("rollStats", () => {

  it("should return stats within the species range when no breed range exists", () => {
    const result = rollStats(testStatsArray, emptyStatRanges);
    Object.entries(result).forEach(([name, value]) => {
      const stat = testStatsArray.find(s => s.name === name);
      expect(value).toBeGreaterThanOrEqual(stat!.min);
      expect(value).toBeLessThanOrEqual(stat!.max);
      expect(typeof value).toBe("number");
    });
  });

  it("should return stats within species range and breed range when defined", () => {
    const result = rollStats(testStatsArray, testStatRanges);
    const breedRange = testStatRanges[0]!;
    expect(result[breedRange.stat]).toBeGreaterThanOrEqual(breedRange.min);
    expect(result[breedRange.stat]).toBeLessThanOrEqual(breedRange.max);
    expect(typeof result[breedRange.stat]).toBe("number");
  });

})
