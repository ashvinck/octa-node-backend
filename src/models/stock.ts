import mongoose, { Schema } from "mongoose";

const StockSchema = new Schema({
  sectorId: { type: Schema.Types.ObjectId, ref: "Sector", required: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true, unique: true }, 
  exchange: { type: String, enum: ["NSE", "BSE"], required: true },
  peRatio: { type: Number },
  latestEarnings: { type: String },
});

export const Stock = mongoose.model("Stock", StockSchema);
