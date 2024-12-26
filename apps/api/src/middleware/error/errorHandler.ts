import { Request, Response, NextFunction } from 'express';
import { AppError } from './types';
import { logger } from '../logger';

export const errorHandler = (
 err: Error | AppError,
 req: Request,
 res: Response,
 next: NextFunction
) => {
 if (err instanceof AppError) {
   logger.error(`${err.statusCode} - ${err.message}`);
   return res.status(err.statusCode).json({ error: err.message });
 }

 logger.error(err.stack);
 res.status(500).json({ error: 'Internal server error' });
};