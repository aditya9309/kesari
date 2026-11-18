import Enquiry from '../models/Enquiry.js'
import { sendEnquiryEmails } from '../services/emailService.js'

const recentSubmissions = new Map()

export async function createEnquiry(req, res, next) {
  try {
    const ip = req.ip || 'unknown'
    const key = `${ip}:${req.body.email?.toLowerCase()}`
    const previous = recentSubmissions.get(key)
    if (previous && Date.now() - previous < 60000) {
      return res.status(429).json({ message: 'Please wait before submitting another enquiry.' })
    }
    const enquiry = await Enquiry.create({ ...req.body, ipAddress: ip })
    try {
      await sendEnquiryEmails(enquiry)
    } catch (error) {
      await Enquiry.findByIdAndDelete(enquiry._id)
      return res.status(502).json({ message: 'Unable to deliver your enquiry. Please try again later or contact us by phone.' })
    }
    recentSubmissions.set(key, Date.now())
    res.status(201).json({ message: 'Thank you. Your enquiry has been sent successfully.' })
  } catch (error) {
    next(error)
  }
}

export async function listEnquiries(req, res, next) {
  try {
    const items = await Enquiry.find().sort({ createdAt: -1 }).select('-ipAddress')
    res.json({ items })
  } catch (error) {
    next(error)
  }
}
