import mongoose from 'mongoose'

mongoose.set("strictQuery", false)
export const connectDB = async () => {
    mongoose.connect(process.env.DATABASE_URI)
    console.log('Database connected')
}

