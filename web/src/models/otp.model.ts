import { IOTPModel, IOTPSchema } from '@/lib/types/models.types'
import { Schema, model, models } from 'mongoose'

const otpSchema = new Schema<IOTPSchema, IOTPModel>({
  expireTime: {
    type: Date,
  },
  key: {
    type: String,
    required: [true, 'UserId is required'],
  },
})

export const OTPModel = (models.m_otps ||
  model('m_otps', otpSchema)) as IOTPModel
