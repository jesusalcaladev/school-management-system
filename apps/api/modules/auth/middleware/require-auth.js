import { AuthError } from '../errors/auth-error.js'
import { verifyToken } from '../util/token.js'

export function requireAuth(req, res, next) {
  const token = req.cookies?.token
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }
  try {
    const user = verifyToken(token)
    req.user = user // Puedes guardar el usuario en req para usarlo en la ruta
    next()
  } catch (error) {
    if (error instanceof AuthError) {
      AuthError.handle(res, error)
    } else {
      res.status(401).json({ message: 'Invalid or expired token' })
    }
  }
}
