import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '')
  if (!token) return res.status(401).json({ message: 'Authentication required' })
  try {
    req.user = jwt.verify(token, config.jwtSecret)
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired authentication token' })
  }
}
