import logger from "../utils/logger";

type Config = {
  mongoURI: string;
  port: number;
  corsOrigin: string[];
};

let config: Config;

export async function initializeConfig(): Promise<void> {
  try {

    config = {
      port: parseInt(process.env.PORT || '4005', 10),
      mongoURI:
        process.env.NODE_ENV === 'production'
          ? process.env.MONGO_URI_PROD || ''
          : process.env.NODE_ENV === 'staging'
          ? process.env.MONGO_URI_STAGING || '' 
          : process.env.MONGO_URI_DEV || '',
      corsOrigin: process.env.CORS_ORIGIN?.split(',') || ['*'],
    };

    logger.info('Config', config);

    logger.info('Config initialized successfully');
  } catch (error) {
    console.error('Error during config initialization:', error);
    throw error;
  }
}

export function getConfig(): Config {
  if (!config) {
    throw new Error('Config not initialized. Call initializeConfig() first.');
  }
  return config;
}
