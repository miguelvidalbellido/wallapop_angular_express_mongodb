import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserData {
  id: string;
  email: string;

}

declare global {
  namespace Express {
    interface Request {
      user?: UserData;
    }
  }
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const authHeaderValue = Array.isArray(authHeader) ? authHeader[0] : authHeader;

  if (!authHeaderValue.startsWith('Token ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeaderValue.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
        if (err) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = decoded;

    next();
  });
};

export default verifyJWT;

