import { log } from './log'
import { ActionResponse } from '../types/server.types'

export class Response {
  constructor() {}

  static success(obj: { message: string; data: any; statusCode: number }) {
    const res = {
      ...obj,
      status: 'success',
      ok: true,
    }

    return res
  }

  static error(err: any) {
    console.clear()
    log(err.name)
    log('BEF ERROR: ', err)
    // Creating a user friendly error object
    const error: ActionResponse<undefined> = {
      status: err?.status || 'error',
      statusCode: err?.statusCode || 500,
      message: err?.message || 'Unhandled Server Error',
      ok: false,
    }

    // MONGOOSE ERROR

    // handling Validation Error
    if (err?.name === 'ValidationError') {
      error.statusCode = 403 // Forbidden or not allowed error code
      error.status = 'fail'
      error.message = err.message.split(': ').at(-1) as string
    }

    // handling Token Error
    if (err?.name === 'JsonWebTokenError') {
      error.statusCode = 401 // Un Authorized
      error.status = 'fail'
      error.message = err.message
    }

    // handling Wrong ID Error
    if (err?.name === 'CastError') {
      error.statusCode = 404 // NOT FOUND ERROR CODE
      error.status = 'fail'
      error.message = `Invalid ${err.path}: ${err.value}`
    }

    // handling duplicate value error
    if (err?.code === 11000) {
      const value = err.keyValue

      const message = `${Object.keys(value)}: ${
        value[Object.keys(value)[0]]
      } already exists`

      error.statusCode = 400 //Bad request error code for duplicate value
      error.status = 'fail'
      error.message = message
    }

    log('SERVER ERROR: ', error)

    return error
  }
}
