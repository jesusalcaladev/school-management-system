import { AuthError } from '../errors/auth-error.js'
import AdminModel from '../models/admin.js'
import { compare } from 'bcrypt'
import { generateToken } from '../util/token.js'

/**
 * Authenticates a user with the provided email and password.
 * Checks if the email exists and if the password matches.
 * If authentication is successful, generates and returns a token.
 *
 * @async
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<string>} The generated authentication token.
 * @throws {AuthError} If the email does not exist or the password is incorrect.
 */
export const login = async (email, password) => {
  // Check if the email exists
  const isUser = await AdminModel.findOne({ email })
  if (!isUser) throw new AuthError('Email or password is incorrect')
  const isPasswordMatch = await compare(password, isUser.password)
  if (!isPasswordMatch) throw new AuthError('Email or password is incorrect')
  // Generate token
  const token = generateToken(isUser)
  return token
}
