import { ICategoriesSchema, ICategoryModel } from '@/lib/types/models.types'
import { Schema, model, models } from 'mongoose'

const categorySchema = new Schema<ICategoriesSchema, ICategoryModel>(
  {
    name: {
      type: String,
      required: [true, ''],
    },
    picture: {
      type: String,
      default: '',
    },
    userId: {
      type: String,
      required: [true, 'UserId is required'],
    },
  },
  { timestamps: true }
)

export const CategoryModel = (models.m_categories ||
  model('m_categories', categorySchema)) as ICategoryModel
