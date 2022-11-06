import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: String,
  rentPeriod: Number,
  link: String,
  author: { type: Schema.Types.ObjectId, ref: 'Author' }
});

export const BookModel = mongoose.model("Book", BookSchema);
