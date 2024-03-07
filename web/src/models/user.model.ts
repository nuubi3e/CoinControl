import {
  IUserInstanceMethods,
  IUserModel,
  IUserSchema,
} from '@/lib/types/models.types'
import { Schema, model, models } from 'mongoose'
import bcrypt from 'bcryptjs'
import { AES, generateOTP } from '@/lib/utils/server.utils'
import { EncOTPPayload } from '@/lib/types/server.types'

const userSchema = new Schema<IUserSchema, IUserModel, IUserInstanceMethods>(
  {
    username: {
      type: String,
      required: [true, 'Please provide a unique username'],
      unique: true,
    },
    fullname: {
      type: String,
      required: [true, 'Looks like you forgot to fill in your full name.'],
    },
    emailId: {
      type: String,
      required: [true, 'Please enter your email, we will keep it safe.'],
      unique: true,
    },
    picture: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: [true, 'You must protect your account'],
      minlength: [8, 'Password should contain at least 8 characters'],
    },
    status: {
      type: String,
      enum: ['verified', 'registered'],
      default: 'registered',
    },
    verification: {
      type: {
        count: Number,
        retryTime: Date,
      },
      default: { count: 1 },
    },
  },
  { timestamps: true }
)

// Middleware to encrypt password
userSchema.pre('save', async function (next) {
  // this middleware will always run then this model will be called on save mode
  // To avoid calling bcrypt on every save we only call it when password is going to change.
  if (!this.isModified('password')) return next()

  const salt = await bcrypt.genSalt(13)
  const encryptedPass = await bcrypt.hash(this.password, salt)

  this.password = encryptedPass

  next()
})

userSchema.methods.generateUserOTP = function (expireTimeInMinutes) {
  const otp = generateOTP()
  const expiresIn = new Date().getTime() + expireTimeInMinutes * 60 * 10000
  const encPayload = JSON.stringify({
    id: this._id.toString(),
    otp,
    expireTime: new Date(expiresIn),
  } as EncOTPPayload)
  const key = AES.encrypt(encPayload)

  return { expireTime: new Date(expiresIn), key, otp }
}

export const UserModel = (models.m_users ||
  model('m_users', userSchema)) as IUserModel
