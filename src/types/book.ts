import {Field, ID, InputType, ObjectType} from "type-graphql";
import { Author } from "./author";

@ObjectType()
@InputType("BookInput")
export class Book {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  rentPeriod: number;

  @Field()
  link: string;

  @Field(type => Author)
  author: Author
}
