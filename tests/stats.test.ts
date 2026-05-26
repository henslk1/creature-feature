import request from "supertest";
import app from "../app";
import { createTestStat, createTestSpecies, deleteTestSpecies } from "./helpers";

describe("Stat routes", () => {

  // ID for object created during testing and path definition
  let speciesId: number;
  let statId: number;
  let statCreateStatus: number;
  let basePath: string;

  // Object to be used in testing
  beforeAll(async () => {
    const speciesResponse = await createTestSpecies();
    speciesId = speciesResponse.body.id;

    const statResponse = await createTestStat(speciesId);
    statId = statResponse.body.id;
    statCreateStatus = statResponse.status;

    basePath = `/species/${speciesId}/stats`;
  })

  // POST stat

  // GET stat

  // PATCH stat - edit fields

  // DELETE stat

  afterAll(async () => {
    await deleteTestSpecies(speciesId);
  })

});
