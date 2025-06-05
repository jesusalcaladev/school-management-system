import { handlerApi } from '../services/handler-api'

export const createStudent = async (data: Record<string, string>) => {
  const response = await handlerApi.post('/student/create', data)
  return response
}

export const getStudents = async () => {
  const response = await handlerApi.get('/students/search')
  return response
}
