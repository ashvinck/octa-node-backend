import { Server } from 'http';
import mongoose from 'mongoose';
import { app, setupApp } from './app';
import { initializeConfig } from './config/config';
import { connectToMongoDB } from './config/mongodb';
import logger from './utils/logger';

let server: Server;

export async function startServer() {
  try {
    await initializeConfig(); /// env files congifure files
    await setupApp();
    await connectToMongoDB();

    server = app.listen(process.env.PORT, () => {
      logger.info(`🚀 Server started on port ${process.env.PORT}`);
    });

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
}

async function shutdown() {
  logger.info('🔴 Shutting down server...');
  if (server) {
    server.close(() => logger.info('HTTP server closed.'));
  }
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected successfully.');
  } catch (error) {
    logger.error('Error disconnecting MongoDB:', error);
  }
  process.exit(0);
}
