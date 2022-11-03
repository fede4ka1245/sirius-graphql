import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: String,
  photoLink: Number,
  birthday: String,
  deathDate: String,
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  availableLibraryBooks: Number,
});

export const AuthorModel = mongoose.model("Author", BookSchema);
