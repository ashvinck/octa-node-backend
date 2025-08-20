import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger"
import { getPortfolioBySectors } from "../services/portfolio.service";


export async function getPortfolio(req: Request, res: Response, next: NextFunction) {
  try {
    const sectors = await getPortfolioBySectors();

    if (!sectors) {
      return res.status(404).json({ error: "No portfolio found" });
    }

    res.json(sectors);
  } catch (err) {
    logger.error('Error in getting portfolio data', err);
    next(err)
  }
};
