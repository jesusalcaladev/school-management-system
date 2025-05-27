/**
 * Custom error class for authentication-related errors.
 * Extends the built-in Error class and adds a status code.
 *
 * @class AuthError
 * @extends {Error}
 * @param {string} [message] - Optional error message.
 * @property {string} name - The name of the error ('AuthError').
 * @property {string} message - The error message.
 * @property {number} statusCode - The HTTP status code (401).
 */

/**
 * Converts the AuthError instance to a JSON object.
 *
 * @returns {{ name: string, message: string, statusCode: number }} JSON representation of the error.
 */

/**
 * Handles sending the error response using Express.js response object.
 *
 * @static
 * @param {import('express').Response} res - Express response object.
 * @param {AuthError} error - The AuthError instance to handle.
 */
export class AuthError extends Error {
  constructor(message) {
    super(message)
    this.name = 'AuthError'
    this.message = message || 'Authentication error occurred'
    this.statusCode = 401
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
    }
  }

  static handle(res, error) {
    res.status(error.statusCode).json({
      message: error.message,
    })
  }
}
