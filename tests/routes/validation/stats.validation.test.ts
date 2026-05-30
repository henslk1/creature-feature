import request from "supertest";
import app from "../../../app";
import { createTestSpecies, deleteTestSpecies, createTestStat } from "../helpers";

describe("Stats validation", () => {

  let speciesId: number;
  let basePath: string;

  const invalidStatId = 999999;
  const duplicateStatName = "Validate Stat";
  const emptyName = "";
  const testSpeciesName = "Validate Species";

  beforeAll( async () => {
    const speciesResponse = await createTestSpecies(testSpeciesName);
    speciesId = speciesResponse.body.id;

    basePath = `/species/${speciesId}/stats`;

    const duplicateStat = await createTestStat(speciesId, duplicateStatName);
  })

  it("should return 404 for stat that does not exist", async () => {
    const response = await request(app).get(`${basePath}/${invalidStatId}`);
    expect(response.status).toBe(404);
  });

  it("should return 409 when creating a stat with a duplicate name", async () => {
    const response = await createTestStat(speciesId, duplicateStatName);
    expect(response.status).toBe(409);
  });

  it("should return 400 when creating a stat with invalid data", async () => {
    const response = await createTestStat(speciesId, emptyName);
    expect(response.status).toBe(400);
  });

  afterAll( async () => {
    await deleteTestSpecies(speciesId);
  })

});
