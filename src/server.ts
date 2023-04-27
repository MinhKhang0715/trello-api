import express from "express";
import { env } from "./config/env";
import { connectDB } from "./config/mongodb";
import { api } from "./routes/v1";

const hostName: string = env.HOST_NAME;
const port: number = parseInt(env.PORT, 10);

connectDB()
  .then(() => console.log("successfully connected to database server"))
  .then(() => startServer())
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

const startServer = () => {
  const app = express();
  app.use(express.json());
  
  app.use('/v1', api);

  app.listen(port, hostName, () => {
    console.log(`Hello there, server runnning at ${hostName}:${port}`);
  });
}
