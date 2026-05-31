import request from "supertest";
import app from "../../../app";
import { createTestAttribute, createTestSpecies, deleteTestSpecies } from "../helpers";

describe("Attribute validation", () => {

  let speciesId: number;
  let basePath: string;

  const invalidAttributeId = 999999;
  const duplicateAttributeName = "Test Attribute";
  const emptyName = "";
  const testSpeciesName = "Validate Species";

  beforeAll(async () => {
    const speciesResponse = await createTestSpecies(testSpeciesName);
    speciesId = speciesResponse.body.id;

    basePath = `/species/${speciesId}/attributes`;

    await createTestAttribute(speciesId, duplicateAttributeName);
  });

  it("should return 404 for an attribute that does not exist", async () => {
    const response = await request(app).get(`${basePath}/${invalidAttributeId}`);
    expect(response.status).toBe(404);
  });

  it("should return 409 when creating an attribute with a duplicate name", async () => {
    const response = await createTestAttribute(speciesId, duplicateAttributeName);
    expect(response.status).toBe(409);
  });

  it("should return 400 when creating an attribute with invalid data", async () => {
    const response = await createTestAttribute(speciesId, emptyName);
    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await deleteTestSpecies(speciesId);
  });

});
