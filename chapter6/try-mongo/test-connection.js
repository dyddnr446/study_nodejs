import {MongoClient, ServerApiVersion } from 'mongodb'
import mongoose from 'mongoose';

const uri = "mongodb+srv://dyddnr446:dnr31245!@cluster0.6jj4r64.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const adminDB = client.db('test').admin();

    const listDatabases = await adminDB.listDatabases();
    console.log(listDatabases);
    return "OK";
  } finally {
    await client.close();
  }
}

run()
    .then(console.log)
    .catch(console.error);
