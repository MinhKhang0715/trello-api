import { MongoClient } from "mongodb";
import { env } from "./env";

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI);
  try {
    await client.connect();
    console.log('Successfully connected to server');
    await listDBs(client);
  } finally {
    // ensure connection will be closed whether finish/error
    console.log('Closing the connection...');
    
    await client.close();
  }
};

const listDBs = async (client: MongoClient) => {
  const databaseList = await client.db().admin().listDatabases();
  console.log(databaseList);
  databaseList.databases.forEach(db => {
    console.log(`-${db.name}`) 
  });
};
