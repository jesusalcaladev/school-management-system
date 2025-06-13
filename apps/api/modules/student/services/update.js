import Student from '../models/student.js'

export const update = async (id, data) => {
  const student = await Student.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true }
  )

  if (!student) {
    throw new ValidationError('Student not found')
  }
  return student
}
