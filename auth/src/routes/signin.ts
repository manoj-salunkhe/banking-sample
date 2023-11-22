import express, { Request, Response } from "express";
import {
  ValidationError,
  body,
  Result,
  validationResult,
} from "express-validator";
import { User } from "../model/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/banking-sample/signin",
  [
    body("email").notEmpty().isEmail().withMessage("Must be valid email"),
    body("password")
      .notEmpty()
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors });
    }

    const { email, password } = req.body;

    const existingUser: any = await User.findOne({ email });

    if (!existingUser) {
      throw new Error("Invalid Credentials");
    }

    const passwordMatched = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatched) {
      throw new Error("Invalid Credentials");
    }

    // GENERATE JWT

    const userJwt = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET!
    );

    // STORE IT ON SESSION OBJECT
    req.session = { jwt: userJwt };

    res.status(200).send({
      email: existingUser.email,
      name: existingUser.name,
      mobile: existingUser.mobile,
    });
  }
);

export { router as signinRouter };
