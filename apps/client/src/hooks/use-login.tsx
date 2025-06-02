import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { loginAuth } from '@/services/auth'
import { useAuthContext } from '@/context/auth-context'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

export function useLogin() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const { login } = useAuthContext()

  const { mutateAsync: loginMutate } = useMutation({
    mutationFn: loginAuth,
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleChange =
    (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [key]: e.target.value,
      })
    }

  const handleSubmit = async () => {
    const data = await loginMutate(values)
    if (data.token) {
      login(data.token)
      navigate({
        to: '/',
      })
    }
  }

  return {
    values,
    handleSubmit,
    handleChange,
  }
}
