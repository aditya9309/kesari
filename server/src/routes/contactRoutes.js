import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { createEnquiry, listEnquiries } from '../controllers/contactController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
const validation = [
  body('name').trim().isLength({ min: 2 }).escape(),
  body('email').trim().isEmail().normalizeEmail(),
  body('phone').trim().matches(/^[0-9+ ()-]{10,15}$/),
  body('company').optional().trim().isLength({ max: 150 }).escape(),
  body('service').trim().notEmpty().escape(),
  body('subject').trim().isLength({ min: 2, max: 180 }).escape(),
  body('message').trim().isLength({ min: 10, max: 3000 }).escape(),
]
router.post('/', validation, (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ message: 'Please check the form fields.', errors: errors.array() })
  next()
}, createEnquiry)

router.get('/', requireAuth, listEnquiries)
export default router
