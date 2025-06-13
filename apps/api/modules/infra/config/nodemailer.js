import { createTransport } from 'nodemailer'

export const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'lopez74708332@gmail.com',
    pass: 'mgwf znnp iwlf mwgg',
  },
})

transporter.verify().then(() => {
  console.log('Server is ready to take our messages')
})
