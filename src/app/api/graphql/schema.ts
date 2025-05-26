// This could be in a separate file like 'graphql/schema.ts' or directly in your API route.
export const typeDefs = /* GraphQL */ `
  scalar DateTime # We'll use a generic string for now, or define a custom scalar later
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    images: [String!]! # Assuming image URLs
    stock: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    allProducts: [Product!]!
    productById(id: ID!): Product
  }

  # We'll add Mutations later (e.g., for creating products)
  # type Mutation {
  #   createProduct(name: String!, description: String, price: Float!, stock: Int!): Product
  # }
`;
