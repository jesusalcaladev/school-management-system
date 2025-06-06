import mongoose from 'mongoose'

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      autoIndex: true,
    })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}
