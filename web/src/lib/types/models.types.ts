import { Model } from 'mongoose'

export interface IUserSchema {
  picture: string
  username: string
  fullname: string
  emailId: string
  password: string
  confirmPassword: string
  status: 'active' | 'registered'
}

export type IUserModel = Model<IUserSchema, {}, {}>

export interface IOTPSchema {
  userId: string
  expireTime: Date
  otp: number
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
}

export type ICategoryModel = Model<ICategoriesSchema, {}, {}>

export interface ICreditCardModel {
  userId: string
  fourDigits: number
  billDate: Date
  paymentDate: Date
}
