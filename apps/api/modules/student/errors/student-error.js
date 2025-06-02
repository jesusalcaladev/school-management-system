export class StudentError extends Error {
  constructor(message) {
    super(message)
    this.name = 'StudentError'
    this.message = message
  }

  static studentNotFound() {
    return new StudentError('Student not found')
  }
}
