import request from "supertest";
import app from "../app";

export async function createTestSpecies() {
  return await request(app)
    .post("/species")
    .send({ name: "Test Species" });
}

export async function createTestBreed(speciesId: number) {
  return await request(app)
    .post("/breeds")
    .send({ name: "Test Breed", speciesId });
}

export async function createTestAnimal(breedId: number) {
  return await request(app)
    .post("/animals")
    .send({ name: "Test animal", breedId });
}

// Test clean up
export async function deleteTestSpecies(id: number) {
  await request(app).delete(`/species/${id}`);
}

export async function deleteTestBreed(id: number) {
  await request(app).delete(`/breeds/${id}`);
}
