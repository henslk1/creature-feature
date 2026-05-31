import { vi } from "vitest";
import { generateAnimal } from "../../services/generator";
import { mockBreedData } from "./testData";

vi.mock("../../services/queries", () => ({
  fetchBreedProfile: vi.fn()
}));

import { fetchBreedProfile } from "../../services/queries";

describe("generateAnimal", () => {

  beforeAll(() => {
    (fetchBreedProfile as any).mockResolvedValue(mockBreedData);
  });

  it("should return stats, expressedTraits, and attributes", async () => {
    const result = await generateAnimal(mockBreedData.id);
    expect(result).toBeDefined();
    expect(result.stats).toBeDefined();
    expect(result.expressedTraits).toBeDefined();
    expect(result.attributes).toBeDefined();
    expect(typeof result.stats).toBe("object");
    expect(typeof result.expressedTraits).toBe("object");
    expect(typeof result.attributes).toBe("object");
  });

  it("should throw an error when breed is not found", async () => {
    (fetchBreedProfile as any).mockResolvedValue(null);
    await expect(generateAnimal(999)).rejects.toThrow();
  });

});
