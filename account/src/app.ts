import express from "express";
import { createRouter } from "./routes/create";

const app = express();

app.use(createRouter);

export { app };
