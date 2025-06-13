import Student from '../models/student.js'
import { ValidationError } from '../errors/validation-error.js'
import { createSchema } from '../validations/create.js'

/**
 * Validates the input data for creating a student using the defined schema.
 *
 * @async
 * @function validateCreateStudent
 * @param {Object} data - The student data to validate.
 * @returns {Promise<Object>} The validated student data.
 * @throws {ValidationError} If the validation fails, throws with the first error message.
 */
export async function validateCreateStudent(data) {
  const result = createSchema.safeParse(data)
  if (result.success) {
    return result.data
  } else {
    throw new ValidationError(result.error.issues[0])
  }
}

/**
 * Creates a new student record in the database.
 *
 * @param {Object} data - The data for the new student.
 * @returns {Promise<Student>} A promise that resolves to the saved student instance.
 * @throws {ValidationError} If the provided data is invalid.
 */
export async function createStudent(data) {
  const { currentCourse, ...rest } = data
  const courseParse = parseInt(currentCourse)
  await validateCreateStudent({ ...rest, currentCourse: courseParse })
  const student = new Student(data)
  return await student.save()
}
