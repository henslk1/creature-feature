import request from "supertest";
import app from "../app";

export async function createTestSpecies() {
  const response = await request(app)
    .post("/species")
    .send({ name: "Test Species" });
  return response.body;
}

export async function createTestBreed(speciesId: number) {
  const response = await request(app)
    .post("/breeds")
    .send({ name: "Test Breed", speciesId });
  return response.body;
}

export async function createTestAnimal(breedId: number) {
  const response = await request(app)
    .post("/animals")
    .send({ name: "Test animal", breedId });
  return response.body;
}

// Test clean up
export async function deleteTestSpecies(id: number) {
  await request(app).delete(`/species/${id}`);
}

export async function deleteTestBreed(id: number) {
  await request(app).delete(`/breeds/${id}`);
}
