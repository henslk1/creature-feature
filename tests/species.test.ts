import request from "supertest";
import app from "../app";
import prisma from "../lib/prisma";

describe("Species routes", () => {

  // ID for object created during testing.
  let createdId: number;

  // Object to be used in testing
  beforeAll(async () => {
    const response = await request(app)
    .post("/species")
    .send({ name: "Gremlin", description: "Mythical creature" });
    createdId = response.body.id;
  });

  it("should return a list of species", async () => {
    const response = await request(app).get("/species");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return an individual species", async () => {
    const response = await request(app).get(`/species/${createdId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Gremlin");
  });


});