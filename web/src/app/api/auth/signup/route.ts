import { connectDB } from '@/lib/db'
import { Response } from '@/lib/response'
import { INewUserPayload } from '@/lib/types/payload.types'
import { EncOTPPayload } from '@/lib/types/server.types'
import { AES, ServerError } from '@/lib/util.server'
import { UserModel } from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const BRAND_NAME = 'CoinControl'

// POST Method to register new user.
export const POST = async (req: NextRequest) => {
  try {
    const db = await connectDB(
      'dummy',
      'mongodb+srv://nuubi3e:6lJrQhQ3ryRUwlwr@cluster0.jyzo3h4.mongodb.net/?retryWrites=true&w=majority'
    )

    const body = (await req.json()) as INewUserPayload

    let user

    // Checking is user already registered
    user = await UserModel.findOne({
      $or: [{ username: body.username }, { emailId: body.emailId }],
    })

    if (user) {
      // If user exists and verified then throw error
      if (user?.status === 'verified')
        throw new ServerError('User Already Exists', 409)

      // If user is not verified then update the data coming from frontend and generate OTP
      user.username = body.username
      user.emailId = body.emailId
      user.password = body.password
      user.fullname = body.fullname

      user.verification!.count += 1

      await user.save()

      // if user register count is equal or greater than 4 then we add cooldowntime
      if (user.verification!.count >= 6) {
        // checking if cooldown time has expired or not
        const curTime = new Date().getTime()
        const retryTime = user.verification?.retryTime
          ? new Date(user.verification.retryTime).getTime()
          : null

        // checking if there is any retryTime if yes then if it passed or not.
        if (retryTime && retryTime <= curTime) {
          user.verification!.count = 1

          await user.save()
        }
        // if there is no retry time then we add one
        else {
          const coolDownTime = new Date().getTime() + 24 * 60 * 60 * 1000 // seting cooldown time to 24 hours
          user.verification!.retryTime = new Date(coolDownTime)

          await user.save()
          throw new ServerError(
            'You have exceeded the registeration limit please try again after 24 hours',
            400
          )
        }
      }
    }
    // If user not exists then create a new user
    else {
      // Saving User Details
      user = new UserModel({
        ...body,
        verification: {
          count: 1,
        },
      })

      await user.save()
    }

    // Now Generating a Key and OTP for user verification
    const expireInTime = 5 // OTP Expires in 5 minutes
    const OTP = user!.generateUserOTP(expireInTime)

    // Sending OTP on Mail using nodemailer
    const mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_ACC as string,
        pass: process.env.GMAIL_APP_PASSWORD as string,
      },
    })

    const mailOptions = {
      from: {
        name: BRAND_NAME,
        address: process.env.GMAIL_ACC as string,
      },
      to: body.emailId,
      subject: BRAND_NAME + ' Registration',
      text: `OTP is ${OTP.otp}`,
      html: `<h1>OTP is ${OTP.otp}</h1>`,
    }

    await mailTransporter.sendMail(mailOptions)
    // ........

    // Disconnecting db
    await db.disconnect()
    const response = Response.success({
      data: {
        key: OTP.key,
        time: `Only Valid for ${expireInTime} minutes`,
      },
      message: 'OTP Sent successfully',
      statusCode: 201,
    })

    return NextResponse.json(response, { status: 201 })
  } catch (err: any) {
    const error = Response.error(err)

    return NextResponse.json(error, { status: error.statusCode })
  }
}

// PUT method for OTP verification
export const PUT = async (req: NextRequest) => {
  try {
    const db = await connectDB(
      'dummy',
      'mongodb+srv://nuubi3e:6lJrQhQ3ryRUwlwr@cluster0.jyzo3h4.mongodb.net/?retryWrites=true&w=majority'
    )

    const key = req.headers.get('authorization')

    // checking key
    if (!key) throw new ServerError('You are not authorized', 400)

    const body = (await req.json()) as { otp: number }

    // checking OTP
    if (!body?.otp) throw new ServerError('Please provide an OTP.', 404)

    // if decryption failed then we can't able to parse the data and throws an error
    const decOTP = JSON.parse(AES.decrypt(key)) as EncOTPPayload

    // checking OTP
    if (decOTP.otp !== body.otp)
      throw new ServerError('Invalid OTP, Please try again', 404)

    // checking expiry time
    const curTime = new Date().getTime()
    const expiryTime = new Date(decOTP.expireTime).getTime()

    if (curTime >= expiryTime)
      throw new ServerError('OTP Expired, Please try again', 404)

    // updating user status & removing verfication field on successfully vertification
    await UserModel.updateOne(
      { _id: decOTP.id },
      { $set: { status: 'verified' }, $unset: { verification: 1 } }
    )

    // Disconnecting db
    await db.disconnect()

    const response = Response.success({
      message: 'User Registered Successfully',
      statusCode: 201,
      data: undefined,
    })
    return NextResponse.json(response, { status: 200 })
  } catch (err: any) {
    let error = Response.error(err)

    // handling decryption failed
    if (err.message.includes('JSON'))
      error = Response.error(new ServerError('You are not authorized', 400))

    return NextResponse.json(error, { status: error.statusCode })
  }
}
