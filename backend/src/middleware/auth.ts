import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

export interface AuthRequest extends Request {
  user?: any;
}

export const auth = (req: AuthRequest, _: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next();
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (err) {
    next();
  }
};

export const checkAuth = (req: AuthRequest) => {
  if (!req.user) {
    throw new AuthenticationError('Not authenticated');
  }
  return req.user;
};

export const checkRole = (req: AuthRequest, roles: string[]) => {
  const user = checkAuth(req);
  if (!roles.includes(user.role)) {
    throw new AuthenticationError('Not authorized');
  }
  return user;
};
