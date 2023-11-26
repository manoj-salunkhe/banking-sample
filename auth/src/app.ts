import express from "express";
import cookieSession from "cookie-session";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { errorHandler } from "../../common/src";

const app = express();
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    name: "session-test",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(errorHandler);
export { app };
