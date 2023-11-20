import { connectToDB } from "./db-connection";
import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3010;

const start = () => {
  connectToDB();
  app.listen(port, () => {
    console.log(`Auth application listinign on port ${port}`);
  });
};
start();
