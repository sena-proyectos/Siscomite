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
    return res.status(200).json({ message: 'Email enviado correctamente' })
  } catch (error) {
    console.log(error)
    return res.status(500).send('Hubo un error al enviar el email')
  }
}

export const sendEmailWithAttachment = async (req, res) => {
  const { to, subject, text, html } = req.body
  const file = req.file.buffer // Obtén el archivo adjunto desde la memoria

  try {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      text,
      html,
      attachments: [
        {
          filename: req.file.originalname, // Nombre original del archivo
          content: file // Contenido del archivo desde la memoria
        }
      ]
    }

    await emailConfig.sendMail(mailOptions)
    return res.status(200).json({ message: 'Correo enviado correctamente' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({message : 'Hubo un error al enviar el correo'})
  }
}