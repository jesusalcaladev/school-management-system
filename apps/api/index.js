import { start } from './modules/infra/server/start.js'
import { router } from './modules/auth/routes/index.js'

process.loadEnvFile()

start([router])
