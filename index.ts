import { ApolloServer } from 'apollo-server-express';
import {buildSchema} from "type-graphql";
import mongoose, {ConnectOptions} from 'mongoose';
import express from 'express';
import "reflect-metadata";
import { AuthorResolver } from "./src/resolvers/AuthorResolver";
import {ReaderResolver} from "./src/resolvers/ReaderResolver";
import {RentResolver} from "./src/resolvers/RentResolver";
import {BookResolver} from "./src/resolvers/BookResolver";
import * as dotenv from 'dotenv';

dotenv.config();

const port = 5000 || Number(process.env.PORT);

const main = async () => {
  await mongoose.connect(process.env.DATABASE_URI, { useUnifiedTopology: true, useNewUrlParser: true } as ConnectOptions);
  const app = express();

  const schema = await buildSchema({
    resolvers: [AuthorResolver, ReaderResolver, RentResolver, BookResolver],
  });

  const server = new ApolloServer({
    schema
  });

  await server.start()

  server.applyMiddleware({ app });

  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
}

main();

