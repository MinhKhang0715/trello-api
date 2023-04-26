require('dotenv').config();

export const env = {
  MONGODB_URI: process.env.MONGODB_URI!,
  DB_NAME: process.env.DB_NAME!,
  HOST_NAME: process.env.HOST_NAME!,
  PORT: process.env.PORT!
};