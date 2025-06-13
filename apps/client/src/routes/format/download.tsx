import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/format/download')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='px-20 py-10 flex flex-col items-center'>
      <h1 className='mt-10 text-3xl mb-10'>Descargar formatos</h1>
      <div className='flex flex-row gap-x-5'>
        <Card>
          <CardHeader>
            <h2 className='text-2xl font-bold'>Formato Excel</h2>
            <p>Resumen de Rendimiento estudiantil</p>
          </CardHeader>
          <CardContent>
            <a
              className={buttonVariants({ variant: 'outline' })}
              href={'/resumen-rendimiento-estudiantil.xlsx'}
              download
            >
              Descargar formato Excel
            </a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className='text-2xl font-bold'>Formato Excel</h2>
            <p>Certificacion de calificaciones EMG</p>
          </CardHeader>
          <CardContent>
            <a
              className={buttonVariants({ variant: 'outline' })}
              href={'/certificacion-calificaciones-emg.xlsx'}
              download
            >
              Descargar formato Excel
            </a>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
