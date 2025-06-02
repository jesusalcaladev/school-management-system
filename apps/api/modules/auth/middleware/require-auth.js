export function requireAuth(req, res, next) {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  } else {
    next()
  }
}
