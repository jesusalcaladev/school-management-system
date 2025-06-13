import { Router } from 'express'
import {
  createNote,
  getNotes,
  updateSubjectGrades,
} from '../controllers/note.js'
import { requireAuth } from '../../auth/index.js'

export const noteRouter = Router()

noteRouter.post('/note/create', requireAuth, createNote)

noteRouter.get('/note/:idStudent', requireAuth, getNotes)

noteRouter.post('/note/update', requireAuth, updateSubjectGrades)
