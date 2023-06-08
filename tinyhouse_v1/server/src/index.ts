import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";

async function mount(app: Application) {
  const port = 9000;
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: "/api" });

  app.listen(port);

  console.log(`[app]: http://localhost:${port}`);
}

mount(express());
