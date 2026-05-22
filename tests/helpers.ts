import request from "supertest";
import app from "../app";

export async function createTestSpecies() {
  const response = await request(app)
    .post("/species")
    .send({ name: "Test Species", description: "Test Species Description" });
  return response.body;
}

// Test clean up
export async function deleteTestSpecies(id: number) {
  await request(app).delete(`/species/${id}`);
}

export async function deleteTestBreed(id: number) {
  await request(app).delete(`/breeds/${id}`);
}
