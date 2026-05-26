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

export async function createTestGene(speciesId: number) {
  return await request(app)
    .post(`/species/${speciesId}/genes`)
    .send({
      name: "Test Gene",
      category: "Color",
      loci: [
        {
          name: "Test Locus",
          alleles: [
            { name: "Allele A", symbol: "A", dominance: "dominant", probability: 0.5 },
            { name: "Allele a", symbol: "a", dominance: "recessive", probability: 0.5}
          ]
        }
      ],
      expressionRules: [
        { minDominantAlleles: 1, expression: "Test Expression" }
      ]
    });
}

export async function createTestStat(speciesId: number) {
  return await request(app)
    .post(`/species/${speciesId}/stats`)
    .send({ name: "Test Stat", min: 0.0, max: 100.0 });
}

// Test clean up
export async function deleteTestSpecies(id: number) {
  await request(app).delete(`/species/${id}`);
}

export async function deleteTestBreed(id: number) {
  await request(app).delete(`/breeds/${id}`);
}
