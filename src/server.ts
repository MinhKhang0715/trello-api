// console.log('Hello world there')
import express from "express";
import { mapOrder } from "./utilities/";

const app = express();

const hostName: string = 'localhost';
const port: number = 9012;

app.get('/', (req, res) => {
  res.end('<h1>Hello world</h1>')
});

app.listen(port, hostName, () => {
  console.log(`Hello there, server runnning at ${hostName}:${port}`);
});
