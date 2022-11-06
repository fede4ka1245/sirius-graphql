import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReaderSchema = new Schema({
  name: String,
  email: String,
  rents: [{ type: Schema.Types.ObjectId, ref: 'Rent' }],
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  penaltySummary: Number
});

export const ReaderModel = mongoose.model("Reader", ReaderSchema);
