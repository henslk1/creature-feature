import request from "supertest";
import app from "../../../app";
import { createTestGene, createTestSpecies, deleteTestSpecies } from "../helpers";

describe("Gene validation", () => {

  let speciesId: number;
  let basePath: string;

  const invalidGeneId = 999999;
  const duplicateGeneName = "Validate Gene";
  const emptyName = "";
  const testSpeciesName = "Validate Species";

  beforeAll(async () => {
    const speciesResponse = await createTestSpecies(testSpeciesName);
    speciesId = speciesResponse.body.id;

    basePath = `/species/${speciesId}/genes`;

    await createTestGene(speciesId, duplicateGeneName);
  });

  it("should return 404 for a gene that does not exist", async () => {
    const response = await request(app).get(`${basePath}/${invalidGeneId}`);
    expect(response.status).toBe(404);
  });

  it("should return 409 when creating a gene with a duplicate name", async () => {
    const response = await createTestGene(speciesId, duplicateGeneName);
    expect(response.status).toBe(409);
  });

  it("should return 400 when creating a gene with invalid data", async () => {
    const response = await createTestGene(speciesId, emptyName);
    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await deleteTestSpecies(speciesId);
  });

});
