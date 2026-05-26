import request from "supertest";
import app from "../app";
import { createTestStat, createTestSpecies, deleteTestSpecies } from "./helpers";

describe("Stat routes", () => {

  // ID for object created during testing and path definition
  let speciesId: number;
  let statId: number;
  let statCreateStatus: number;
  let basePath: string;

  // Object to be used in testing
  beforeAll(async () => {
    const speciesResponse = await createTestSpecies();
    speciesId = speciesResponse.body.id;

    const statResponse = await createTestStat(speciesId);
    statId = statResponse.body.id;
    statCreateStatus = statResponse.status;

    basePath = `/species/${speciesId}/stats`;
  })

  it("should create a new stat", async () => {
    expect(statCreateStatus).toBe(201);
    expect(statId).toBeDefined();
    expect(typeof statId).toBe("number");
  });

  it("should return a specific stat", async () => {
    const response = await request(app).get(`${basePath}/${statId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Test Stat");
  });

  it("should update stat-level fields", async () => {
    const response = await request(app)
      .patch(`${basePath}/${statId}`)
      .send({ name: "Updated Stat" });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Stat");
  });

  // DELETE stat

  afterAll(async () => {
    await deleteTestSpecies(speciesId);
  })

});
