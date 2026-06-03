import request from "supertest";
import app from "../../app";
import { createTestGene, createTestSpecies, deleteTestSpecies } from "./helpers";

describe("Gene routes", () => {

  // ID for object created during testing and base path definition
  let speciesId: number;
  let geneId: number;
  let geneCreateStatus: number;
  let basePath: string;
  let locusId: number;
  let alleleId: number;

  // Object to be used in testing
  beforeAll(async () => {
    const speciesResponse = await createTestSpecies();
    speciesId = speciesResponse.body.id;

    const geneResponse = await createTestGene(speciesId);
    geneId = geneResponse.body.id;
    geneCreateStatus = geneResponse.status;
    locusId = geneResponse.body.loci[0].id;
    alleleId = geneResponse.body.loci[0].alleles[0].id;

    basePath = `/species/${speciesId}/genes`;
  });

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
    expect(response.body.loci).toBeDefined();
    expect(response.body.expressionRules).toBeDefined();
  });

  it("should update loci and alleles in place", async () => {
    const response = await request(app)
      .patch(`${basePath}/${geneId}`)
      .send({
        loci: [
          {
            id: locusId,
            name: "Updated Locus",
            alleles: [
              { id: alleleId, name: "Allele A", symbol: "A", dominance: "dominant", probability: 0.5 },
              { name: "Allele B", symbol: "B", dominance: "recessive", probability: 0.5 }
            ]
          }
        ]
      });
    expect(response.status).toBe(200);
    expect(response.body.loci[0].id).toBe(locusId);
    expect(response.body.loci[0].name).toBe("Updated Locus");
    expect(response.body.loci[0].alleles).toHaveLength(2);
    expect(response.body.loci[0].alleles[0].id).toBe(alleleId);
  });

  it("should delete a gene", async () => {
    const response = await request(app).delete(`${basePath}/${geneId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(geneId);
  });

  afterAll(async () => {
    await deleteTestSpecies(speciesId);
  });

});
