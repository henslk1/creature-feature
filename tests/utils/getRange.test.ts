import { getRange } from "../../lib/rollUtils";
import { testStats, testStatRanges } from "./testData";

describe("getRange", () => {

  it("should return 50-100 for Stat A", () => {
    const result = getRange(testStats.statA, testStatRanges.withMatch);
    expect(result.min).toBe(50);
    expect(result.max).toBe(100);
  });

  it("should return 0 - 100 for Stat B", () => {
    const result =getRange(testStats.statB, testStatRanges.noMatch);
    expect(result.min).toBe(0);
    expect(result.max).toBe(100);
  });

  it("should return 25 - 100 for Stat B", () => {
    const result = getRange(testStats.statB, testStatRanges.doubleRange);
    expect(result.min).toBe(25);
    expect(result.max).toBe(100);
  });

})
