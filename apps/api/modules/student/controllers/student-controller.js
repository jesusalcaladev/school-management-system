import { createStudent as create } from '../services/create.js'
import { findStudentById, findStudents } from '../services/find.js'
import { getAllSessions } from '../util/get-all-session.js'
import StudentModel from '../models/student.js'
import { deleteById } from '../services/delete.js'
import { NoteModel } from '../../notes/models/note.js'
import { update } from '../services/update.js'

export const createStudent = async (req, res) => {
  try {
    const student = await create(req.body)
    res.status(201).json(student)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getStudentUpdateRecient = async (req, res) => {
  // Buscar los estudiantes recientemente actualizados
  const students = await StudentModel.find({
    updatedAt: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) },
  })
  res.json(students.slice(0, 5))
}

export const getCountStudents = async (req, res) => {
  const studentMasculino = await StudentModel.find({
    gender: 'M',
  }).countDocuments()
  const studentFemenino = await StudentModel.find({
    gender: 'F',
  }).countDocuments()
  const count = {
    totalStudents: studentMasculino + studentFemenino,
    studentMasculino,
    studentFemenino,
  }
  return res.status(200).json(count)
}

export async function getStudentsByYearAndSection(req, res) {
  try {
    // Agrupar estudiantes por año y sección
    const studentsByCourse = await StudentModel.aggregate([
      {
        $group: {
          _id: {
            year: '$currentCourse',
            section: '$currentSession',
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.section': 1,
        },
      },
    ])

    // Crear la estructura de resultado
    const result = {}

    studentsByCourse.forEach((item) => {
      const yearKey = `year${item._id.year}`
      const section = item._id.section

      if (!result[yearKey]) {
        result[yearKey] = {}
      }

      result[yearKey][section] = {
        countStudents: item.count,
      }
    })

    return res.status(200).json(result)
  } catch (error) {
    console.error('Error obteniendo estudiantes por año y sección:', error)
    throw error
  }
}

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params
    const student = await update(id, req.body)
    res.status(200).json(student)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getStudents = async (req, res) => {
  const { page, limit, sort } = req.query
  try {
    const students = await findStudents(page, limit, sort)
    res.json(students)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error fetching students' })
  }
}

export const deleteStudentById = async (req, res) => {
  try {
    const { id } = req.params
    const student = await deleteById(id)
    const note = await NoteModel.findOneAndDelete({ idStudent: id })
    res.status(200).json({ student, note })
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' })
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
  const { session, course, page, limit, sort } = req.query
  try {
    const students = await StudentModel.find({
      currentSession: session,
      currentCourse: course,
    })
    res.json(students)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students by session' })
  }
}

export async function promoteStudents(req, res) {
  try {
    // Graduar estudiantes de 5to año
    const graduationResult = await StudentModel.deleteMany({ currentCourse: 5 })

    // Promover estudiantes restantes (1-4)
    const promotionResult = await StudentModel.updateMany(
      { currentCourse: { $in: [1, 2, 3, 4] } },
      { $inc: { currentCourse: 1 } } // Incrementa el curso en 1
    )

    return res.status(200).json({
      graduated: graduationResult.deletedCount,
      promoted: promotionResult.modifiedCount,
    })
  } catch (error) {
    console.error('Error en promoción:', error)
    throw error
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
