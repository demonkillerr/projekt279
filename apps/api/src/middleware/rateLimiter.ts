// src/middleware/rateLimiter.ts
import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
 windowMs: 15 * 60 * 1000,
 max: 100
});

// src/middleware/validate.ts
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const uploadSchema = z.object({
 file: z.any(),
 userId: z.string(),
});

export const validateUpload = (req: Request, res: Response, next: NextFunction) => {
 try {
   uploadSchema.parse(req.body);
   next();
 } catch (error) {
   res.status(400).json({ error: 'Invalid request data' });
 }
};

// Update src/index.ts
import { limiter } from './middleware/rateLimiter';
import { validateUpload } from './middleware/validate';

app.use(limiter);
app.use('/api/upload', validateUpload);