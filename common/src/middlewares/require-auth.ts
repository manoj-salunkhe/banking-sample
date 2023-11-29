import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authrized-error";
import cookieSession from "cookie-session";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
  
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
