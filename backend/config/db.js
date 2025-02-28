import mongoose from "mongoose";
import dotenv from "dotenv"

/**
 * Establishes a connection to the MongoDB database.
 * @returns {Promise<void>}
 */
export const connectDB = async () => {
  try {
    // Establish a connection to MongoDB using the MONGO_URI environment variable
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (err) {
    // Log connection errors
    console.error(`Database connection error: ${err.message}`);
    // Terminate the process with an error code
    process.exit(1);
  }
};
