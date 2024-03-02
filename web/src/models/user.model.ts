import { IUserModel, IUserSchema } from '@/lib/types/models.types'
import { Schema, model, models } from 'mongoose'
import bcrypt from 'bcryptjs'

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
    confirmPassword: {
      type: String,
      required: [
        true,
        'Looks like somebody else trying to taking over your account.',
      ],
    },
    status: {
      type: String,
      enum: ['active', 'registered'],
      default: 'registered',
    },
  },
  { timestamps: true }
)

// Middleware to encrypt password before storing in DB
userSchema.pre('save', async function (next) {
  this.confirmPassword = undefined
  // this middle will always run then this model will be called
  // To avoid calling bcrypt on every save we only call it if password is going to change
  if (!this.isModified('password')) return next()

  const salt = await bcrypt.genSalt(13)
  const encryptedPass = await bcrypt.hash(this.password, salt)

  this.password = encryptedPass

  next()
})

export const UserModel = (models.m_users ||
  model('m_users', userSchema)) as IUserModel
