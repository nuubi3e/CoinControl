import { log } from './log'

export const encodeEmail = (email: string) => {
  const spliEmail = email.split('@')
  const lastThreeDigits = spliEmail[0].slice(-3)
  const hiddedEmail = lastThreeDigits.padStart(spliEmail[0].length, '*')
  const displayEmail = `${hiddedEmail}@${spliEmail[1]}`

  return displayEmail
}

type APIConnect = (obj: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  extraHeaders?: any
  payload?: string
  endpoint: string
}) => Promise<any>

export const connectToAPI: APIConnect = async ({
  method,
  extraHeaders,
  payload,
  endpoint,
}) => {
  try {
    if ((method === 'POST' || method === 'PUT') && !payload)
      throw new Error('CLIENT ERROR: No Payload Provided')

    log('BEFORE API CALL: ', {
      method,
      extraHeaders,
      payload,
      endpoint,
    })
    const res = await fetch(`/api/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...extraHeaders,
      },
      body: method === 'GET' ? undefined : payload,
    })

    if (!res.ok) {
      const error = JSON.parse(await res.text())

      throw new Error(error.message)
    }

    const data = await res.json()

    log('API RESPONSE: ', data)

    return data
  } catch (err: any) {
    throw new Error(err.message)
  }
}
