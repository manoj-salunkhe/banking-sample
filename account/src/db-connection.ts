import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { USER, PASSWORD, DATABASE } = process.env;

const connectToDB = async () => {
  try {
    const url = `mongodb+srv://${USER}:${PASSWORD}@cluster0.hmzps7k.mongodb.net/${DATABASE}?retryWrites=true&w=majority`
    await mongoose.connect(url);
    console.log("Connected to AccountDB");
  } catch (err) {}
};

export { connectToDB };
