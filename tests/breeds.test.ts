import request from "supertest";
import app from "../app";
import { createTestSpecies, deleteTestSpecies } from "./helpers";
import { createTestBreed } from "./helpers";

describe ("Breed routes", () => {

  // ID's for objects created during testing.
  let speciesId: number;
  let breedId: number;

  // Objects to be used in testing
  beforeAll( async () => {
    const species = await createTestSpecies();
    speciesId = species.id;
    const breed = await createTestBreed(speciesId);
    breedId = breed.id;
  })

  it("should create a new breed", async () => {
    expect(breedId).toBeDefined();
    expect(typeof breedId).toBe("number");
  });

  it("should return a list of breeds", async () => {
    const response = await request(app).get("/breeds");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return an individual breed", async () => {
    const response = await request(app).get(`/breeds/${breedId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Test Breed");
  });

  it("should delete an individual breed", async () => {
    const response = await request(app).delete(`/breeds/${breedId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(breedId);
  })

  afterAll(async () => {
    deleteTestSpecies(speciesId);
  })
  
})