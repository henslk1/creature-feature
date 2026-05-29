import { getRange } from "../../lib/rollUtils";
import { testStats, testStatRanges } from "./testData";

describe("getRange", () => {

  it("should return 50 for Stat A", () => {
    const result = getRange(testStats.statA, testStatRanges.withMatch);
    expect(result.min).toBe(50);
  });

  it("should return 50 for Stat B", () => {
    const result =getRange(testStats.statB, testStatRanges.noMatch);
    expect(result.min).toBe(0);
  });

  it("should return min: 25 for Stat B", () => {
    const result = getRange(testStats.statB, testStatRanges.doubleRange);
    expect(result.min).toBe(25);
  });

})
