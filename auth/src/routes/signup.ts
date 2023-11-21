import express, { Request, Response } from "express";
import { body, validationResult, Result, ValidationError } from "express-validator";
import dotenv from 'dotenv'
import { User } from "../model/user";

dotenv.config()

const router = express.Router();

router.post("/banking-sample/signup", [
  body('name').notEmpty().withMessage('Must be valid name'),
  body('email').isEmail().withMessage('Must be valid email'),
  body('password').notEmpty().trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20 characters"),
  body('mobile').isMobilePhone('en-IN').withMessage('Must be a valid mobile number'),
  body('address').notEmpty().trim().isLength({ min: 4, max: 20 }).withMessage("Address must be between 4 and 20 characters"),
], async (req: Request, res: Response) => {

  const errors: Result<ValidationError> = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).send(errors)
  }

  const { name, email, password, mobile, address } = req.body

  const user = User.build({
    name,
    email,
    password,
    mobile,
    address
  });

  await user.save();
  res.status(201).send('user');
});

export { router as signupRouter };
