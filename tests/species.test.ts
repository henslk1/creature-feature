import request from "supertest";
import app from "../app";
import { createTestSpecies } from "./helpers";

describe("Species routes", () => {

  // ID for object created during testing.
  let speciesId: number;

  // Object to be used in testing
  beforeAll(async () => {
    const species = await createTestSpecies();
    speciesId = species.id;
  });

  it("should create a new species", async () => {
    expect(speciesId).toBeDefined();
    expect(typeof speciesId).toBe("number");
  });

  it("should return a list of species", async () => {
    const response = await request(app).get("/species");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return an individual species", async () => {
    const response = await request(app).get(`/species/${speciesId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Test Species");
  });

  it("should delete an individual species", async () => {
    const response = await request(app).delete(`/species/${speciesId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(speciesId);
  })

});