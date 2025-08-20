import cors from 'cors';
import { getConfig } from '../config/config';


export function getCorsOptions(): cors.CorsOptions {
  const config = getConfig();

  if (!config.corsOrigin) {
    throw new Error('Cors Origin is missing from the secrets.');
  }

  const allowedOrigins = config.corsOrigin;

  return {
    origin: (
      origin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void
    ) => {
      if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true,
    optionsSuccessStatus: 200,
  };
}
