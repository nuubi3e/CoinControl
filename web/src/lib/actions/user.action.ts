'use server'
import { connectDB } from '@/lib/db'
import { ActionResponse } from '../types/server.types'

export const dummy = async () => {
  console.log('I AM HERE')
  console.clear()
  try {
    const db = await connectDB('dummy')

    console.log('CONNECTION SUCCESS')

    await db.disconnect()
  } catch (err: any) {
    console.error('PRE ERROR: ', err.message)
    // const error = errorHandler(err)
    // console.error('ERROR: ', error)
    // return error
  }
}
