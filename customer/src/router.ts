import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Customer } from "./model/customer";

const router = express.Router();

router.get(
  "/customer",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("must be a valid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    // const result = validationResult(req);

    // console.log(result)

    // const { name, email, address, mobile } = req.body;

    const customer = Customer.build({
      name: "mani",
      email: "mani@gmail.com",
      address: "3-78",
      mobile: "0123456789",
    });

    await customer.save();

    res.status(200).send({ name: "Ani" });
  }
);

export { router as customerRouter };
