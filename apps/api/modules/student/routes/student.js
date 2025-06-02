import { Router } from 'express'
import {
  createStudent,
  getSessions,
  getStudentById,
  getStudentsBySession,
  getStudentsSearch,
} from '../controllers/student-controller.js'
import { requireAuth } from '../../auth/index.js'

export const studentRouter = Router()

studentRouter.post('/student/create', requireAuth, createStudent)

studentRouter.get('/students/search', requireAuth, getStudentsSearch)

studentRouter.get('/students/sessions', requireAuth, getSessions)

studentRouter.get(
  '/students/sessions/:session',
  requireAuth,
  getStudentsBySession
)

studentRouter.get('/student/:id', requireAuth, getStudentById)
