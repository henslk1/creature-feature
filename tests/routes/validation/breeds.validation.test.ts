import request from "supertest";
import app from "../../../app";
import { createTestBreed, createTestSpecies, deleteTestSpecies } from "../helpers";

describe("Breeds validation", () => {

  let duplicateId: number;
  let speciesId: number;

  const invalidBreedId = 999999;
  const invalidAlleleId = 999999;
  const duplicateBreedName = "Validate Breed";
  const emptyName = "";

  beforeAll(async () => {
    const speciesResponse = await createTestSpecies("Validate Species");
    speciesId = speciesResponse.body.id;

    const breedResponse = await createTestBreed(speciesId, duplicateBreedName);
    duplicateId = breedResponse.body.id;
  });

  it("should return 404 for a breed that does not exist", async () => {
    const response = await request(app).get(`/breeds/${invalidBreedId}`);
    expect(response.status).toBe(404);
  });

  it("should return 409 when creating a breed with a duplicate name", async () => {
    const response = await request(app)
      .post("/breeds")
      .send({ speciesId, name: duplicateBreedName });
    expect(response.status).toBe(409);
  });

  it("should return 404 when overriding with an invalid allele id", async () => {
    const response = await request(app)
      .put(`/breeds/${duplicateId}/overrides`)
      .send({ alleleId: invalidAlleleId, probability: 0.8 });
    expect(response.status).toBe(404);
  });

  it("should return 400 when creating a breed with invalid data", async () => {
    const response = await request(app)
      .post("/breeds")
      .send({ speciesId, name: emptyName });
    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await deleteTestSpecies(speciesId);
  });

});
