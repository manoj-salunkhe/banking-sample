import express from "express";
import { customerRouter } from "./router";

const app = express();
app.use(customerRouter);

export { app };
