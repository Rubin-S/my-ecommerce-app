// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Declare a global variable to hold the PrismaClient instance.
// This is to prevent creating multiple instances of PrismaClient in development
// due to Next.js hot reloading.
declare global {
  // eslint-disable-next-line no-unused-vars, no-var
  var prisma: PrismaClient | undefined;
}

// Initialize PrismaClient. If 'global.prisma' is already defined (in development),
// use it; otherwise, create a new instance.
export const prisma =
  global.prisma ||
  new PrismaClient({
    // You can add logging options here if needed for debugging, e.g.:
    // log: ['query', 'info', 'warn', 'error'],
  });

// In development, assign the new instance to the global variable.
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
