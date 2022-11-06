import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Book, Reader, Rent} from "../types";
import { RentModel } from "../database/RentModel";
import {BookModel} from "../database/BookModel";
import {ReaderModel} from "../database/ReaderModel";

@Resolver(Rent)
export class RentResolver {
  @Query(type => [Rent])
  async getRent(@Arg("id") id: string) {
    return await RentModel.findById(id)
  }

  @Query(type => [Rent])
  async rents(@Arg("readerId") id: string) {
    return await RentModel.find({})
  }

  @Mutation(type => Rent)
  async createRent(@Arg("book") rent: Rent) {
    await RentModel.create(rent);
    return rent;
  }

  @Mutation(type => Rent)
  async updateRent(@Arg("rent") rent: Rent, @Arg("id") id: string) {
    return await RentModel.findByIdAndUpdate(id, rent);
  }

  @Mutation(type => Rent)
  async deleteBook(@Arg("id") id: string) {
    return await RentModel.findByIdAndDelete(id);
  }

  @Mutation(type => Rent)
  async rentBook(@Arg("bookId") bookId: string, @Arg("readerId") readerId: string) {
    const book: Book = await BookModel.findById(bookId);
    const reader: Reader = await ReaderModel.findById(readerId);

    const rent: Rent = {
      book,
      reader,
      rentTime: book?.rentPeriod || 0,
      rentPeriod: book?.rentPeriod || 0,
      dailyPenalty: 300,
    }

    await ReaderModel.findByIdAndUpdate(readerId, reader);

    return await RentModel.create(rent);
  }

  @Mutation(type => Rent)
  async returnBook(@Arg("bookId") bookId: string, @Arg("readerId") readerId: string) {
    const book: Book = await BookModel.findById(bookId);
    const reader: Reader = await ReaderModel.findById(bookId);
    const rent: Rent = await RentModel.findOneAndDelete({ reader: { id: readerId }, book: { id: book } })

    await ReaderModel.findByIdAndUpdate(readerId, {
      rents: reader.rents.filter((rent) => rent.reader.id !== readerId),
      ...reader
    });

    if (rent?.rentTime < 0) {
      await ReaderModel.findByIdAndUpdate(readerId, { ...reader, penaltySummary: reader.penaltySummary + Math.abs(rent?.rentTime) * rent.dailyPenalty });
    }

    return rent;
  }
}
