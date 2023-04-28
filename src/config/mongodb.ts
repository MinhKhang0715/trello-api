import { Db, MongoClient } from "mongodb";
import { env } from "./env";

let dbInstance: Db | null = null;

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI);

  // connect to database server
  await client.connect();
  dbInstance = client.db(env.DB_NAME);
  
};

export const getDBInstance = () => {
  if (!dbInstance) throw new Error("Must connect to database server first");
  return dbInstance;
}
