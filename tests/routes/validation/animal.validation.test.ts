import request from "supertest";
import app from "../../../app";
import { createTestSpecies, createTestBreed, deleteTestSpecies } from "../helpers";

describe("Animal validation", () => {

  let speciesId: number;
  let breedId: number;
  const testSpeciesName = "Validate Species";
  const testBreedName = "Validate Breed";

  const invalidAnimalId = 999999;
  const emptyName = "";

  beforeAll( async () => {
    const speciesResponse = await createTestSpecies(testSpeciesName);
    speciesId = speciesResponse.body.id;

    const breedResponse = await createTestBreed(speciesId, testBreedName);
    breedId = breedResponse.body.id;
  });

  it("should return 404 for an animal that doesn't exist", async () => {
    const response = await request(app).get(`/animals/${invalidAnimalId}`);
    expect(response.status).toBe(404);
  });

  it("should return 400 when creating an animal with invalid data", async () => {
    const response = await request(app)
      .post("/animals")
      .send({ name: emptyName, breedId });
    expect(response.status).toBe(400);
  });

  afterAll( async () => {
    await deleteTestSpecies(speciesId);
  }) 

});
