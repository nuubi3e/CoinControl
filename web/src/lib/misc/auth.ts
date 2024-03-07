import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { UserSession } from '../types/payload.types'

// function to get user session
type GetSession = () => UserSession | null
export const getSession: GetSession = () => {
  try {
    const cookie = cookies()
    const authToken = cookie.get('auth-token')?.value as string

    // if no cookie available
    if (!authToken) throw new Error('Un Authorized')

    // this line will verify jwt and also checks for expiresTime of jwt so we don't need to check expiry time explicitly
    const user = jwt.verify(authToken, process.env.JWT_SECRET as string)

    return user as UserSession
  } catch (err) {
    return null
  }
}
