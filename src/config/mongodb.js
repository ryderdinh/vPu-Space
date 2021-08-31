import { MongoClient } from "mongodb";
import { env } from "./environtment";

const uri = env.MONGODB_URI;

export const connectDB = async () => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  try {
    //? Connect to the server
    await client.connect();
    console.log("Connect to the database server successfully!\n");

    //? List list databases
    await listDatabases(client);
  } catch (err) {
    console.log(err);
  } finally {
    //? Ensur that the client will close when finish/error
    await client.close();
    console.log("\nClose database successfully!");
  }
};

const listDatabases = async (client) => {
  const listDb = await client.db().admin().listDatabases();
  // console.log(databases);
  listDb.databases.forEach((db) => console.log(db.name));
};
