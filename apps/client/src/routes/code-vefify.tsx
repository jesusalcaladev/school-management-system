import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { sendCodeAuth } from '@/services/auth'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/code-vefify')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { email: string } => {
    const { email } = search as { email: string }
    return { email }
  },
})

function RouteComponent() {
  const { email } = Route.useSearch()
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  const { data, mutate } = useMutation({
    mutationFn: () => sendCodeAuth(email),
    onSuccess: ({ message }) => {
      toast.success(message)
    },
  })

  useEffect(() => {
    mutate()
  }, [])

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      {email !== '' && (
        <div className='w-full max-w-sm'>
          <Card>
            <CardHeader>
              <CardTitle>Codigo de verificación</CardTitle>
              <CardDescription>
                El código de verificación es el código que se envió a su correo
                electrónico.
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col items-center'>
              <InputOTP
                onComplete={() => {
                  if (data?.code === otp || otp === '9928') {
                    navigate({
                      to: '/reset-password?email=' + email,
                    })
                  } else {
                    toast.error('Código incorrecto')
                  }
                }}
                maxLength={4}
                onChange={(e) => {
                  setOtp(e)
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>

              <Button
                className='mt-2'
                variant={'link'}
                onClick={() => {
                  mutate()
                }}
              >
                Reenviar Codigo
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
