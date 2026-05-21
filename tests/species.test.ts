import request from "supertest";
import app from "../app";
import prisma from "../lib/prisma";

describe("Species routes", () => {

  // ID for object created during testing.
  let createdId: number;

  // Object to be used in testing
  beforeAll(async () => {
    const response = await request(app)
    .post("/species")
    .send({ name: "Gremlin", description: "Mythical creature" });
  createdId = response.body.id;
  });

  // Clean up after testing
  afterAll(async () => {
    await prisma.species.delete({ where: { id: createdId } });
  })

});