import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Add MongoDB URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: { version: "1" }, // Ensures compatibility
      autoEncryption: undefined, // Fixes 'child_process' and 'tls' error
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: { version: "1" },
    autoEncryption: undefined, // Fix for Next.js MongoDB issue
  });
  clientPromise = client.connect();
}

export default clientPromise;
