/**
 * @file routes/movieRoutes.ts
 * @description Defines and manages the API endpoints for the Movie Lobby.
 * 
 * This file sets up the routes for the Movie API and binds each route to its 
 * respective controller and middleware functions. It handles the following:
 * - Listing all movies
 * - Searching for movies by title or genre
 * - Adding a new movie (admin only)
 * - Updating a movie's details (admin only)
 * - Deleting a movie (admin only)
 * 
 * @author Your Name
 * @date Your Date (e.g., 2025-01-05)
 */

import { Router } from 'express';
import MovieController from '../controllers/movieController';
import AuthMiddleware from '../middleware/authMiddleware';

// Initialize the Express router
const router: Router = Router();

/**
 * @route GET /movies
 * @description Fetch all movies in the lobby.
 * @access Public
 */
router.get('/movies', MovieController.listMovies.bind(MovieController));

/**
 * @route GET /search
 * @description Search for movies by title or genre.
 * @access Public
 * @queryParam {string} q - The search query (title or genre).
 */
router.get('/search', MovieController.searchMovies.bind(MovieController));

/**
 * @route POST /movies
 * @description Add a new movie to the lobby.
 * @access Admin Only
 * @middleware AuthMiddleware.authenticateAdmin - Ensures only admin users can access this route.
 */
router.post(
  '/movies', 
  AuthMiddleware.authenticateAdmin.bind(AuthMiddleware), 
  MovieController.addMovie.bind(MovieController)
);

/**
 * @route PUT /movies/:id
 * @description Update an existing movie's details.
 * @access Admin Only
 * @middleware AuthMiddleware.authenticateAdmin - Ensures only admin users can access this route.
 * @param {string} id - The ID of the movie to update.
 */
router.put(
  '/movies/:id', 
  AuthMiddleware.authenticateAdmin.bind(AuthMiddleware), 
  MovieController.updateMovie.bind(MovieController)
);

/**
 * @route DELETE /movies/:id
 * @description Delete a movie from the lobby.
 * @access Admin Only
 * @middleware AuthMiddleware.authenticateAdmin - Ensures only admin users can access this route.
 * @param {string} id - The ID of the movie to delete.
 */
router.delete(
  '/movies/:id', 
  AuthMiddleware.authenticateAdmin.bind(AuthMiddleware), 
  MovieController.deleteMovie.bind(MovieController)
);

// Export the router for use in the main application
export default router;
