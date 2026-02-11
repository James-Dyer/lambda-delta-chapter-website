/**
 * Health check endpoint
 * GET /health
 */

import { Router } from 'express';
import type { Request, Response } from 'express';
import { getPollingStatus } from '../services/pollingService.js';

export const healthRouter = Router();

/**
 * GET /health
 * Returns health status of the server and polling service
 */
healthRouter.get('/', (req: Request, res: Response) => {
  const pollingStatus = getPollingStatus();

  const isHealthy =
    pollingStatus.callathon.status === 'ok' &&
    pollingStatus.derbyDays.status === 'ok';

  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    leaderboards: pollingStatus,
  });
});
