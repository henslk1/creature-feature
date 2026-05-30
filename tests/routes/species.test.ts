import request from "supertest";
import app from "../../app";
import { createTestSpecies } from "./helpers";

describe("Species routes", () => {

  // ID for object created during testing.
  let speciesId: number;
  let createStatus: number;
  const invalidSpeciesId = 99999;
  const duplicateSpeciesName = "Updated Species";
  const emptyName = "";

  // Object to be used in testing
  beforeAll(async () => {
    const response = await createTestSpecies();
    speciesId = response.body.id;
    createStatus = response.status;
  });

  it("should create a new species", async () => {
    expect(createStatus).toBe(201);
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
    expect(Array.isArray(response.body.genes)).toBe(true);
    expect(Array.isArray(response.body.stats)).toBe(true);
    expect(Array.isArray(response.body.attributes)).toBe(true);
    expect(Array.isArray(response.body.breeds)).toBe(true);
  });

  it("should update species-level fields", async () => {
    const response = await request(app)
      .patch(`/species/${speciesId}`)
      .send({ name: "Updated Species"});
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Species");
  });

  it("should return 404 for a species that does not exist", async () => {
    const response = await request(app).get(`/species/${invalidSpeciesId}`);
    expect(response.status).toBe(404);
  });

  it("should return 409 when creating a species with a duplicate name", async () => {
    const response = await request(app)
      .post("/species")
      .send({ name: duplicateSpeciesName });
    expect(response.status).toBe(409);
  });

  it("should return 400 when creating a species with invalid data", async () => {
    const response = await request(app)
      .post("/species")
      .send({ name: emptyName });
    expect(response.status).toBe(400);
  });

  it("should delete an individual species", async () => {
    const response = await request(app).delete(`/species/${speciesId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(speciesId);
  });

});
