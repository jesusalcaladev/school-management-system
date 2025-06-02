import Student from '../models/student.js'
/**
 * Finds a student by their ID.
 *
 * @async
 * @function findStudentById
 * @param {string} id - The ID of the student to find.
 * @returns {Promise<Student|null>} A promise that resolves to the found student or null if not found.
 */

export async function findStudentById(id) {
  return Student.findById(id).populate('parents').populate('notes')
}

/**
 * Finds a student by their CI (identification number), including their parents and notes.
 *
 * @async
 * @function
 * @param {string|number} ci - The CI (identification number) of the student to find.
 * @returns {Promise<Object|null>} The student document with populated 'parents' and 'notes' fields, or null if not found.
 */
export async function findStudentByCI(ci) {
  return await Student.findOne({ ci }).populate('parents').populate('notes')
}

/**
 * Finds students whose names match the given search string (case-insensitive).
 *
 * @param {string} search - The name or partial name to search for.
 * @param {number} [page=1] - The page number for pagination.
 * @param {number} [limit=10] - The number of students to return per page.
 * @param {string} course - The currectCourse of students
 * @param {string} session - The currectSessoin of students
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of matching student documents.
 */
export async function findStudentSearch(
  search,
  page = 1,
  limit = 10,
  sort,
  course,
  session
) {
  return await Student.find({
    names: { $regex: search, $options: 'i' },
    email: { $regex: search, $options: 'i' },
    phone: { $regex: search, $options: 'i' },
    address: { $regex: search, $options: 'i' },
    lastname: { $regex: search, $options: 'i' },
    ci: { $regex: search, $options: 'i' },
    ...(course && { currentCourse: course }),
    ...(course && { currentSession: session }),
  }).paginate({
    page: page,
    limit: limit,
    sort: { createdAt: sort === 'desc' ? 'desc' : 'asc' },
  })
}
