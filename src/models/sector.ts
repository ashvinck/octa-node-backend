import mongoose, { Schema } from "mongoose";

const SectorSchema = new Schema({
  name: { type: String, required: true }
});

export const Sector = mongoose.model("Sector", SectorSchema);
