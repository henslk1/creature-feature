import request from "supertest";
import app from "../../../app";

describe("Species validation", () => {

  let duplicateId: number;

  const invalidSpeciesId = 999999;
  const duplicateSpeciesName = "Validate Species";
  const emptyName = "";

  beforeAll(async () => {
    const response = await request(app).post("/species").send({ name: duplicateSpeciesName });
    duplicateId = response.body.id;
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

  afterAll(async () => {
    await request(app).delete(`/species/${duplicateId}`);
  });

});
