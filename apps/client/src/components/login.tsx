import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLogin } from '@/hooks/use-login'
import { School } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { handleChange, handleSubmit, values } = useLogin()
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <div className='size-80 absolute -left-1 -top-1 blur-2xl rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-40' />
      <Card className='border-blue-300'>
        <CardHeader className='items-center flex justify-center flex-col'>
          <School className='text-blue-400 size-18' strokeWidth={1.25} />
          <CardTitle className='text-2xl font-bold text-neutral-800'>
            Sistema estudiantil
          </CardTitle>
          <CardDescription>
            Ingrese sus credenciales para iniciar sesión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  onChange={handleChange('email')}
                  placeholder='m@example.com'
                  required
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Contraseña</Label>
                </div>
                <Input
                  id='password'
                  onChange={handleChange('password')}
                  type='password'
                  required
                />
              </div>
              <Link to={'/verify-email'}>Olvide mi contraseña</Link>
              <Button type='submit' size={'lg'} className='w-full'>
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex items-center justify-center'>
          <p className='text-center text-sm opacity-50'>
            © 2025 Sistema Estudiantil
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
