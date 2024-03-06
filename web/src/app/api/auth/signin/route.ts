import { log } from '@/lib/log'
import { Response } from '@/lib/response'
import { ServerError } from '@/lib/util.server'
import { UserModel } from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserSession } from '@/lib/types/payload.types'
import { connectDB } from '@/lib/db'

const SESSION_EXPIRES_DAYS = 25

export const POST = async (req: NextRequest) => {
  try {
    const db = await connectDB(
      'dummy',
      'mongodb+srv://nuubi3e:6lJrQhQ3ryRUwlwr@cluster0.jyzo3h4.mongodb.net/?retryWrites=true&w=majority'
    )
    const body = (await req.json()) as { username: string; password: string }

    log(body)

    if (!body?.username) throw new ServerError('Invalid Request', 400)

    const user = await UserModel.findOne({
      $or: [{ username: body.username }, { emailId: body.username }],
    })

    if (!user) throw new ServerError('No User Found', 404)

    // checking pass
    const passIsCorrect = await bcrypt.compare(body.password, user.password)

    if (!passIsCorrect)
      throw new ServerError('Incorrect Username or password', 400)

    const userPayload: UserSession = {
      email: user.emailId,
      id: user._id.toString(),
      name: user.fullname,
      username: user.username,
      picture: user.picture,
    }

    // encrypting user info using jwt
    const authToken = jwt.sign(userPayload, process.env.JWT_SECRET as string, {
      expiresIn: `${SESSION_EXPIRES_DAYS}s`,
    })

    const responseObj = Response.success({
      data: undefined,
      message: 'Login Successful',
      statusCode: 200,
    })
    const response = NextResponse.json(responseObj, { status: 200 })

    // generating expiry time.
    const curDate = Date.now() // this will return cur time in milliseconds
    const expireTimeInMilliseconds = SESSION_EXPIRES_DAYS * 24 * 60 * 60 * 1000
    const expiresIn = new Date(curDate + expireTimeInMilliseconds)
    // Storing JWT in http-only cookie
    response.cookies.set('auth-token', authToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      expires: expiresIn,
    })

    await db.disconnect()
    return response
  } catch (err) {
    const error = Response.error(err)
    return NextResponse.json(error, { status: error.statusCode })
  }
}
