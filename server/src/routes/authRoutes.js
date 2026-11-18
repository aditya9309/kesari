import { Router } from 'express'
import { body } from 'express-validator'
import { login } from '../controllers/authController.js'

const router = Router()
router.post('/login', body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 8 }), login)
export default router
