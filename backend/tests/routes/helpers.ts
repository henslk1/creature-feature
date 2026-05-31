import request from "supertest";
import app from "../../app";

export async function createTestSpecies(name = "Test Species") {
  return await request(app)
    .post("/species")
    .send({ name });
}

export async function createTestBreed(speciesId: number, name = "Test Breed") {
  return await request(app)
    .post("/breeds")
    .send({ name, speciesId });
}

export async function createTestAnimal(breedId: number) {
  return await request(app)
    .post("/animals")
    .send({ name: "Test Animal", breedId });
}

export async function createTestGene(speciesId: number, name = "Test Gene") {
  return await request(app)
    .post(`/species/${speciesId}/genes`)
    .send({
      name,
      category: "Color",
      loci: [
        {
          name: "Test Locus",
          alleles: [
            { name: "Allele A", symbol: "A", dominance: "dominant", probability: 0.5 },
            { name: "Allele a", symbol: "a", dominance: "recessive", probability: 0.5 }
          ]
        }
      ],
      expressionRules: [
        { minDominantAlleles: 0, expression: "No Expression" },
        { minDominantAlleles: 1, expression: "Test Expression" },
        { minDominantAlleles: 2, expression: "Full Expression" }
      ]
    });
}

export async function createTestAttribute(speciesId: number, name = "Test Attribute") {
  return await request(app)
    .post(`/species/${speciesId}/attributes`)
    .send({ name, type: "string" });
}

export async function createTestStat(speciesId: number, name = "Test Stat") {
  return await request(app)
    .post(`/species/${speciesId}/stats`)
    .send({ name, min: 0.0, max: 100.0 });
}

// Test clean up
export async function deleteTestSpecies(id: number) {
  await request(app).delete(`/species/${id}`);
}

export async function deleteTestBreed(id: number) {
  await request(app).delete(`/breeds/${id}`);
}
