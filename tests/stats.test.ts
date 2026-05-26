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

  })

  // POST stat

  // GET stat

  // PATCH stat - edit fields

  // DELETE stat

  afterAll(async () => {
    await deleteTestSpecies(speciesId);
  })

});
