import type { ErrorRequestHandler } from 'express';
import logger from './logger';

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  logger.error(`Error: ${err.status || 500} - ${err.message}`);
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Internal Server Error',
  });
};
