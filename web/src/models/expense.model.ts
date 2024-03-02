import { IExpenseModel, IExpenseSchema } from '@/lib/types/models.types'
import { Schema, model, models } from 'mongoose'

const expenseSchema = new Schema<IExpenseSchema, IExpenseModel>(
  {
    amount: {
      type: Number,
      required: [true, 'Please teach us creating expenses without money😉'],
    },
    categoryId: {
      type: String,
      required: [true, 'Categorizing your expenses is a good practice😀'],
    },
    description: {
      type: String,
      required: [true, 'Providing description will help you in long run'],
    },
    title: {
      type: String,
      required: [true, 'This will help you memorizing your expenses💡'],
    },
    userId: {
      type: String,
      required: [true, 'UserId is required'],
    },
    location: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

export const ExpenseModel = (models.expenses ||
  model('expenses', expenseSchema)) as IExpenseModel
