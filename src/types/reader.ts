import {Field, ID, ObjectType} from "type-graphql";
import { Rent } from "./rent";
import { Author } from "./author";

@ObjectType()
export class Reader {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(type => [Rent])
  rents: Rent[];

  @Field(type => Author)
  author: Author;

  @Field()
  penaltySummary: number;
}
