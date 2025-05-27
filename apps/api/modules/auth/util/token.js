import jsonwebtoken from 'jsonwebtoken'

export function generateToken(admin) {
  const token = jsonwebtoken.sign(
    {
      id: admin._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION || '1h',
    },
  )
  return token
}

export function verifyToken(token) {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET)
}
