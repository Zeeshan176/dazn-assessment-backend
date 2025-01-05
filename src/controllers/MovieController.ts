/**
 * @file MovieController.ts
 * @description Controller for handling CRUD operations on the movie lobby collection.
 * 
 * @author Mohammad Zeeshan
 * @date 2025-01-05
 */

import { Request, Response } from 'express';
import Movie, { IMovie } from '../models/movie';

/**
 * MovieController class provides methods to handle movie-related API operations.
 */
class MovieController {
  /**
   * List all movies in the lobby.
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @returns {Promise<void>} Sends a list of all movies as a JSON response
   */
  public async listMovies(req: Request, res: Response): Promise<void> {
    try {
      const movies: IMovie[] = await Movie.find();
      res.json(movies); // Respond with the list of movies
    } catch (error) {
      res.status(500).json({ message: 'Server error' }); // Handle server errors
    }
  }

  /**
   * Search for movies by title or genre.
   * 
   * @param req Express Request object (query parameter `q` is used for search)
   * @param res Express Response object
   * @returns {Promise<void>} Sends the list of matching movies as a JSON response
   */
  public async searchMovies(req: Request, res: Response): Promise<void> {
    const query = req.query.q as string; // Extract the search query from request
    try {
      const movies: IMovie[] = await Movie.find({
        $or: [
          { title: { $regex: query, $options: 'i' } }, // Case-insensitive title match
          { genre: { $regex: query, $options: 'i' } }, // Case-insensitive genre match
        ],
      });
      res.json(movies); // Respond with the matching movies
    } catch (error) {
      res.status(500).json({ message: 'Server error' }); // Handle server errors
    }
  }

  /**
   * Add a new movie to the lobby.
   * 
   * @param req Express Request object (movie details in the request body)
   * @param res Express Response object
   * @returns {Promise<void>} Sends the added movie as a JSON response
   */
  public async addMovie(req: Request, res: Response): Promise<void> {
    try {
      const { title, genre, rating, streamingLink } = req.body; // Extract movie data from request
      const newMovie: IMovie = new Movie({ title, genre, rating, streamingLink });
      await newMovie.save(); // Save the new movie to the database
      res.status(201).json(newMovie); // Respond with the newly added movie
    } catch (error) {
      res.status(400).json({ message: 'Invalid data' }); // Handle validation errors
    }
  }

  /**
   * Update an existing movie's information.
   * 
   * @param req Express Request object (movie ID in params and updates in body)
   * @param res Express Response object
   * @returns {Promise<void>} Sends the updated movie as a JSON response
   */
  public async updateMovie(req: Request, res: Response): Promise<void> {
    try {
      const movie: IMovie | null = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the updated document
      });
      if (!movie) {
        res.status(404).json({ message: 'Movie not found' }); // Handle not found errors
        return;
      }
      res.json(movie); // Respond with the updated movie
    } catch (error) {
      res.status(400).json({ message: 'Invalid data' }); // Handle validation errors
    }
  }

  /**
   * Delete a movie from the lobby.
   * 
   * @param req Express Request object (movie ID in params)
   * @param res Express Response object
   * @returns {Promise<void>} Sends a success message or an error response
   */
  public async deleteMovie(req: Request, res: Response): Promise<void> {
    try {
      const movie: IMovie | null = await Movie.findByIdAndDelete(req.params.id); // Find and delete the movie
      if (!movie) {
        res.status(404).json({ message: 'Movie not found' }); // Handle not found errors
        return;
      }
      res.json({ message: 'Movie deleted successfully' }); // Respond with a success message
    } catch (error) {
      res.status(500).json({ message: 'Server error' }); // Handle server errors
    }
  }
}

// Export a singleton instance of MovieController for use in routes
export default new MovieController();
