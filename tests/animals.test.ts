import request from "supertest";
import app from "../app";
import { 
  createTestAnimal,
  createTestBreed,
  createTestAttribute,
  createTestGene,
  createTestSpecies,
  createTestStat,
  deleteTestSpecies
 } from "./helpers";

 describe("Animal routes", () => {

  // ID for object created during testing and base path definition
  let speciesId: number;
  let breedId: number;
  let animalId: number;
  let animalCreateStatus: number;

  // Object to be used in testing
  beforeAll( async () => {
    const speciesResponse = await createTestSpecies();
    speciesId = speciesResponse.body.id;

    const breedResponse = await createTestBreed(speciesId);
    breedId = breedResponse.body.id

    await createTestGene(speciesId);
    await createTestStat(speciesId);
    await createTestAttribute(speciesId);

    const animalResponse = await createTestAnimal(breedId);
    animalId = animalResponse.body.id;
    animalCreateStatus = animalResponse.status;
  })

  // Create a new animal

  // Return all animals
  
  // Return specific animal
  
  // PATCH specific animal

  // DELETE specific animal

  // Clean up
  afterAll(async () => {
    await deleteTestSpecies(speciesId);
  })

 });
