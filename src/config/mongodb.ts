import mongoose from 'mongoose';
import { getConfig } from './config';
import logger from '../utils/logger';

export async function connectToMongoDB(): Promise<void> {
  try {
    const config = getConfig();

    if (!config.mongoURI) {
      throw new Error('MongoDB URI is missing in environment variables.');
    }

    await mongoose.connect(config.mongoURI);

    logger.info('💾 Connected to MongoDB!');
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`MongoDB Connection Error: ${error.message}`);
    } else {
      logger.error('MongoDB Connection Error: Unknown error');
    }
    throw new Error('Error connecting to MongoDB');
  }
}
