import request from "supertest";
import app from "../app";
import { createTestGene, createTestSpecies } from "./helpers";

describe("Gene routes", () => {

  // ID for object created during testing
  let speciesId: number;
  let geneId: number;
  let geneCreateStatus: number;

  // Object to be used in testing
  beforeAll(async () => {
    const speciesResponse = await createTestSpecies();
    speciesId = speciesResponse.body.id;

    const geneResponse = await createTestGene(speciesId);
    geneId = geneResponse.body.id;
    geneCreateStatus = geneResponse.status;
  })

  it("should create a new gene", async () => {
    expect(geneCreateStatus).toBe(201);
    expect(geneId).toBeDefined();
    expect(typeof geneId).toBe("number");
  });

  it("should return a specific gene", async () => {
    const response = await request(app).get(`/species/${speciesId}/genes/${geneId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Test Gene");
  });
})