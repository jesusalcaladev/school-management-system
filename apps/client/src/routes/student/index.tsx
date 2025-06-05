import { DataTableStudent } from '@/components/student/data-table'
import { getStudents } from '@/services/student'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { columns } from '@/components/student/columns'

export const Route = createFileRoute('/student/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useQuery({
    queryKey: ['student'],
    queryFn: getStudents,
  })
  return (
    <main className='px-5 py-10'>
      <h2 className='text-2xl font-bold mb-5'>Lista de estudiantes</h2>
      <DataTableStudent columns={columns} data={data ?? []} />
    </main>
  )
}
