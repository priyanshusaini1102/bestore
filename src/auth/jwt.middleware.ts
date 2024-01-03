// auth/jwt.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        req.user = decoded; // Attach the user object to the request for downstream use
        console.log(decoded);
      } catch (error) {
        // Token is invalid
        console.error('JWT verification failed:', error.message);
      }
    }

    next();
  }
}
