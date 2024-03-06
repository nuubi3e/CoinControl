'use server'
import { connectDB } from '@/lib/db'

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
