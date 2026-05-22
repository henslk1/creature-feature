import request from "supertest";
import app from "../app";

export async function createTestSpecies() {
  const response = await request(app)
    .post("/species")
    .send({ name: "Test Species", description: "Test Species Description" });
  return response.body;
}