import mongoose, { ConnectOptions } from "mongoose";

const username = "manojsalunkhe078";
const password = "Oneplus%406";
const database = "Tech";

const connectToDB = async () => {
  const url = `mongodb+srv://${username}:${password}@cluster0.hmzps7k.mongodb.net/${database}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(`Database connection error ${err}`);
  }
};

export { connectToDB };
