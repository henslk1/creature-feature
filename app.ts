import logger from "./lib/logger";
import express from "express";
import PinoHttp from "pino-http";
import cors from "cors";
// Import the routes
import speciesRoutes from "./routes/species";
import breedRoutes from "./routes/breeds";
import animalRoutes from "./routes/animals";
import geneRoutes from "./routes/genes";
import statRoutes from "./routes/stats";
import attributeRoutes from "./routes/attributes";

// Creates the Express app
const app = express();

// Requests from this URL is allowed - for React
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
// Parses incoming requests
app.use(express.json());

// Logs request information
app.use(PinoHttp({ 
  logger,
  autoLogging: process.env.NODE_ENV === "production"
}));

app.use("/species", speciesRoutes);
app.use("/breeds", breedRoutes);
app.use("/animals", animalRoutes);
app.use("/species/:speciesId/genes", geneRoutes);
app.use("/species/:speciesId/stats", statRoutes);
app.use("/species/:speciesId/attributes", attributeRoutes);

export default app;