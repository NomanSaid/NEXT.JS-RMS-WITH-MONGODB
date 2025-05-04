import { MongoClient } from "mongodb"

// Create a mock client for build time
const mockClient = {
  db: () => ({
    collection: () => ({
      find: () => ({ toArray: async () => [] }),
      findOne: async () => null,
      insertOne: async () => ({ insertedId: "mock-id" }),
      updateOne: async () => ({ modifiedCount: 1 }),
      deleteOne: async () => ({ deletedCount: 1 }),
      aggregate: () => ({ toArray: async () => [] }),
    }),
  }),
  connect: async () => mockClient,
} as unknown as MongoClient

// Check if MongoDB URI is available
const uri = process.env.MONGODB_URI
let clientPromise: Promise<MongoClient>

// If no MongoDB URI is provided, use the mock client
if (!uri) {
  console.warn("MongoDB URI not found. Using mock client.")
  clientPromise = Promise.resolve(mockClient)
} else {
  // Real MongoDB connection logic
  const options = {}
  let client: MongoClient

  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options)
      globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
}

export default clientPromise
