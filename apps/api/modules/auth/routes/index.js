import { Router } from 'express'
import { AuthError } from '../errors/auth-error.js'
import { login } from '../services/login.js'
import { register } from '../services/register.js'
import { transporter } from '../../infra/config/nodemailer.js'
import { hash } from 'bcrypt'
import { resetPassword } from '../services/reset-password.js'
import AdminModel from '../models/admin.js'

export const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const token = await login(email, password)
    res.status(200).json({ token })
  } catch (error) {
    if (error instanceof AuthError) {
      AuthError.handle(res, error)
    } else {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
})

router.get('/send-code', async (req, res) => {
  const { email } = req.query

  // Verificar si el email no existe en la base de datos
  const user = await AdminModel.findOne({ email })
  if (!user) {
    return res.status(400).json({ message: 'Email no encontrado' })
  }
  // generar codigo de verificacion de 4 digitos
  const code = Math.floor(1000 + Math.random() * 9000).toString()
  transporter.sendMail({
    from: '"School Dashboard" <lopez74708332@gmail.com>',
    to: email,
    subject: 'Verify your email',
    html: `<div style="width:100%;background-color:#231F20;padding-bottom:10px">
  <h1 style="margin:0px auto;color:#fff;text-align:center;margin-bottom:10;">Sistema Estudiantil Security</h1> 
  <h2 style="font-size:30px;color:#fff;font-weight:bold;margin:0px auto;text-align: center;">Codigo de verificación</h2>
  <h2 style="font-size:20px;font-weight:bold;margin:0px auto;text-align: center;color:#fff;">Código: <span style="color:#00ccff;">1292</span></h2>
  <p style="font-size:16px;font-weight:bold;text-align: center;color:#fff;">Si no recibiste este mensaje, verifica tu bandeja de spam.</p>

</div>`,
  })
  res.status(200).json({ message: 'Verificación enviada', code })
})

router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body
  const passwordHash = await hash(newPassword, 10)
  try {
    await resetPassword({ email, passwordHash })
    res.status(200).json({ message: 'Contraseña actualizada' })
  } catch (error) {
    if (error instanceof AuthError) {
      AuthError.handle(res, error)
    } else {
      res.status(500).json({ message: error.message })
    }
  }
})

router.post('/register', async (req, res) => {
  const { email, password, name, lastname } = req.body
  try {
    const token = await register({ email, password, name, lastname })
    res.status(200).json({ token })
  } catch (error) {
    if (error instanceof AuthError) {
      AuthError.handle(res, error)
    } else {
      res.status(500).json({ message: error.message })
    }
  }
})

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
  res.status(200).json({ message: 'Logged out successfully' })
})
