import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const validateCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req?.session?.jwt, JWT_SECRET!) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}
  next();
};
