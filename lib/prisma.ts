import { PrismaClient } from "@prisma/client"

// Creates the Prisma client instance - queries the database.
const prisma = new PrismaClient();
export default prisma;
