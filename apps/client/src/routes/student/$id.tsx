import { Header } from '@/components/student/header'
import { InfoItem } from '@/components/student/info-item'
import { NotesTable } from '@/components/student/notes-table'
import { SheetUpdate } from '@/components/student/sheet-update'
import { Button } from '@/components/ui/button'
import { parserDate } from '@/lib/utils'
import { deleteById, getStudentById } from '@/services/student'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  Baby,
  GraduationCap,
  Hospital,
  IdCard,
  Mail,
  Trash,
  User,
} from 'lucide-react'
import { FadeLoader } from 'react-spinners'
import { toast } from 'sonner'

export const Route = createFileRoute('/student/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['student', params.id],
    queryFn: () => getStudentById(params.id),
  })
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: deleteById,
    onSuccess: () => {
      toast.success('Estudiante eliminado exitosamente')
      navigate({
        to: '/student',
      })
    },
  })

  const handleDelete = () => {
    mutate(params.id)
  }

  return (
    <main className='px-20 py-10 relative'>
      <GraduationCap className='size-60 absolute -top-20 left-10 rotate-12 opacity-15' />
      {isLoading && (
        <FadeLoader className='mx-auto' color='var(--color-blue-500)' />
      )}
      {!data && <p className='mx-auto'>No hay datos</p>}
      {data && (
        <>
          <Header student={data} />
          <div className='mx-auto flex mb-4 flex-row justify-center gap-x-5'>
            <SheetUpdate
              onRefresh={refetch}
              data={data}
              idStudend={params.id}
            />
            <Button
              onClick={() => {
                handleDelete()
              }}
              variant={'outline'}
            >
              <Trash className='size-4' />
              Eliminar estudiante
            </Button>
          </div>
          <div className='grid grid-cols-1 w-[50%] mx-auto md:grid-cols-2 gap-6'>
            <InfoItem
              icon={<Mail className='w-5 h-5 text-black' />}
              label='Correo Electrónico'
              value={data.email}
              delay={100}
            />
            <InfoItem
              icon={<IdCard className='w-5 h-5 text-black' />}
              label='CI'
              value={data.ci}
              delay={200}
            />
            <InfoItem
              icon={<Baby className='w-5 h-5 text-black' />}
              label='Dia de nacimiento'
              value={parserDate(data.birthday)}
              delay={200}
            />
            <InfoItem
              icon={<Hospital className='w-5 h-5 text-black' />}
              label='Lugar de nacimiento'
              value={data.placeOfBirth}
              delay={200}
            />
            <InfoItem
              icon={<User className='w-5 h-5 text-black' />}
              label='Nombre del representante'
              value={`${data.namesParent} ${data.lastnamesParent}`}
              delay={200}
            />
            <InfoItem
              icon={<IdCard className='w-5 h-5 text-black' />}
              label='CI del representante'
              value={data.ciParent}
              delay={200}
            />
          </div>
          <div>
            <h2 className='text-2xl text-neutral-800 font-semibold mt-10 mx-auto flex justify-center'>
              Notas del estudiante
            </h2>
            <NotesTable student={data} idStudent={params.id} />
          </div>
        </>
      )}
    </main>
  )
}
