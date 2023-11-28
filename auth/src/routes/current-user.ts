import express, { Request, Response } from "express";

const router = express.Router();

router.get(
  "/banking-sample/current-user",
  async (req: Request, res: Response) => {
    // res.send({ currentUser: req?.currentUser || null });
  }
);
