import { applyOverrides } from "../../lib/rollUtils";
import { testAlleles, singleItem, testOverrides } from "./testData";

describe("applyOverrides", () => {

  it("should apply an override to allele 1", () => {
    const result = applyOverrides(testAlleles, testOverrides.matchFirst);
    expect(result[0].probability).toBe(0.8);
  });

  it("should apply an override to allele 2", () => {
    const result = applyOverrides(testAlleles, testOverrides.matchSecond);
    expect(result[1].probability).toBe(0.8);
  })

  it("should not apply an override to any allele", () => {
    const result = applyOverrides(testAlleles, testOverrides.noMatch);
    result.forEach(allele => {
      expect(allele.probability).not.toBe(0.8);
    });
  });
  
})
