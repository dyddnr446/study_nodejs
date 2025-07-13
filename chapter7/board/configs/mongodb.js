import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv'

dotenv.config();

const uri = process.env.MONGO_URI


export default function mongoConnection(callback) {
  const client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1, // Atlas에서 안정성
  });
  return client.connect(callback);
}
