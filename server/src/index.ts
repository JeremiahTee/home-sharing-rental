process.env.NODE_ENV !== "production" && require("dotenv").config();

import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database/index";
import { typeDefs, resolvers } from "./graphql";

async function mount(app: Application) {
  const db = await connectDatabase();

  app.set("trust proxy", 1);

  // app.use(cors({ credentials: true, origin: "http://localhost:9000/api" }));

  app.use(cookieParser(process.env.SECRET));

  // pass context so resolver has access to DB
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res })
  });

  await server.start();
  server.applyMiddleware({ app, path: "/api" });

  app.listen(process.env.PORT);

  console.log(`[app]: http://localhost:${process.env.PORT}`);
}

mount(express());
