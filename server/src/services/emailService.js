import nodemailer from 'nodemailer'
import { config } from '../config/config.js'

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: { user: config.smtp.user, pass: config.smtp.pass },
})

export async function sendEnquiryEmails(enquiry) {
  await transporter.verify()
  await transporter.sendMail({
    from: config.smtp.from,
    to: config.admin.email,
    replyTo: enquiry.email,
    subject: `New enquiry: ${enquiry.subject}`,
    text: `Name: ${enquiry.name}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone}\nCompany: ${enquiry.company || '-'}\nService: ${enquiry.service}\n\n${enquiry.message}`,
  })
  await transporter.sendMail({
    from: config.smtp.from,
    to: enquiry.email,
    subject: 'We received your enquiry',
    text: `Dear ${enquiry.name},\n\nThank you for contacting Kesari & Associates. We have received your enquiry and will respond shortly.\n\nRegards,\nKesari & Associates`,
  })
}
