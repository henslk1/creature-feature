import request from "supertest";
import app from "../app";
import { createTestAttribute, createTestSpecies, deleteTestSpecies } from "./helpers";

describe("Attribute routes", () => {

  // ID for object created during testing and path definition
  let speciesId: number;
  let attributeId: number;
  let attributeCreateStatus: number;
  let basePath: string;

  // Object to be used in testing
  beforeAll(async () => {
    const speciesResponse = await createTestSpecies();
    speciesId = speciesResponse.body.id;

    const attributeResponse = await createTestAttribute(speciesId);
    attributeId = attributeResponse.body.id;
    attributeCreateStatus = attributeResponse.status;

    basePath = `/species/${speciesId}/attributes`;
  })

  it("should create a new attribute", async () => {
    expect(attributeCreateStatus).toBe(201);
    expect(attributeId).toBeDefined();
    expect(typeof attributeId).toBe("number");
  });

  it("should return a specific attribute", async () => {
    const response = await request(app).get(`${basePath}/${attributeId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Test Attribute");
  });

  it("should update attribute-level fields", async () => {

  });

  it("should delete an attribute", async () => {

  })

  afterAll(async () => {
    await deleteTestSpecies(speciesId);
  })

});
