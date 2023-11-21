import express from "express";
import { signupRouter } from "./routes/signup";

const app = express();
app.use(express.json())
app.use(signupRouter);
export { app };
