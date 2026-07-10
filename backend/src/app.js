import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import { env, isProd } from './config/env.js';
import { accessLogStream } from './utils/logger.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

// Security headers
app.use(helmet());

// CORS — only allow requests from our frontend, with cookies
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

// HTTP request logging — verbose in dev, file-based in production
app.use(
  morgan(isProd ? 'combined' : 'dev', {
    stream: isProd ? accessLogStream : undefined,
  })
);

// Body parsing (size-limited to reduce payload-flood risk)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Response compression
app.use(compression());

// API routes
app.use('/api/v1', routes);

// 404 handler + centralized error handler — must be registered last
app.use(notFound);
app.use(errorHandler);

export default app;
