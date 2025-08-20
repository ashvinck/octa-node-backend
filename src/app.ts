import express from 'express';
import type { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import createHttpError from 'http-errors';
import swaggerUi from 'swagger-ui-express';
import { getCorsOptions } from './utils/cors';
import morganWinstonLogger from './utils/morgan';
import rateLimit from 'express-rate-limit';
import logger from './utils/logger';
import swaggerSpec from './utils/swagger';
import { errorHandler } from './utils/error';
import publicRouter from './routes/portfolio.route';



export const app: Application = express();

export async function setupApp() {

  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
  app.use(helmet.xssFilter());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'trusted-cdn.com'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    })
  );

  // app.set('trust proxy', true);

  app.use(express.json({ limit: '16kb' }));
  app.use(express.urlencoded({ extended: true, limit: '16kb' }));

  const corsOptions = getCorsOptions(); //Now this is called after config is initialized
  app.use(cors(corsOptions));

  app.use(morganWinstonLogger);

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
      logger.warn(`Rate limit exceeded: ${req.ip}`);
      throw createHttpError(
        options.statusCode || 429,
        `Too many requests. Limit is ${options.limit} per ${
          options.windowMs / 60000
        } minutes.`
      );
    },
  });

  app.use(limiter);
  app.disable('x-powered-by');

  /// Swagger Docs:
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/', (req, res) => {
    res.status(200).send('🙋‍♂️ Hello! Welcome to Pheezee Backend!');
  });

  app.use('/', publicRouter);

  app.use((req, res, next) => {
    logger.warn(`404 Not Found: ${req.originalUrl}`);
    next(new createHttpError.NotFound('The requested resource was not found'));
  });

  app.use(errorHandler);
}
