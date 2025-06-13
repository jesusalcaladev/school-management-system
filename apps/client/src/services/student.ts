import type { Student, StudentWithForm } from '@/types/student'
import { handlerApi } from '../services/handler-api'

export const createStudent = async (data: Student) => {
  const response = await handlerApi.post<Student, Student>(
    '/student/create',
    data
  )
  return response
}

export const getCountStudents = async () => {
  const response = await handlerApi.get<{
    totalStudents: number
    studentsMasculino: number
    studentsFemenino: number
  }>('/students/count')
  return response
}

export const getStudentUpdateRecient = async () => {
  const response = await handlerApi.get<Student[]>(
    '/students/stadistics/recent'
  )
  return response
}

export const prometeStudents = async () => {
  const response = await handlerApi.post('/student/promote', {})
  return response
}

export const getStudents = async (pageParam: string) => {
  const response = await handlerApi.get<{
    docs: Student[]
    totalDocs: number
    page: number
    nextPage: string
    prevPage: string
  }>(`/students?page=${pageParam}&limit=20`)
  return response
}

export const deleteById = async (id: string) => {
  const response = await handlerApi.deleteApi(`/student/${id}`)
  return response
}

export const getStudentsByYearAndSection = async () => {
  const response = await handlerApi.get<{
    year1: Record<string, number>
    year2: Record<string, number>
    year3: Record<string, number>
    year4: Record<string, number>
    year5: Record<string, number>
  }>(`/students/year-section`)
  return response
}

export const getStudentById = async (id: string) => {
  const response = await handlerApi.get<Student>(`/student/${id}`)
  return response
}

export const getStudentsByCourseSession = async ({
  session,
  course,
}: {
  session: string
  course: string
}) => {
  const response = await handlerApi.get<Student[]>(
    `/students/session?session=${session}&course=${course}`
  )
  return response
}

export const updateStudent = async ({
  id,
  data,
}: {
  id: string
  data: StudentWithForm
}) => {
  const response = await handlerApi.put<Student, StudentWithForm>(
    `/student/${id}`,
    data
  )
  return response
}
