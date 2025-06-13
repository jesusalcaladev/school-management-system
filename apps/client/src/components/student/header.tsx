import { parserAge, parserCourse } from '@/lib/utils'
import type { Student } from '@/types/student'
import { GraduationCap, User, Users } from 'lucide-react'

export function Header({ student }: { student: Student }) {
  let url = ''
  if (student?.photo instanceof Blob) {
    url = URL.createObjectURL(student?.photo)
  } else if (typeof student?.photo === 'string') {
    url = student?.photo
  }
  return (
    <div className='rounded-3xl mx-auto p-8 mt-10'>
      <div className='flex flex-col justify-center lg:flex-row items-center gap-8'>
        {/* Profile Image */}
        <div className='relative group'>
          <div className='relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden ring-4 ring-white shadow-2xl'>
            <img
              src={url}
              alt={student.names}
              className='w-full h-full object-cover'
            />
          </div>
        </div>

        {/* Main Info */}
        <div className=' text-center lg:text-left'>
          <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-2 animate-slide-up'>
            {student.names} {student.lastnames}
          </h1>
          <div
            className='flex items-center justify-center lg:justify-start gap-2 mb-4 animate-slide-up'
            style={{ animationDelay: '200ms' }}
          >
            <GraduationCap className='w-5 h-5 text-primary-600' />
            <span className='text-xl font-semibold text-primary-600'>
              {parserCourse(student.currentCourse)} Año -{' '}
              {student.currentSession.toUpperCase()}
            </span>
          </div>
          <div
            className='flex items-center justify-center lg:justify-start gap-6 text-gray-600 animate-slide-up'
            style={{ animationDelay: '400ms' }}
          >
            <div className='flex items-center gap-2'>
              <Users className='w-4 h-4' />
              <span className='font-medium'>
                Edad: {parserAge(student.birthday)} años
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <User className='w-4 h-4' />
              <span className='font-medium'>
                Género: {student.gender === 'M' ? 'Masculino' : 'Femenino'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
