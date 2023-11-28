import { app } from "./app";
import { connectToDB } from "./db-connection";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3011;

const start = () => {
  app.listen(port, () => {
    connectToDB();
    console.log(`Account application listinign on port ${port}`);
  });
};
start();
