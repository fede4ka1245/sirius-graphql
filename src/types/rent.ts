import {Field, ID, ObjectType} from "type-graphql";
import { Book } from './book';
import { Reader } from "./reader";
import { Author } from "./author";

@ObjectType()
export class Rent {
  @Field(type => ID)
  id: string;

  @Field()
  book: Book;

  @Field(type => Reader)
  reader: Reader;

  @Field()
  rentTime: number;

  @Field(type => Author)
  dailyPenalty: Author
}
