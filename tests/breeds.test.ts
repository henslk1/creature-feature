import request from "supertest";
import app from "../app";
import { createTestSpecies } from "./helpers";
import { createTestBreed } from "./helpers";

describe ("Breed routes", () => {

  // ID's for objects created during testing.
  let speciesId: number;
  let breedId: number;

  // Objects to be used in testing
  beforeAll( async () => {
    const species = await createTestSpecies();
    speciesId = species.id;
    const breed = await createTestBreed(speciesId);
    breedId = breed.id;
  })
})