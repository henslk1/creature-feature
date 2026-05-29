import { rollAttributes } from "../../services/rollAttributes";
import { testAttributes } from "./testData";

describe("rollAttributes", () => {

  it("should roll within a number range", () => {
    const result = rollAttributes([testAttributes.numAttr]);
    expect(result["numberAttr"]).toBeGreaterThanOrEqual(testAttributes.numAttr.min);
    expect(result["numberAttr"]).toBeLessThanOrEqual(testAttributes.numAttr.max);
    expect(typeof result["numberAttr"]).toBe("number");
  });
  
})