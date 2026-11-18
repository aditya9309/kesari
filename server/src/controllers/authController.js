import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

export async function login(req, res) {
  const email = String(req.body.email || '').toLowerCase().trim()
  if (email !== config.admin.email.toLowerCase()) return res.status(401).json({ message: 'Invalid email or password' })
  if (req.body.password !== config.admin.password) return res.status(401).json({ message: 'Invalid email or password' })
  const token = jwt.sign({ name: config.admin.name, email: config.admin.email, role: 'admin' }, config.jwtSecret, { expiresIn: config.jwtExpiresIn })
  res.json({ token, user: { name: config.admin.name, email: config.admin.email } })
}
