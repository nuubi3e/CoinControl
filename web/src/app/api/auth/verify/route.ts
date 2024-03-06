import { Response } from '@/lib/response'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { ServerError } from '@/lib/util.server'
import { cookies } from 'next/headers'

export const GET = () => {
  try {
    const cookie = cookies()
    const authToken = cookie.get('auth-token')?.value

    if (!authToken) throw new ServerError('Invalid Request', 401)

    jwt.verify(authToken, process.env.JWT_SECRET as string)

    return NextResponse.json(
      Response.success({
        data: undefined,
        message: 'verified',
        statusCode: 200,
      }),
      { status: 200 }
    )
  } catch (err) {
    const error = Response.error(err)
    return NextResponse.json(error, { status: error.statusCode })
  }
}
