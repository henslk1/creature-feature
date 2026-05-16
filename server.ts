// Import middleware
import logger from "./lib/logger";
import express from "express";
import PinoHttp from "pino-http";
import cors from "cors";
// Import the routes
import speciesRoutes from "./routes/species";
import breedRoutes from "./routes/breeds";
import animalRoutes from "./routes/animals";

// Creates the Express app
const app = express();

const port = 3001;

// Requests from this URL is allowed - for React
app.use(cors({ origin: "http://localhost:5173"}));
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


// Starts the server and listens for incoming requests.
app.listen(port, () => {
  logger.info({ port }, "Creature feature app listening on");
});
