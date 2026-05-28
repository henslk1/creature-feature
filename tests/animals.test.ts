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

  // Object to be used in testing

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
 