import express, { Request, Response } from "express";
import { requireAuth } from "../../../common/build";

const router = express.Router();

router.post(
  "/banking-sample/create",
  requireAuth,
  async (req: Request, res: Response) => {
    res.send({ message: "hello" });
  }
);

export { router as createRouter };
