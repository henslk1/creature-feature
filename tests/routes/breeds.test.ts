import request from "supertest";
import app from "../../app";
import { createTestSpecies, deleteTestSpecies, createTestBreed, createTestGene } from "./helpers";

describe("Breed routes", () => {

  // ID's for objects created during testing.
  let speciesId: number;
  let breedId: number;
  let alleleId: number;
  let breedCreateStatus: number;

  // Objects to be used in testing
  beforeAll(async () => {
    const speciesResponse = await createTestSpecies();
    speciesId = speciesResponse.body.id;

    const geneResponse = await createTestGene(speciesId);
    alleleId = geneResponse.body.loci[0].alleles[0].id;

    const breedResponse = await createTestBreed(speciesId);
    breedId = breedResponse.body.id;
    breedCreateStatus = breedResponse.status;
  });

  it("should create a new breed", async () => {
    expect(breedCreateStatus).toBe(201);
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
    expect(Array.isArray(response.body.overrides)).toBe(true);
    expect(Array.isArray(response.body.statRanges)).toBe(true);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Test Breed");
  });

  it("should update breed-level fields", async () => {
    const response = await request(app)
      .patch(`/breeds/${breedId}`)
      .send({ name: "Updated Breed" });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Breed");
  });

  it("should upsert an allele override", async () => {
    const response = await request(app)
      .put(`/breeds/${breedId}/overrides`)
      .send({ alleleId, probability: 0.8 });
    expect(response.status).toBe(200);
    expect(response.body.probability).toBe(0.8);
  });

  it("should delete an individual breed", async () => {
    const response = await request(app).delete(`/breeds/${breedId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(breedId);
  });

  afterAll(async () => {
    await deleteTestSpecies(speciesId);
  });

});