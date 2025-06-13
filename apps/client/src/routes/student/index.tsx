import { DataTableStudent } from '@/components/student/data-table'
import { getStudents } from '@/services/student'
import { useInfiniteQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { columns } from '@/components/student/columns'

export const Route = createFileRoute('/student/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['students'],
      queryFn: ({ pageParam }) => getStudents(pageParam),
      initialPageParam: '1',
      getNextPageParam: (lastPage) => lastPage.nextPage,
      getPreviousPageParam: (lastPage) => lastPage.prevPage,
    })

  // unificar todos los datos en un solo array y pasarlo a la tabla
  const data_table = data?.pages.flatMap((page) => page.docs)

  return (
    <main className='px-10 py-10'>
      <h2 className='text-2xl font-bold mb-5'>Lista de estudiantes</h2>
      <DataTableStudent
        columns={columns}
        data={data_table ?? []}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onFetchMore={fetchNextPage}
      />
    </main>
  )
}
