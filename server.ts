// Import app and logger
import app from "./app";
import logger from "./lib/logger";

const port = 3001;

// Starts the server and listens for incoming requests.
app.listen(port, () => {
  logger.info({ port }, "Creature feature app listening on");
});
