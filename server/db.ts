import { MongoClient, ServerApiVersion, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 
  "mongodb+srv://Enjazcv303:fKUzIj8EZVwlJgxO@enjazcv.9cilact.mongodb.net/cv_management?retryWrites=true&w=majority&appName=Enjazcv";
if (!process.env.MONGODB_URI) {
  console.warn("Warning: MONGODB_URI environment variable not set, using default URI");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db: Db;

export async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db("cv_management");
    console.log("Connected to MongoDB successfully!");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

export function getDatabase(): Db {
  if (!db) {
    throw new Error("Database not connected. Call connectToDatabase() first.");
  }
  return db;
}

export { client };
