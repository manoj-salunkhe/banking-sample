import { app } from "./app";
import { connectToDB } from "./db-connection";

const start = () => {
  connectToDB();

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(
      `Server is running on port ${port} ===> http://localhost:${port}`
    );
  });
};

start();
