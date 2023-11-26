import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import dotenv from "dotenv";
import { User } from "../model/user";
import { validateRequest, BadRequestError } from "../../../common/src";

dotenv.config();

const router = express.Router();

router.post(
  "/banking-sample/signup",
  [
    body("name").notEmpty().withMessage("Must be valid name"),
    body("email").isEmail().withMessage("Must be valid email"),
    body("password")
      .notEmpty()
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("mobile")
      .isMobilePhone("en-IN")
      .withMessage("Must be a valid mobile number"),
    body("address")
      .notEmpty()
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Address must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, mobile, address } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new BadRequestError("Email already in use");
      }

      const user = User.build({
        name,
        email,
        password,
        mobile,
        address,
      });

      await user.save();
      res.status(201).send("user");
    } catch (err) {
      // this function will pass on the error to the error handler
      next(err);
    }
  }
);

export { router as signupRouter };
