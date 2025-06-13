import { Router } from 'express'
import {
  createStudent,
  deleteStudentById,
  getSessions,
  getStudentById,
  getStudentsBySession,
  getStudents,
  promoteStudents,
  updateStudent,
  getStudentsByYearAndSection,
  getCountStudents,
  getStudentUpdateRecient,
} from '../controllers/student-controller.js'
import { requireAuth } from '../../auth/index.js'

export const studentRouter = Router()

studentRouter.post('/student/create', requireAuth, createStudent)

studentRouter.get('/students', requireAuth, getStudents)

studentRouter.get('/student/sessions', requireAuth, getSessions)

studentRouter.put('/student/:id', requireAuth, updateStudent)

studentRouter.delete('/student/:id', requireAuth, deleteStudentById)

studentRouter.get('/students/session', requireAuth, getStudentsBySession)

studentRouter.get('/student/:id', requireAuth, getStudentById)

studentRouter.get(
  '/students/year-section',
  requireAuth,
  getStudentsByYearAndSection
)

studentRouter.get(
  '/students/stadistics/recent',
  requireAuth,
  getStudentUpdateRecient
)

studentRouter.get('/students/count', requireAuth, getCountStudents)

studentRouter.post('/student/promote', requireAuth, promoteStudents)
