import express, { Request, Response } from "express";
import { User } from "../model/user";

const router = express.Router();

router.get("/banking-sample/signup", async (req: Request, res: Response) => {
  const user = User.build({
    name: "Ani",
    email: "Ani@gmail.com",
    password: "Password",
    mobile: "0123456789",
    address: "hyderabad",
  });

  await user.save();
  res.status(201).send({ user });
});

export { router as userRouter };
