// Importing modules
import { MongoClient } from "mongodb";

// Exporting our function
const handler = (callback) => {
  // Configuration
  // process.env.STORAGE_URL
  const url     = process.env.STORAGE_URL;
  const dbName  = "beta";

  // Connecting to our datastore
  MongoClient.connect(url, (error, client) => {
    // Specifing our database
    const db = client.db(dbName);
    
    // And now calling our callback function
    callback(client, db);
  });
};

export default handler;