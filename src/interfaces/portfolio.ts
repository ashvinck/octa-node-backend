import { Document, Types } from "mongoose";

interface Stock {
  _id: Types.ObjectId;
  name: string;
  exchange: string;
  peRatio?: number;
  latestEarnings?: number;
  sectorId: {
    _id: Types.ObjectId;
    name: string;
  };
}

interface Holding {
  stockId: Stock;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPct: number;
  cmp: number;
  presentValue: number;
  gainLoss: number;
}

export interface PortfolioDoc extends Document {
  stocks: Holding[];
}
