import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Send } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/verify-email')({
  component: RouteComponent,
})

function RouteComponent() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate({
      to: '/code-vefify?email=' + value,
    })
  }
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader>
            <Send className='text-blue-400 size-18' strokeWidth={1.25} />
            <CardTitle>Verificación de correo electrónico</CardTitle>
            <CardDescription>
              Ingrese su dirección de correo electrónico para recibir su código
              de verificación.
            </CardDescription>
            <CardContent className='flex gap-y-2 flex-col items-center'>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type='email'
                placeholder='m@example.com'
                required
              />
              <Button onClick={handleSubmit}>
                Enviar código de verificación
              </Button>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
