/**
 * CORS middleware configuration
 * Allows requests from production and development origins
 */

import cors from 'cors';
import type { CorsOptions } from 'cors';
import { appConfig } from '../config/environment.js';

const allowedOrigins = [
  appConfig.clientOriginProd,
  appConfig.clientOriginDev,
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);
