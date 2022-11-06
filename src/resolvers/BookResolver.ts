import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Book} from "../types";
import { BookModel } from "../database/BookModel";

@Resolver(Book)
export class BookResolver {
  @Query(type => [Book])
  async getBook(@Arg("id") id: string) {
    return await BookModel.findById(id)
  }

  @Query(type => [Book])
  async books() {
    return await BookModel.find({})
  }

  @Mutation(type => Book)
  async createBook(@Arg("book") book: Book) {
    await BookModel.create(book);
    return book;
  }

  @Mutation(type => Book)
  async updateBook(@Arg("book") book: Book, @Arg("id") id: string) {
    return await BookModel.findByIdAndUpdate(id, { book });
  }

  @Mutation(type => Book)
  async deleteBook(@Arg("id") id: string) {
    return await BookModel.findByIdAndDelete(id);
  }
}
