
import mongoose from 'mongoose'
import { config } from './config.js'

let cached = globalThis.mongoose

if (!cached) {
  cached = globalThis.mongoose = {
    conn: null,
    promise: null
  }
}

export async function connectDatabase() {
  mongoose.set('strictQuery', true)

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(config.mongoUri)
      .then((mongooseInstance) => mongooseInstance)
      .catch((error) => {
        cached.promise = null
        throw error
      })
  }

  cached.conn = await cached.promise

  console.log('MongoDB connected')

  return cached.conn
}
