import StudentModel from '../models/student.js'

export async function deleteById(id) {
  const student = await StudentModel.findByIdAndDelete(id)
  if (!student) {
    throw new Error('No se encontró el estudiante')
  }
  return student
}
