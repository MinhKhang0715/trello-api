import express from "express";
import { mapOrder } from "./utilities/index";
import { env } from "./config/env";
import { connectDB } from "./config/mongodb";
import { BoardModel } from "./models/board.model";

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
  app.get('/test', async (req, res) => {
    res.end('<h1>Hello world</h1>')
  });

  app.listen(port, hostName, () => {
    console.log(`Hello there, server runnning at ${hostName}:${port}`);
  });
}
