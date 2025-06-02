const URL_API_BASE = 'http://localhost:3000'

const get = async (url: string) => {
  const response = await fetch(`${URL_API_BASE}${url}`, {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('token_access') ?? '',
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}

const post = async <T, D>(url: string, body: D): Promise<T> => {
  try {
    const response = await fetch(`${URL_API_BASE}${url}`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token_access') ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (response.status === 401) {
      const data = await response.json()
      if (!data.message) {
        throw new Error('Unauthorized')
      }
      throw new Error(data.message)
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

export const handlerApi = {
  get,
  post,
}
