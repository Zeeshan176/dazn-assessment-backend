/**
 * @file app.ts
 * @description Sets up the Express application, middleware, and routes.
 * 
 * This file initializes the Express application, applies middleware (CORS, body-parser),
 * and sets up routes for handling movie-related API requests.
 * 
 * @author Mohammad Zeeshan
 * @date 2025-01-05
 */

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import MovieRoutes from './routes/movieRoutes';

class App {
  // Express Application instance
  public app: express.Application;

  constructor() {
    // Initialize the Express app
    this.app = express();
    
    // Apply middleware and routes
    this.middleware();
    this.routes();
  }

  /**
   * @description Applies middleware to the Express application.
   * - CORS: Allows cross-origin resource sharing.
   * - bodyParser: Parses incoming request bodies as JSON.
   */
  private middleware(): void {
    this.app.use(cors());               // Enables CORS for all routes
    this.app.use(bodyParser.json());    // Parses incoming JSON requests
  }

  /**
   * @description Sets up API routes for the Express application.
   * Binds the movie routes under the "/api" base path.
   */
  private routes(): void {
    this.app.use('/api', MovieRoutes);  // Mounts the MovieRoutes under /api path
  }
}

// Export an instance of the app for use in server setup
export default new App().app;
