import request from "supertest";
import app from "../app";

describe("Species routes", () => {

  it("should return a list of species", async() => {
    const response = await request(app).get("/species");
    expect(response.status).toBe(200);
  });

  it("should create a new species", async () => {
    const response = await request(app)
      .post("/species")
      .send({ name: "Dog", description: "Canine species" });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Dog");
  })
  
});