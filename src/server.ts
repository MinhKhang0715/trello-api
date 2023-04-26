import express from "express";
import { mapOrder } from "./utilities/index";
import { env } from "./config/env";
import { connectDB } from "./config/mongodb";

const app = express();

const hostName: string = env.HOST_NAME;
const port: number = parseInt(env.PORT, 10);
connectDB().catch(console.log)

app.get('/', (req, res) => {
  res.end('<h1>Hello world</h1>')
});

app.listen(port, hostName, () => {
  console.log(`Hello there, server runnning at ${hostName}:${port}`);
});
