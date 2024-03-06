import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { log } from './log'
import { cookies } from 'next/headers'
import { UserSession } from './types/payload.types'

// Class to encrypt and Decrypt Data
export class AES {
  // Secret & key stored on server
  private static key = process.env.AES_SECRET as string
  private static iv = process.env.AES_VECTOR_STRING as string

  constructor() {}

  static encrypt(payload: string) {
    // Creating a cipher to encrypt data using server key and iv (vector string stored on server)
    const cipher = crypto.createCipheriv(
      'aes-256-gcm',
      Buffer.from(AES.key),
      Buffer.from(AES.iv)
    )
    let encryptedData = cipher.update(payload, 'utf-8', 'hex')
    encryptedData += cipher.final('hex')

    return encryptedData
  }

  static decrypt(encryptedData: string) {
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      Buffer.from(AES.key),
      Buffer.from(AES.iv)
    )

    return decipher.update(encryptedData, 'hex', 'utf-8')
  }
}

export const generateOTP = () => {
  const min = 100000 // Minimum value (inclusive)
  const max = 999999 // Maximum value (inclusive)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

export class ServerError extends Error {
  statusCode: number
  status: 'fail' | 'error'

  constructor(message: string, statusCode: number) {
    super(message)

    this.statusCode = statusCode
    this.status = `${statusCode}`[0] === '4' ? 'fail' : 'error'
  }
}

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
