import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RentSchema = new Schema({
  name: String,
  rentPeriod: Number,
});

export const RentModel = mongoose.model("Rent", RentSchema);
