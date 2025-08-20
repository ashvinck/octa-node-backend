import "../models/stock";
import "../models/sector"
import { Portfolio } from "../models/portfolio";
import { PortfolioDoc } from "../interfaces/portfolio";

export async function getPortfolioBySectors() {
  const rawPortfolio = await Portfolio.findOne()
    .populate({
      path: "stocks.stockId",
      populate: { path: "sectorId" },
    }) as PortfolioDoc | null;

  if (!rawPortfolio) return null;

  const portfolio = rawPortfolio.toObject(); 

  const sectors: any[] = [];

  for (const holding of portfolio.stocks) {
    const stock = holding.stockId;
    const sectorName = stock.sectorId.name;

    let sector = sectors.find((s) => s.name === sectorName);
    if (!sector) {
      sector = {
        name: sectorName,
        summary: { investment: 0, presentValue: 0, gainLoss: 0 },
        stocks: [],
      };
      sectors.push(sector);
    }

    const stockData = {
      name: stock.name,
      purchasePrice: holding.purchasePrice,
      quantity: holding.quantity,
      investment: holding.investment,
      portfolioPct: holding.portfolioPct,
      exchange: stock.exchange,
      cmp: holding.cmp,
      presentValue: holding.presentValue,
      gainLoss: holding.gainLoss,
      peRatio: stock.peRatio,
      latestEarnings: stock.latestEarnings,
      symbol:stock.symbol
    };

    sector.stocks.push(stockData);

    sector.summary.investment += holding.investment || 0;
    sector.summary.presentValue += holding.presentValue || 0;
    sector.summary.gainLoss += holding.gainLoss || 0;
  }

  return sectors;
}
