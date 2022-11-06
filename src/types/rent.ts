import {Field, ID, InputType, ObjectType} from "type-graphql";
import { Book } from './book';
import { Reader } from "./reader";

@ObjectType()
@InputType("RentInput")
export class Rent {
  @Field(type => ID)
  id?: string;

  @Field({ nullable: true })
  book?: Book;

  @Field(type => Reader, { nullable: true })
  reader?: Reader;

  @Field({ nullable: true })
  rentTime?: number;

  @Field({ nullable: true })
  dailyPenalty?: number;

  @Field({ nullable: true })
  rentPeriod?: number;
}
