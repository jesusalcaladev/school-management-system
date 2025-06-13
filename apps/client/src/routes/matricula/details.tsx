import { columnsStudent } from '@/components/student/columns'
import { ListStudents } from '@/components/student/list-students'
import { Card } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { parserCourse } from '@/lib/utils'
import { getStudentsByCourseSession } from '@/services/student'
import type { Student } from '@/types/student'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { GraduationCap, IdCard } from 'lucide-react'
import { FadeLoader } from 'react-spinners'

type QueryParams = {
  year: string
  session: string
}

export const Route = createFileRoute('/matricula/details')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): QueryParams => {
    const { year, session } = search as QueryParams
    if (!year || !session) {
      throw new Error('Faltan parámetros')
    }
    return { year, session }
  },
})

const ItemsStudents = ({ data }: { data: Student }) => {
  let url = ''
  if (data?.photo instanceof Blob) {
    url = URL.createObjectURL(data?.photo)
  } else if (typeof data?.photo === 'string') {
    url = data?.photo
  }
  return (
    <Card key={data._id} className='px-5 relative'>
      <div className='flex gap-x-5 gap-y-2 flex-row items-center'>
        <figure className='size-16 overflow-hidden rounded-lg'>
          <img src={url} className='size-full' />
        </figure>
        <div>
          <h3 className='text-xl font-semibold'>
            {data.names} {data.lastnames}
          </h3>
          <Tooltip>
            <TooltipTrigger>
              <span className='flex flex-row items-center gap-x-2'>
                <IdCard className='size-4' />
                <p>{data.ci}</p>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                CI: <span className='font-semibold'>{data.ci}</span>
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </Card>
  )
}

function RouteComponent() {
  const { session, year } = Route.useSearch()
  const { data, isLoading } = useQuery({
    queryKey: ['matricula', year, session],
    initialData: [],
    queryFn: () => getStudentsByCourseSession({ session, course: year }),
  })

  const listStudents = data
    ?.sort((a, b) => parseInt(a.ci) - parseInt(b.ci))
    .map((student, index) => {
      return {
        ...student,
        possition: index + 1,
      }
    })

  // Seprar los estudiantes por gender
  const studentsByGender = data.reduce(
    (acc, student) => {
      const gender = student.gender
      if (!acc[gender]) {
        acc[gender] = []
      }
      acc[gender].push(student)
      return acc
    },
    {} as Record<string, Student[]>
  ) ?? {
    M: [],
    F: [],
  }

  if (isLoading) {
    return <FadeLoader className='mx-auto' color='var(--color-blue-500)' />
  }

  return (
    <main className='px-10 py-10'>
      <header className='mx-auto flex flex-col border-2 border-blue-200 py-2 rounded-md items-center mb-10 justify-center'>
        <span className='flex items-center justify-center gap-x-2'>
          <GraduationCap className='size-8' />
          <h2 className='text-xl font-semibold'>
            Matricula - {parserCourse(parseInt(year))} Año -{' '}
            {session.toUpperCase()}
          </h2>
        </span>
        <p>Total de estudiantes: {data?.length}</p>
      </header>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='flex flex-col gap-y-5'>
          <h2 className='text-xl font-semibold'>
            Estudiantes Masculinos - {studentsByGender?.M?.length ?? 0}
          </h2>
          <div className='grid grid-cols-1 gap-4'>
            {studentsByGender?.M?.map?.((student) => {
              return <ItemsStudents data={student} />
            })}
            {!studentsByGender?.M?.length && (
              <p className='text-center text-neutral-800 text-sm'>
                No hay estudiantes femeninos
              </p>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-y-5'>
          <h2 className='text-xl font-semibold'>
            Estudiantes Femeninos - {studentsByGender?.F?.length ?? 0}
          </h2>
          <div className='grid grid-cols-1 gap-4'>
            {studentsByGender?.F?.map?.((student) => {
              return <ItemsStudents data={student} />
            })}
            {!studentsByGender?.F?.length && (
              <p className='text-center text-neutral-800 text-sm'>
                No hay estudiantes femeninos
              </p>
            )}
          </div>
        </div>
      </div>
      <div className='mt-10 flex flex-col gap-y-5'>
        <h2 className='text-xl font-semibold'>Lista de la matricula</h2>
        {/* <PDFDownloadLink
          document={<ListStudentPDF data={listStudents} />}
          fileName={`estudiantes_${parserCourse(parseInt(year))}-${session.toUpperCase()}.pdf`}
        >
          {({ loading }) => (
            <button className='px-4 py-2 bg-blue-600 text-white rounded-lg'>
              {loading ? 'Generando PDF...' : 'Descargar Lista'}
            </button>
          )}
        </PDFDownloadLink> */}
        <ListStudents columns={columnsStudent} data={listStudents ?? []} />
      </div>
    </main>
  )
}
