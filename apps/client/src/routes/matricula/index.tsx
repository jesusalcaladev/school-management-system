import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { parserCourse } from '@/lib/utils'
import {
  getStudentsByYearAndSection,
  prometeStudents,
} from '@/services/student'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { AlertTriangle, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/matricula/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useQuery({
    queryKey: ['matricula'],
    initialData: {
      year1: {},
      year2: {},
      year3: {},
      year4: {},
      year5: {},
    },
    queryFn: () => getStudentsByYearAndSection(),
  })
  const sortedYears = Object.keys(data).sort()
  const { mutate } = useMutation({
    mutationFn: prometeStudents,
    onSuccess: () => {
      toast.success('Promedios actualizados exitosamente')
    },
  })
  return (
    <main className='px-10 mx-auto py-10'>
      <div className='flex mb-10 items-center justify-center gap-y-2 flex-col gap-x-2'>
        <h1 className='text-2xl mx-auto text-center'>Matriculas</h1>
        <Dialog>
          <DialogTrigger>
            <Button className='mx-auto' variant={'outline'}>
              Actualizar Año Académico
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
              <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4'>
                <div className='flex items-center gap-3 mb-4'>
                  <AlertTriangle className='w-6 h-6 text-orange-500' />
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Confirmar Promoción
                  </h3>
                </div>

                <div className='mb-6'>
                  <p className='text-gray-700 mb-4'>
                    Esta acción promoverá a todos los estudiantes al siguiente
                    año manteniendo sus secciones:
                  </p>
                  <div className='bg-gray-50 rounded-lg p-4 space-y-2 text-sm'>
                    <div className='flex items-center gap-2'>
                      <ArrowRight className='w-4 h-4 text-gray-500' />
                      <span>5to Año (A,B,C) → Graduados</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <ArrowRight className='w-4 h-4 text-gray-500' />
                      <span>4to Año (A,B,C) → 5to Año (A,B,C)</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <ArrowRight className='w-4 h-4 text-gray-500' />
                      <span>3er Año (A,B,C) → 4to Año (A,B,C)</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <ArrowRight className='w-4 h-4 text-gray-500' />
                      <span>2do Año (A,B,C) → 3er Año (A,B,C)</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <ArrowRight className='w-4 h-4 text-gray-500' />
                      <span>1er Año (A,B,C) → 2do Año (A,B,C)</span>
                    </div>
                  </div>
                  <p className='text-orange-600 text-sm mt-3'>
                    <strong>Nota:</strong> Esta acción no se puede deshacer. Las
                    secciones se mantienen intactas.
                  </p>
                </div>

                <div className='flex gap-3'>
                  <DialogClose>
                    <Button
                      onClick={() => {
                        mutate()
                      }}
                    >
                      Confirmar Promoción
                    </Button>

                    <Button variant={'outline'}>Cancelar</Button>
                  </DialogClose>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {sortedYears.map((yearKey) => {
          const yearNumber = parseInt(yearKey.replace('year', ''))
          const yearDisplay = `${yearNumber} Año`
          const sections = data[yearKey]

          return (
            <Card
              key={yearKey}
              className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-200'
            >
              <CardHeader>
                <h3 className='text-xl font-semibold'>{yearDisplay}</h3>
              </CardHeader>

              <div className='p-5 py-0'>
                <div className='grid grid-cols-1 gap-4'>
                  {Object.entries(sections).map(([section, sectionData]) => (
                    <Link
                      key={`${yearKey}-${section}`}
                      to={`/matricula/details`}
                      search={{
                        year: yearNumber as string,
                        session: section,
                      }}
                      className='bg-blue-50 rounded-lg p-4 border border-blue-100'
                    >
                      <div className='flex justify-between items-center'>
                        <div>
                          <h4 className='font-medium text-blue-800'>
                            Sección {section.toUpperCase()}
                          </h4>
                          <p className='text-sm text-blue-600'>
                            Curso: {yearDisplay}
                          </p>
                        </div>

                        <div className='bg-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-blue-300'>
                          <span className='text-lg font-bold text-blue-700'>
                            {sectionData.countStudents}
                          </span>
                        </div>
                      </div>

                      <div className='mt-3'>
                        <div className='w-full bg-blue-200 rounded-full h-2.5'>
                          <div
                            className='bg-blue-600 h-2.5 rounded-full'
                            style={{
                              width: `${Math.min(100, sectionData.countStudents)}%`,
                            }}
                          ></div>
                        </div>
                        <p className='text-xs text-blue-600 mt-1'>
                          {sectionData.countStudents} estudiantes
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className='mt-4 pt-3 border-t border-gray-100'>
                  <p className='text-sm text-gray-600'>
                    Total en {yearDisplay}:{' '}
                    <span className='font-semibold'>
                      {Object.values(sections).reduce(
                        (sum, section) => sum + section.countStudents,
                        0
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </main>
  )
}
