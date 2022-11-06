import {Field, ID, InputType, ObjectType} from "type-graphql";
import { Rent } from "./rent";
import { Author } from "./author";

@ObjectType()
@InputType("ReaderInput")
export class Reader {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(type => [Rent])
  rents?: Rent[];

  @Field()
  penaltySummary: number;
}
