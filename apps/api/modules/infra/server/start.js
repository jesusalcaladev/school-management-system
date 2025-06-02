import express from 'express'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import { connect } from '../database/connect.js'
import cookieParser from 'cookie-parser'

const app = express()

const PORT_DEFAULT = 3000
const PORT = process.env.PORT || PORT_DEFAULT

export function start(routes) {
  connect()
  app.use(cors())
  app.use(
    express.json({
      limit: '100mb',
    })
  )
  app.use(cookieParser())
  if (routes.length > 0) {
    routes.forEach((route) => {
      app.use(route)
    })
  }
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      limit: 100,
    })
  )

  app.listen(PORT, () => {
    console.log(`Listen to server on port ${PORT}`)
  })
}
