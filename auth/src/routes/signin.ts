import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../model/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest } from "../../../common/src";

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
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      const existingUser: any = await User.findOne({ email });

      if (!existingUser) {
        throw new BadRequestError("Invalid Credentials");
      }

      const passwordMatched = await Password.compare(
        existingUser.password,
        password
      );

      if (!passwordMatched) {
        throw new BadRequestError("Invalid Credentials");
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
    } catch (err) {
      next(err);
    }
  }
);

export { router as signinRouter };
