import express from "express";
import { userRouter } from "./routes/signup";

const app = express();
app.use(userRouter);
export { app };
