import { handlerApi } from '../services/handler-api'

export const createStudent = async (data: Record<string, string>) => {
  const response = await handlerApi.post('/student/create', data)
  console.log(response)
}
