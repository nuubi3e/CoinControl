import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  console.clear()
  const body = await req.json()

  console.log(body)

  if (!body?.username)
    return NextResponse.json({ message: 'invalid request' }, { status: 404 })

  const res = NextResponse.json({ messgae: 'login Success' }, { status: 200 })
  const currentDate = new Date()

  // Define the number of milliseconds for the future date (in this case, 1 day ahead)
  const oneDayInMilliseconds = 1 * 60 * 60 * 1000 // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

  // Calculate the future date
  const futureDate = new Date(currentDate.getTime() + oneDayInMilliseconds)

  res.cookies.set('token', 'yes', { httpOnly: true, expires: futureDate })

  return res
}
