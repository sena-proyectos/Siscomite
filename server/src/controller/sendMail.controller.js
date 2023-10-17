import { emailConfig } from '../config.js'

export const sendEmail = async (req, res) => {
  const { to, subject } = req.body
  try {
    await emailConfig.sendMail({
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      html: `<html><head><style>body{font-family:Arial,sans-serif;}.container{max-width:600px;margin:0 auto;padding:20px;}.header{background-color:#3498db;color:#fff; border-radius: 1rem ;text-align:center;padding:20px;}.content{padding:20px;}.footer{background-color:#f2f2f2;text-align:center;padding:10px;}</style></head><body><div class="container"><div class="header"><h1>¡Cordial saludo!</h1><p>Novedad en las solicitudes a comité.</p></div><div class="content"><p>Tienes un mensaje nuevo en tu bandeja de notificaciones de Siscomité. Te recomendamos revisarlo para mantenerte informado sobre las últimas novedades en las solicitudes.</p></div><div class="footer"><p>Gracias por leer este correo electrónico.</p></div></div></body></html>`
    })
    return res.status(200).json({ message: 'Correo enviado correctamente' })
  } catch (error) {
    return res.status(500).send('Hubo un error al enviar el email')
  }
}

export const sendEmailWithAttachment = async (req, res) => {
  try {
    const { to, subject, text, html } = req.body
    const file = req.file.buffer // Obtén el archivo adjunto desde la memoria

    if (!req.file.buffer) {
      return res.status(200).json({ message: 'No se ha adjuntado ningún archivo' })
    } else {
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
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Hubo un error al enviar el correo' })
  }
}
