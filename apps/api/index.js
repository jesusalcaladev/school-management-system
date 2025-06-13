import { start } from './modules/infra/server/start.js'
import { router as routerAuth } from './modules/auth/routes/index.js'
import { studentRouter } from './modules/student/routes/student.js'
import { noteRouter } from './modules/notes/routes/note.js'

process.loadEnvFile()

start([routerAuth, studentRouter, noteRouter])
