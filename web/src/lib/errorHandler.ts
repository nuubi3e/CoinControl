import { ActionResponse } from './types/server.types'

export const errorHandler = (err: any) => {
  console.clear()

  // Creating a user friendly error object
  const error: ActionResponse<undefined> = {
    status: 'error',
    statusCode: 500,
    message: 'Something Went Wrong.',
    ok: false,
  }

  // MONGOOSE ERROR
  // handling Validation Error
  if (err?.name === 'ValidationError') {
    error.statusCode = 403 // Forbidden or not allowed error code
    error.status = 'fail'
    error.message = err.message.split(': ').at(-1) as string
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

  return error
}
