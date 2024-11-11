import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    // Skip token verification if req.body or req.body.query is undefined
    if (req.body?.query && (req.body.query.includes('getUserToken') || req.body.query.includes('createUser'))) {
      return next();
    }

    const token = req.headers['authorization']?.split(' ')[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecretKey');
        (req as any).user = decoded;
      } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      return res.status(401).json({ message: 'No token provided' });
    }

    next();
  }
}
