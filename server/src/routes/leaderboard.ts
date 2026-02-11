/**
 * Leaderboard API routes
 * GET /api/leaderboard/:event
 */

import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import type { LeaderboardEvent } from '../types/leaderboard.js';
import { getCachedData } from '../services/pollingService.js';
import { createApiError } from '../middleware/errorHandler.js';

export const leaderboardRouter = Router();

/**
 * GET /api/leaderboard/:event
 * Returns cached leaderboard data for the specified event
 */
leaderboardRouter.get(
  '/:event',
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { event } = req.params;

      // Validate event parameter
      if (event !== 'derbyDays' && event !== 'callathon') {
        throw createApiError(
          `Invalid event: ${event}. Must be 'derbyDays' or 'callathon'`,
          400
        );
      }

      const eventType = event as LeaderboardEvent;

      // Get cached data
      const data = getCachedData(eventType);

      // Set cache control header to prevent caching
      res.setHeader('Cache-Control', 'no-store');

      // Return response
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);
