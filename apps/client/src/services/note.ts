import type { Notes, Period } from '@/types/student'
import { handlerApi } from './handler-api'

export const getNotes = async (idStudent: string) => {
  const response = await handlerApi.get<Notes>(`/note/${idStudent}`)
  return response
}

export const updateSubjectGrades = async (body: {
  id: string
  year: string
  period: string
  updateData: Period
}): Promise<Notes> => {
  const response = await handlerApi.post<
    Notes,
    {
      id: string
      year: string
      period: string
      updateData: Period
    }
  >(`/note/update`, body)
  return response
}
