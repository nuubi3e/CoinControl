import { IUserModel, IUserSchema } from '@/lib/types/models.types'
import { Schema, model, models } from 'mongoose'

const userSchema = new Schema<IUserSchema, IUserModel, {}>(
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
    },
    picture: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: [true, 'You must protect your account'],
      minlength: [
        8,
        'You must protect your account with something non recognizable',
      ],
    },
    confirmPassword: {
      type: String,
      required: [
        true,
        'Looks like somebody else trying to taking over your account.',
      ],
    },
  },
  { timestamps: true }
)

export const UserModel = (models.m_users ||
  model('m_users', userSchema)) as IUserModel
