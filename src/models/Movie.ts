/**
 * @file movie.ts
 * @description Mongoose schema and model definition for the "Movie" collection.
 * 
 * This file defines the structure of the "Movie" document and its schema. It includes 
 * field validations and type definitions for the movie entity.
 * 
 * @interface IMovie - Interface for the movie document.
 * @class Movie - Mongoose model for interacting with the "Movie" collection.
 * 
 * @author Mohammad Zeeshan
 * @date 2025-01-05
 */

import mongoose, { Document, Schema } from 'mongoose';

/**
 * @interface IMovie
 * Represents the structure of a Movie document in MongoDB.
 */
export interface IMovie extends Document {
  title: string;           // The title of the movie
  genre: string;           // The genre of the movie (e.g., Action, Drama)
  rating: number;          // The rating of the movie (0 to 10 scale)
  streamingLink: string;   // The link to stream the movie
}

/**
 * MovieSchema
 * Defines the schema for the Movie collection in MongoDB.
 */
const MovieSchema: Schema = new Schema({
  title: { 
    type: String, 
    required: true, // Title is mandatory
  },
  genre: { 
    type: String, 
    required: true, // Genre is mandatory
  },
  rating: { 
    type: Number, 
    required: true, // Rating is mandatory
    min: 0,        // Minimum rating is 0
    max: 10,       // Maximum rating is 10
  },
  streamingLink: { 
    type: String, 
    required: true, // Streaming link is mandatory
  },
});

/**
 * Movie
 * Mongoose model for the Movie collection.
 * 
 * This model allows CRUD operations and validation for the Movie documents.
 */
const Movie = mongoose.model<IMovie>('Movie', MovieSchema);

export default Movie;
