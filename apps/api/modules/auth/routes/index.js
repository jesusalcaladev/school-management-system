import { Router } from 'express'
import { AuthError } from '../errors/auth-error.js'
import { login } from '../services/login.js'
import { register } from '../services/register.js'

export const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const token = await login(email, password)
    res.status(200).json({ token })
  } catch (error) {
    if (error instanceof AuthError) {
      AuthError.handle(res, error)
    } else {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
})

router.post('/register', async (req, res) => {
  const { email, password, name, lastname } = req.body
  try {
    const token = await register({ email, password, name, lastname })
    res.status(200).json({ token })
  } catch (error) {
    if (error instanceof AuthError) {
      AuthError.handle(res, error)
    } else {
      res.status(500).json({ message: error.message })
    }
  }
})

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
  res.status(200).json({ message: 'Logged out successfully' })
})
