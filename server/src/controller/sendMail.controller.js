import { emailConfig } from '../config.js'

export const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body
  try {
    await emailConfig.sendMail({
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      text
    })
    return res.status(200).json({ msg: 'Email enviado correctamente' })
  } catch (error) {
    return res.status(500).send('Hubo un error al enviar el email')
  }
}
