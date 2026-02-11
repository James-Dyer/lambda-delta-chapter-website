/**
 * Express server entry point
 * Initializes the server with middleware, routes, and polling service
 */

import express from 'express';
import type { Express } from 'express';
import { appConfig } from './config/environment.js';
import { corsMiddleware } from './middleware/cors.js';
import { errorHandler } from './middleware/errorHandler.js';
import { leaderboardRouter } from './routes/leaderboard.js';
import { healthRouter } from './routes/health.js';
import {
  startPollingService,
  stopPollingService,
} from './services/pollingService.js';

/**
 * Creates and configures the Express application
 */
function createApp(): Express {
  const app = express();

  // Middleware
  app.use(corsMiddleware);
  app.use(express.json());

  // Routes
  app.use('/health', healthRouter);
  app.use('/api/leaderboard', leaderboardRouter);

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({
      message: 'Lambda Delta Leaderboard API',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        leaderboard: '/api/leaderboard/:event (derbyDays | callathon)',
      },
    });
  });

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}

/**
 * Starts the server
 */
function startServer(): void {
  const app = createApp();

  // Start polling service
  startPollingService();

  // Start HTTP server
  const server = app.listen(appConfig.port, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║  Lambda Delta Leaderboard Server                          ║
╠════════════════════════════════════════════════════════════╣
║  Status: Running                                           ║
║  Port: ${appConfig.port}                                            ║
║  Environment: ${process.env.NODE_ENV || 'development'}                              ║
╠════════════════════════════════════════════════════════════╣
║  Endpoints:                                                ║
║    GET /health                                             ║
║    GET /api/leaderboard/derbyDays                          ║
║    GET /api/leaderboard/callathon                          ║
╚════════════════════════════════════════════════════════════╝
    `);
  });

  // Graceful shutdown
  const shutdown = () => {
    console.log('\nShutting down gracefully...');
    stopPollingService();
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

// Start the server if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}

export { createApp };
