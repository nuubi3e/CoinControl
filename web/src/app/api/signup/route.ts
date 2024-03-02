import { connectDB } from '@/lib/db'
import { errorHandler } from '@/lib/errorHandler'
import { UserModel } from '@/models/user.model'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    const db = await connectDB(
      'dummy',
      'mongodb+srv://nuubi3e:6lJrQhQ3ryRUwlwr@cluster0.jyzo3h4.mongodb.net/?retryWrites=true&w=majority'
    )
    console.clear()

    const body = await req.json()
    console.log(body)

    const user = new UserModel({ ...body })

    await user.save()

    console.log(user)

    await db.disconnect()
    return NextResponse.json({ message: 'OTP SENT' }, { status: 201 })
  } catch (err: any) {
    const error = errorHandler(err)

    return NextResponse.json(error, { status: error.statusCode })
  }
}
