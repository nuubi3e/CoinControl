// 'use server'

// import { ExpenseModel } from '@/models/expense.model'
// import { connectDB } from '../db'
// import { IExpense } from '../types/actions.types'
// import { ActionResponse } from '../types/server.types'

// export const newExpense = async (expense: IExpense) => {
//   console.clear()
//   let db
//   try {
//     db = await connectDB(
//       'dummy',
//       'mongodb+srv://nuubi3e:6lJrQhQ3ryRUwlwr@cluster0.jyzo3h4.mongodb.net/?retryWrites=true&w=majority'
//     )
//     console.log(expense)
//     const newExpense = await ExpenseModel.create({ ...expense, userId: '23' })

//     return {
//       status: 'success',
//       statusCode: 201,
//       data: JSON.stringify(newExpense.toObject()),
//       ok: true,
//       message: 'Expense Added Successfully',
//     } as ActionResponse<string>
//   } catch (err) {
//     const convertedError = errorHandler(err)
//     return convertedError
//   } finally {
//     await db?.disconnect()
//   }
// }

// export const removeExpense = async (id: string) => {
//   let db
//   try {
//     db = await connectDB(
//       'dummy',
//       'mongodb+srv://nuubi3e:6lJrQhQ3ryRUwlwr@cluster0.jyzo3h4.mongodb.net/?retryWrites=true&w=majority'
//     )

//     await ExpenseModel.deleteOne({})

//     return {
//       message: 'Expense Deleted Successfully',
//       ok: true,
//       status: 'success',
//       statusCode: 200,
//     } as ActionResponse<undefined>
//   } catch (err) {
//     return errorHandler(err)
//   } finally {
//     await db?.disconnect()
//   }
// }
