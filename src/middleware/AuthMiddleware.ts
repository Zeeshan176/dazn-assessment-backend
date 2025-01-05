/**
 * @file AuthMiddleware.ts
 * @description Middleware for authenticating and authorizing requests in the application.
 * Specifically checks for 'admin' role in the provided JWT.
 * 
 * @author Mohammad Zeeshan
 * @date 2025-01-05
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * AuthMiddleware class provides methods to authenticate and authorize API requests.
 * It ensures only authorized users with the correct roles can access restricted endpoints.
 */
class AuthMiddleware {
  /**
   * Middleware to authenticate and authorize an admin user.
   * 
   * @param req - The HTTP request object
   * @param res - The HTTP response object
   * @param next - The next middleware function
   * 
   * @description This method extracts the JWT token from the request headers,
   * verifies its validity, and checks if the user's role is 'admin'.
   * If the token is invalid or the role is not 'admin', it returns an appropriate error response.
   */
  public authenticateAdmin(req: Request, res: Response, next: NextFunction): void {
    // Extract the token from the Authorization header, if present.
    const token = req.headers.authorization?.split(' ')[1];

    // Check if the token exists; if not, respond with 'Unauthorized'.
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    try {
      // Verify the token using the secret key stored in environment variables.
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      // Check if the user role in the decoded token is 'admin'.
      if ((decoded as any).role !== 'admin') {
        // If the role is not 'admin', respond with 'Forbidden'.
        res.status(403).json({ message: 'Forbidden' });
        return;
      }

      // If all checks pass, proceed to the next middleware or route handler.
      next();
    } catch (error) {
      // If any error occurs during token verification, respond with 'Unauthorized'.
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}

// Export a singleton instance of AuthMiddleware for use in routes.
export default new AuthMiddleware();
