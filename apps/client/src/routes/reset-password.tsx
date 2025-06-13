import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { resetPasswordAuth } from '@/services/auth'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Lock } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/reset-password')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { email: string } => {
    const { email } = search as { email: string }
    return { email }
  },
})

function RouteComponent() {
  const { email } = Route.useSearch()
  const [value, setValue] = useState({
    password: '',
    newPassword: '',
  })
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationKey: ['reset-password', email],
    mutationFn: resetPasswordAuth,
    onSuccess: ({ message }) => {
      toast.success(message)
      navigate({
        to: '/login',
      })
    },
  })

  const handleChange =
    (key: keyof typeof value) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue({
        ...value,
        [key]: e.target.value,
      })
    }

  const handleSubmit = () => {
    if (value.password !== value.newPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    mutate({
      email,
      newPassword: value.newPassword,
    })
  }
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader className='justify-center items-center '>
            <Lock
              className='text-blue-400 mx-auto size-18'
              strokeWidth={1.25}
            />
            <CardTitle className='text-center'>
              Verificación de correo electrónico
            </CardTitle>
            <CardDescription className='text-center'>
              Ingrese su dirección de correo electrónico para recibir su código
              de verificación.
            </CardDescription>
            <CardContent className='flex gap-y-3 mt-2 flex-col items-center'>
              <Input
                onChange={handleChange('password')}
                placeholder='Nueva contraseña'
                required
              />
              <Input
                onChange={handleChange('newPassword')}
                placeholder='Confirmar nueva contraseña'
                required
              />
              <Button onClick={handleSubmit}>Cambiar contraseña</Button>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
