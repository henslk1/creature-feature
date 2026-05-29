import { rollAttributes } from "../../services/rollAttributes";
import { testAttributes } from "./testData";

describe("rollAttributes", () => {

  it("should roll within a number range", () => {
    const result = rollAttributes([testAttributes.numAttr]);
    expect(result["numberAttr"]).toBeGreaterThanOrEqual(testAttributes.numAttr.min);
    expect(result["numberAttr"]).toBeLessThanOrEqual(testAttributes.numAttr.max);
    expect(typeof result["numberAttr"]).toBe("number");
  });

  it("should roll and pick one option in a given enum", () => {
    const result = rollAttributes([testAttributes.enumAttr]);
    expect(testAttributes.enumAttr.options).toContain(result["enumAttr"]);
    expect(typeof result["enumAttr"]).toBe("string");
  });

  it("should return an empty string when a string is given", () => {
    const result = rollAttributes([testAttributes.stringAttr]);
    expect(result["stringAttr"]).toBe("");
    expect(typeof result["stringAttr"]).toBe("string");
  });

})
