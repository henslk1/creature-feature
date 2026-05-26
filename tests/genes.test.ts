import request from "supertest";
import app from "../app";
import { createTestGene, createTestSpecies, deleteTestSpecies } from "./helpers";

describe("Gene routes", () => {

  // ID for object created during testing and base path definition
  let speciesId: number;
  let geneId: number;
  let geneCreateStatus: number;
  let basePath: string;

  // Object to be used in testing
  beforeAll(async () => {
    const speciesResponse = await createTestSpecies();
    speciesId = speciesResponse.body.id;

    const geneResponse = await createTestGene(speciesId);
    geneId = geneResponse.body.id;
    geneCreateStatus = geneResponse.status;

    basePath = `/species/${speciesId}/genes`;
  })

  it("should create a new gene", async () => {
    expect(geneCreateStatus).toBe(201);
    expect(geneId).toBeDefined();
    expect(typeof geneId).toBe("number");
  });

  it("should return a specific gene", async () => {
    const response = await request(app).get(`${basePath}/${geneId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Test Gene");
  });

  it("should update gene-level fields", async () => {
    const response = await request(app)
      .patch(`${basePath}/${geneId}`)
      .send({ name: "Updated Gene" });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Gene");
  });

  it("should replace all gene data", async () => {
    const response = await request(app)
      .put(`${basePath}/${geneId}`)
      .send({
        name: "New Gene",
        category: "Conformation",
        loci: [
          {
            name: "New Locus",
            alleles: [
              { name: "New Allele C", symbol: "C", dominance: "recessive", probability: 0.6 },
              { name: "New Allele D", symbol: "D", dominance: "dominant", probability: 0.4 }
            ]
          }
        ],
        expressionRules: [
          { minDominantAlleles: 0, expression: "New Expression" }
        ]
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("New Gene");
    expect(response.body.loci[0].name).toBe("New Locus");  
  });

  it("should delete a gene", async () => {
    const response = await request(app).delete(`${basePath}/${geneId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(geneId);
  });

  afterAll(async () => {
    await deleteTestSpecies(speciesId);
  })

});
