import mongoose from 'mongoose'

type DBconnect = (dbName?: string, uri?: string) => Promise<typeof mongoose>

// Function to connect to mongodb DB
export const connectDB: DBconnect = async (dbName, uri) => {
  try {
    const mongoURI = uri || process.env.MONGO_URI

    if (!mongoURI)
      throw new Error('Please Provide a mongodb connection string.')

    const db = await mongoose.connect(mongoURI, { dbName: dbName || 'dummy' })

    return db
  } catch (err: any) {
    throw new Error(err.message)
  }
}
