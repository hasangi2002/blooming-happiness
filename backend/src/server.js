import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { logger } from './utils/logger.js';
import app from './app.js';

let server;

const startServer = async () => {
  await connectDB();

  server = app.listen(env.port, () => {
    logger.info(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
  });
};

startServer();

process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server?.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server?.close(() => logger.info('Process terminated.'));
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  server?.close(() => logger.info('Process terminated.'));
});
