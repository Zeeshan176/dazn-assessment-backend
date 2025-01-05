/**
 * @file DBConfig.ts
 * @description Configuration class for establishing a MongoDB connection using Mongoose.
 * 
 * @author Mohammad Zeeshan
 * @date 2025-01-05
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from the .env file into process.env
dotenv.config();

/**
 * DBConfig class handles the connection to the MongoDB database using Mongoose.
 * It ensures a proper connection is established or terminates the process in case of failure.
 */
class DBConfig {
  /**
   * Connect to the MongoDB database.
   * 
   * @returns {Promise<void>} Resolves when the connection is successful, or terminates the process on failure.
   */
  public async connect(): Promise<void> {
    try {
      // Log the connection string to debug and verify correctness
      console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI);

      // Establish a connection to MongoDB using Mongoose
      await mongoose.connect(process.env.MONGO_URI as string);

      // Log a success message when the connection is established
      console.log('MongoDB connected successfully.');
    } catch (error) {
      // Log the error if the connection fails
      console.error('MongoDB connection failed:', error);

      // Exit the process with a non-zero code to indicate failure
      process.exit(1);
    }
  }
}

// Export a singleton instance of DBConfig for application-wide use
export default new DBConfig();
