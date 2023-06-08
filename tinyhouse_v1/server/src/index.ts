process.env.NODE_ENV !== "production" && require("dotenv").config();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database/index";
import { typeDefs, resolvers } from "./graphql";

async function mount(app: Application) {
  const db = await connectDatabase();

  // pass context so resolver has access to DB
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db })
  });
  await server.start();
  server.applyMiddleware({ app, path: "/api" });

  app.listen(process.env.PORT);

  console.log(`[app]: http://localhost:${process.env.PORT}`);

  const listings = await db.listings.find({}).toArray();
  console.log(listings);
}

mount(express());
