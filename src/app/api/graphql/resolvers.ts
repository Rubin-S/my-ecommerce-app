// This could be in a separate file like 'graphql/resolvers.ts' or directly in your API route.
import prisma from "@/lib/prisma"; // Your Prisma client instance
import { PrismaClient } from "@prisma/client"; // Only for type annotation if needed

// Define a type for your context to get autocompletion for prisma
export interface GraphQLContext {
  prisma: PrismaClient;
}

export const resolvers = {
  Query: {
    allProducts: async (
      _parent: unknown,
      _args: unknown,
      context: GraphQLContext
    ) => {
      return context.prisma.product.findMany();
    },
    productById: async (
      _parent: unknown,
      args: { id: string },
      context: GraphQLContext
    ) => {
      return context.prisma.product.findUnique({
        where: { id: args.id },
      });
    },
  },
  // Example: If you want to ensure specific date formatting for Product fields
  Product: {
    createdAt: (parent: { createdAt: Date }) => parent.createdAt.toISOString(),
    updatedAt: (parent: { updatedAt: Date }) => parent.updatedAt.toISOString(),
  },
  // Mutations will go here later
  // Mutation: {
  //   createProduct: async (_parent, args, context: GraphQLContext) => {
  //     return context.prisma.product.create({
  //       data: {
  //         name: args.name,
  //         description: args.description,
  //         price: args.price,
  //         stock: args.stock,
  //         images: [], // Default to empty array or handle image uploads separately
  //       },
  //     });
  //   },
  // },
};
