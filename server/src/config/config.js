import dotenv from 'dotenv'
dotenv.config()

function required(name) {
  if (!process.env[name]) throw new Error(`Missing required environment variable: ${name}`)
  return process.env[name]
}

export const config = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: required('MONGODB_URI'),
  jwtSecret: required('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || process.env.CLIENT_URL || 'http://localhost:5173').split(',').map(x => x.trim()).filter(Boolean),
  smtp: {
    host: required('SMTP_HOST'),
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    user: required('SMTP_USER'),
    pass: required('SMTP_PASS'),
    from: process.env.MAIL_FROM || required('SMTP_USER'),
  },
  admin: {
    email: required('ADMIN_EMAIL'),
    password: required('ADMIN_PASSWORD'),
    name: process.env.ADMIN_NAME || 'Administrator',
  },
}
