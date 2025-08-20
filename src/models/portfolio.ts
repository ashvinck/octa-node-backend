import mongoose, { Schema } from "mongoose";

const HoldingSchema = new Schema({
  stockId: { type: Schema.Types.ObjectId, ref: "Stock", required: true },
  purchasePrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  cmp: { type: Number },            
  investment: { type: Number },     
  presentValue: { type: Number },   
  gainLoss: { type: Number },       
  portfolioPct: { type: Number }   
});

const PortfolioSchema = new Schema({
  name: { type: String, required: true },
  // userId: { type: Schema.Types.ObjectId, ref: "User" },
  /// Since we are not using authentication, we are not relating it to user
  stocks: [HoldingSchema]
});

export const Portfolio = mongoose.model("Portfolio", PortfolioSchema);
