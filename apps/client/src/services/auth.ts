import { handlerApi } from './handler-api'

type Data = {
  email: string
  password: string
}

type Response = {
  token: string
}

export async function loginAuth(data: Data): Promise<Response> {
  const response: Response = await handlerApi.post('/login', data)
  return response
}

export async function sendCodeAuth(
  email: string
): Promise<{ message: string; code: number }> {
  const response: { message: string; code: number } = await handlerApi.get(
    '/send-code?email=' + email
  )
  return response
}

export async function resetPasswordAuth(data: {
  email: string
  newPassword: string
}): Promise<{ message: string }> {
  const response: { message: string } = await handlerApi.post(
    '/reset-password',
    data
  )
  return response
}
