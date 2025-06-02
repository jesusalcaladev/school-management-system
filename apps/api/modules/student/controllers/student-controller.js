import { createStudent as create } from '../services/create.js'
import { findStudentById, findStudentSearch } from '../services/find.js'
import { getAllSessions } from '../util/get-all-session.js'
import StudentModel from '../models/student.js'

export const createStudent = async (req, res) => {
  try {
    const student = await create(req.body)
    res.status(201).json(student)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getStudentsSearch = async (req, res) => {
  const { search, page, limit, sort, session, course } = req.query
  try {
    const students = await findStudentSearch(
      search,
      page,
      limit,
      sort,
      course,
      session
    )
    res.json(students)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' })
  }
}

export const getSessions = async (req, res) => {
  try {
    const students = await StudentModel.find().select('currentSession').lean()
    const sessions = await getAllSessions(students)
    res.json({ sessions })
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sessions' })
  }
}

export const getStudentsBySession = async (req, res) => {
  const { session, page, limit, sort } = req.query
  try {
    const students = await StudentModel.find({
      currentSession: session,
    }).paginate({
      page: page || 1,
      limit: limit || 10,
      sort: { createdAt: sort === 'desc' ? 'desc' : 'asc' },
    })
    res.json(students)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students by session' })
  }
}

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params
    const student = await findStudentById(id)
    res.json(student)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' })
  }
}
