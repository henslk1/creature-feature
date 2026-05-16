// Import middleware
import { PrismaClient } from "@prisma/client";
import express from "express";
import pino from "pino";
import PinoHttp from "pino-http";
import cors from "cors";
// Import the routes
import speciesRoutes from "./routes/species";
import breedRoutes from "./routes/breeds";
import animalRoutes from "./routes/animals"

// Creates logger instance
const logger = pino();

// Creates the Express app
const app = express();

// Requests from this URL is allowed - for React
app.use(cors({ origin: "http://localhost:5173"}));
// Parses incoming requests
app.use(express.json());

// Logs request information
app.use(PinoHttp({ 
  logger,
  autoLogging: process.env.NODE_ENV === "production"
}));

const port = 3001;

// Creates the Prisma client instance - queries the database.
const prisma = new PrismaClient();

app.use("/species", speciesRoutes);
app.use("/breeds", breedRoutes);
app.use("animals", animalRoutes);