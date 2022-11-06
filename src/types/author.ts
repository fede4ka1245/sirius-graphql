import {Field, ID, ObjectType, InputType} from "type-graphql";
import { Book } from './book';

@ObjectType()
@InputType("AuthorInput")
export class Author {
  @Field(type => ID)
  id: string;

  @Field(type => String)
  name?: string;

  @Field(type => Number)
  photoLink?: number;

  @Field(type => String)
  birthday?: string;

  @Field(type => String, { nullable: true })
  deathDate?: string;

  @Field(type => [Book])
  books?: Book[];

  @Field(type => Number)
  availableLibraryBooks?: number;
}
