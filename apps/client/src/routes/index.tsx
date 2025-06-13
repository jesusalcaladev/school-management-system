import { parserCourse } from '@/lib/utils'
import { getCountStudents, getStudentUpdateRecient } from '@/services/student'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { formatDate } from 'date-fns'
import { GraduationCap, TrendingUp, UserPlus, Users } from 'lucide-react'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (context?.auth?.isAuthenticated === false) {
      throw redirect({
        replace: true,
        to: '/login',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useQuery({
    queryKey: ['count-students'],
    queryFn: () => getCountStudents(),
  })

  const { data: recentData } = useQuery({
    queryKey: ['students-update-recent'],
    queryFn: () => getStudentUpdateRecient(),
  })

  const stats = [
    {
      title: 'Estudiantes',
      value: data?.totalStudents,
      change: data?.totalStudents ?? 0 - data?.studentsMasculino ?? 0,
      color: 'bg-blue-400',
      icon: Users,
    },
  ]

  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center justify-start min-h-screen px-10 py-10'>
      <h1 className='text-4xl font-black'>Sistema Estudiantil</h1>
      <div className='grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {stats.map((stat, index) => (
          <div
            key={index}
            className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 mb-1'>
                  {stat.title}
                </p>
                <p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
                <p className='text-sm text-green-600 flex items-center mt-1'>
                  <TrendingUp className='h-3 w-3 mr-1' />
                  {stat.change} vs mes anterior
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className='h-6 w-6 text-white' />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='w-full flex flex-row gap-x-2'>
        <div className='grid grid-cols-1 w-full lg:grid-cols-3 gap-8'>
          {/* Recent Students */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
              <div className='p-6 border-b border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  Estudiantes Recientes
                </h3>
                <p className='text-sm text-gray-600'>
                  Últimas matrículas y actualizaciones
                </p>
              </div>
              <div className='p-6'>
                <div className='space-y-4'>
                  {recentData?.map((student, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200'
                    >
                      <div className='flex items-center'>
                        <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                          <Users className='h-5 w-5 text-blue-600' />
                        </div>
                        <div className='ml-4'>
                          <p className='text-sm font-medium text-gray-900'>
                            {student.names}
                          </p>
                          <p className='text-sm text-gray-600'>
                            {parserCourse(student.currentCourse)}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center space-x-4'>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            student.currentCourse === 1
                              ? 'bg-green-100 text-green-800'
                              : student.currentCourse === 2
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {student.currentCourse}
                        </span>
                        <span className='text-sm text-gray-500'>
                          {
                            // tranformar fecha de nacimiento
                            formatDate(new Date(student.birthday), 'dd-MM-yyyy')
                          }
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-sm border w-[30%] border-gray-200'>
          <div className='p-6 border-b border-gray-200'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Acciones Rápidas
            </h3>
          </div>
          <div className='p-6'>
            <div className='space-y-3'>
              <button
                onClick={() => {
                  navigate({
                    to: '/student/create',
                  })
                }}
                className='w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200'
              >
                <UserPlus className='mr-2 h-4 w-4' />
                Nuevo Estudiante
              </button>
              <button
                onClick={() => {
                  navigate({
                    to: '/matricula',
                  })
                }}
                className='w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200'
              >
                <GraduationCap className='mr-2 h-4 w-4' />
                Ver Matriculas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
