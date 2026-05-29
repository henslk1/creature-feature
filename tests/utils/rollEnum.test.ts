import { rollEnum } from "../../lib/rollUtils";
import { testEnumOptions } from "./testData";

describe("rollEnum", () => {

  it("should return an option from the enum", () => {
    const result = rollEnum(testEnumOptions.colors);
    expect(testEnumOptions.colors).toContain(result);
    expect(typeof result).toBe("string");
  });

  it("should return an empty string", () => {
    const result = rollEnum(testEnumOptions.empty);
    expect(result).toBe("");
    expect(typeof result).toBe("string");
  });

})
