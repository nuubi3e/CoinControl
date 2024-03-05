import { Model } from 'mongoose'

export interface IUserSchema {
  picture: string
  username: string
  fullname: string
  emailId: string
  password: string
  status: 'verified' | 'registered'
  verification:
    | {
        count: number
        retryTime: Date
      }
    | undefined
}

export interface IUserInstanceMethods {
  generateUserOTP: (expireTimeMinutes: number) => {
    key: string
    expireTime: Date
    otp: number
  }
}

export type IUserModel = Model<IUserSchema, {}, IUserInstanceMethods>

export interface IOTPSchema {
  key: string
  expireTime: Date
}

export type IOTPModel = Model<IOTPSchema, {}, {}>

export interface IExpenseSchema {
  userId: string
  amount: number
  categoryId: string
  title: string
  description: string
  location: string
}

export type IExpenseModel = Model<IExpenseSchema, {}, {}>

export interface IIncomeModel {
  userId: string
  amount: number
  typeId: string
}

export interface IIncomeTypeModel {
  userId: string
  name: string
}

export interface ICategoriesSchema {
  userId: string
  name: string
  picture: string
  type: 'expense' | 'income'
}

export type ICategoryModel = Model<ICategoriesSchema, {}, {}>

export interface ICreditCardModel {
  userId: string
  fourDigits: number
  billDate: Date
  paymentDate: Date
}
