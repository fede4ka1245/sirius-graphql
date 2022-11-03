import { ApolloServer } from 'apollo-server-express';
import {Resolver, Query, Mutation, Arg, buildSchema} from "type-graphql";
import mongoose, {ConnectOptions} from 'mongoose';
import express from 'express';
import "reflect-metadata";
import { Author } from "./src/types";

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: String,
  photoLink: Number,
  birthday: String,
  deathDate: String,
  books: [String],
  availableLibraryBooks: Number,
});
const AuthorModel = mongoose.model("Author", AuthorSchema);

@Resolver(Author)
class AuthorResolver {
  @Query(type => [Author])
  async getAuthor(@Arg("id") id: string) {
    return await AuthorModel.findById(id)
  }

  @Query(type => [Author])
  async getAllAuthors() {
    console.log(await AuthorModel.find());
    return await AuthorModel.find({})
  }

  @Mutation(type => Author)
  async createAuthor(@Arg("author") author: Author) {
    console.log(author);
    await AuthorModel.create(author);
    console.log(await AuthorModel.find({}));
    return author;
  }

  @Mutation(type => Author)
  async updateAuthor(@Arg("author") author: Author) {
    return await AuthorModel.findByIdAndUpdate(author.id, { author });
  }

  @Mutation(type => Author)
  async deleteAuthor(@Arg("author") author: Author) {
    return await AuthorModel.findByIdAndDelete(author.id);
  }
}

mongoose.connect("mongodb://localhost:27017/admin", { useUnifiedTopology: true, useNewUrlParser: true } as ConnectOptions);

const main = async () => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [AuthorResolver],
  });

  const server = new ApolloServer({
    schema
  });

  await server.start()

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

main();

