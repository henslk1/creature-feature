import request from "supertest";
import app from "../../app";
import {
  createTestAnimal,
  createTestBreed,
  createTestAttribute,
  createTestGene,
  createTestSpecies,
  createTestStat,
  deleteTestSpecies
} from "./helpers";

describe("Animal routes", () => {

  // ID for object created during testing and base path definition
  let speciesId: number;
  let breedId: number;
  let animalId: number;
  let animalCreateStatus: number;

  // Object to be used in testing
  beforeAll(async () => {
    const speciesResponse = await createTestSpecies();
    speciesId = speciesResponse.body.id;

    const breedResponse = await createTestBreed(speciesId);
    breedId = breedResponse.body.id;

    await createTestGene(speciesId);
    await createTestStat(speciesId);
    await createTestAttribute(speciesId);

    const animalResponse = await createTestAnimal(breedId);
    animalId = animalResponse.body.id;
    animalCreateStatus = animalResponse.status;
  });

  it("should create a new animal", async () => {
    expect(animalCreateStatus).toBe(201);
    expect(animalId).toBeDefined();
    expect(typeof animalId).toBe("number");
  });

  it("should return a list of animals", async () => {
    const response = await request(app).get("/animals");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return an individual animal", async () => {
    const response = await request(app).get(`/animals/${animalId}`);
    expect(response.body.name).toBe("Test Animal");
    expect(response.body.stats).toBeDefined();
    expect(response.body.expressedTraits).toBeDefined();
    expect(response.body.attributes).toBeDefined();
    expect(response.status).toBe(200);
  });

  it("should update animal-level fields", async () => {
    const response = await request(app)
      .patch(`/animals/${animalId}`)
      .send({ name: "Updated Animal" });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Animal");
  });

  it("should delete an animal", async () => {
    const response = await request(app).delete(`/animals/${animalId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(animalId);
  });

  afterAll(async () => {
    await deleteTestSpecies(speciesId);
  });

});
