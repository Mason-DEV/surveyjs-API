const { MONGO_CONFIG } = require("./config");
const { ObjectId, MongoClient } = require("mongodb");
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return client;
  }

  try {
    await client.connect();
    isConnected = true;
    return client;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw new Error("Failed to connect to the database");
  }
};

const getDatabase = async (dbName) => {
  const clientInstance = await connectDB();
  return clientInstance.db(dbName);
};

const getCollection = async (collectionName) => {
  const database = await getDatabase(MONGO_CONFIG.DB_NAME);
  return database.collection(collectionName);
};

const getFormsCollection = async () => {
  return getCollection(MONGO_CONFIG.COLLECTION_FORM);
};

const getsSubmissionCollection = async () => {
  return getCollection(MONGO_CONFIG.COLLECTION_SUBMISSION);
};

const createObjectID = (id) => {
  return ObjectId.createFromHexString(id);
};

module.exports = {
  getFormsCollection,
  getsSubmissionCollection,
  createObjectID,
};
