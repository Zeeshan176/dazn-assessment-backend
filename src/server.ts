/**
 * @file server.ts
 * @description Entry point for the server to start the application and establish a connection to the database.
 * 
 * This file loads environment variables, establishes a connection to MongoDB using DBConfig,
 * and starts the Express server.
 * 
 * @author Mohammad Zeeshan
 * @date 2025-01-05
 */

import app from './app';          // Import the app instance from 'app.ts'
import DBConfig from './config/DBConfig'; // Import the DB connection configuration
import dotenv from 'dotenv';     // Import dotenv to load environment variables

// Load environment variables from the .env file
dotenv.config();

// Define the port to listen on, either from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Establish connection to the MongoDB database and start the server
DBConfig.connect().then(() => {
  // Once the database connection is successful, start the Express server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log a message indicating the server is running
  });
});
