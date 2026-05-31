// Import app and logger
import app from "./app";
import logger from "./lib/logger";
import prisma from "./lib/prisma";

const port = 3001;

// Starts the server and listens for incoming requests.
app.listen(port, () => {
  logger.info({ port }, "Creature feature app listening on");
});

const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
