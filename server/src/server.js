import app from './app.js'
import { config } from './config/config.js'
import { connectDatabase } from './config/db.js'

await connectDatabase()
const server = app.listen(config.port, '0.0.0.0', () => {
  console.log(`Server listening on port ${config.port}`)
})

async function shutdown(signal) {
  console.log(`${signal} received, shutting down gracefully`)
  server.close(async () => {
    const { default: mongoose } = await import('mongoose')
    await mongoose.disconnect()
    process.exit(0)
  })
}
process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
