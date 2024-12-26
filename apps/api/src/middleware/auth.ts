// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { getAuth } from '@clerk/backend';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.headers.authorization?.split(' ')[1];
   if (!token) return res.status(401).json({ error: 'No token provided' });

   const auth = getAuth();
   const session = await auth.verifyToken(token);
   req.user = session;
   next();
 } catch (error) {
   res.status(401).json({ error: 'Invalid token' });
 }
};

// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
 console.error(err.stack);
 res.status(500).json({ error: 'Something broke!' });
};

// Update src/index.ts
import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';

app.use('/api/*', authMiddleware);
app.use(errorHandler);