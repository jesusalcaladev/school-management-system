import { hash } from 'bcrypt'
import AdminModel from '../models/admin.js'
import { generateToken } from '../util/token.js'

/**
 * Registers a new admin user.
 *
 * @async
 * @param {Object} user - The user data.
 * @param {string} user.email - The user's email address.
 * @param {string} user.password - The user's plain text password.
 * @param {string} user.name - The user's first name.
 * @param {string} user.lastname - The user's last name.
 * @returns {Promise<string>} A promise that resolves to a JWT token for the newly registered user.
 * @throws {Error} If a user with the given email already exists.
 */
export const register = async (user) => {
  const { email, password, name, lastname } = user
  // Check is gmail exists
  const userExists = await AdminModel.findOne({ email })
  if (userExists) throw new Error('User already exists')
  // Hash the password
  const hashedPassword = await hash(password, 10)
  // Create the user
  const newUser = new AdminModel({
    email,
    password: hashedPassword,
    name,
    lastname,
  })
  const savedUser = await newUser.save()
  const token = generateToken(savedUser)
  return token
}
