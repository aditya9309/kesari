import mongoose from 'mongoose'

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  company: { type: String, trim: true, default: '' },
  service: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  ipAddress: String,
}, { timestamps: true })

export default mongoose.model('Enquiry', enquirySchema)
