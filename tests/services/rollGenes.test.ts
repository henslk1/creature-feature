import { rollGenes } from "../../services/rollGenes";
import { testGeneA, testGeneB, testGeneOverrides } from "./testData";

describe("rollGenes", () => {

  it("should return Full Expression when all of the alleles are dominant", () => {
    const result = rollGenes([testGeneA], testGeneOverrides.allDominant);
    expect(result["Test Gene A"]).toBeDefined();
    expect(typeof result["Test Gene A"]).toBe("string");
    expect(result["Test Gene A"]).toBe("Full Expression");
  });

  it("should return No Expression when all alleles are recessive", () => {
    const result = rollGenes([testGeneA], testGeneOverrides.allRecessive);
    expect(result["Test Gene A"]).toBeDefined();
    expect(result["Test Gene A"]).toBe("No Expression");
    expect(typeof result["Test Gene A"]).toBe("string");
  });

  it("should return Test Expression when dominant count meets minimum threshold", () => {
    const result = rollGenes([testGeneB], testGeneOverrides.noOverride);
    expect(result["Test Gene B"]).toBeDefined();
    expect(result["Test Gene B"]).toBe("Test Expression");
    expect(typeof result["Test Gene B"]).toBe("string");
  });

})
