import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Author} from "../types";
import { AuthorModel } from "../database/AuthorModel";

@Resolver(Author)
export class AuthorResolver {
  @Query(type => [Author])
  async getAuthor(@Arg("id") id: string) {
    return await AuthorModel.findById(id)
  }

  @Query(type => [Author])
  async authors() {
    return await AuthorModel.find({})
  }

  @Mutation(type => Author)
  async createAuthor(@Arg("author") author: Author) {
    await AuthorModel.create(author);
    return author;
  }

  @Mutation(type => Author)
  async updateAuthor(@Arg("author") author: Author, @Arg("id") id: string) {
    return await AuthorModel.findByIdAndUpdate(id, author);
  }

  @Mutation(type => Author)
  async deleteAuthor(@Arg("id") id: string) {
    return await AuthorModel.findByIdAndDelete(id);
  }
}
