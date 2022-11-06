import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Reader} from "../types";
import {ReaderModel} from "../database/ReaderModel";

@Resolver(Reader)
export class ReaderResolver {
  @Query(type => [Reader])
  async getReader(@Arg("id") id: string) {
    return await ReaderModel.findById(id)
  }

  @Query(type => [Reader])
  async readers() {
    return await ReaderModel.find({})
  }

  @Mutation(type => Reader)
  async createReader(@Arg("reader") reader: Reader) {
    await ReaderModel.create(reader);
    return reader;
  }

  @Mutation(type => Reader)
  async updateReader(@Arg("reader") reader: Reader, @Arg("id") id: string) {
    return await ReaderModel.findByIdAndUpdate(id, reader);
  }

  @Mutation(type => Reader)
  async deleteReader(@Arg("id") id: string) {
    return await ReaderModel.findByIdAndDelete(id);
  }
}
