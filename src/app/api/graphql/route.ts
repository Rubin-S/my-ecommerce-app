// app/api/graphql/route.ts
import { createYoga, createSchema } from "graphql-yoga";
import { typeDefs } from "./schema"; // Assuming you put typeDefs in 'app/api/graphql/schema.ts'
import { resolvers, GraphQLContext } from "./resolvers"; // Assuming you put resolvers in 'app/api/graphql/resolvers.ts'
import prisma from "@/lib/prisma"; // Your Prisma client instance

// If you defined typeDefs and resolvers in this file, you don't need the imports above for them.
// Example:
// const typeDefs = /* GraphQL */ ` ... `;
// const resolvers = { ... };

const yoga = createYoga<GraphQLContext>({
  // Pass the context type here
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  // We'll pass the prisma instance into the context for the resolvers to use
  context: async () => ({
    prisma,
  }),
  //maskedErrors: process.env.NODE_ENV === 'production', // Good practice for production
  graphqlEndpoint: "/api/graphql", // Inform Yoga about the endpoint path (optional for App Router)

  // Enable GraphiQL an in-browser IDE for Eeasily Ntesting your API
  graphiql: {
    // Optionally, add default queries or headers here
    // defaultQuery: "query { allProducts { id name } }"
  },
});

// Note: You need to export GET and POST handlers that use the yoga instance
export { yoga as GET, yoga as POST };
