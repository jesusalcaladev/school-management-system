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
