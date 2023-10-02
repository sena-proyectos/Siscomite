import { emailSchema } from '../schemas/email.schema.js'

export const checkEmail = (req, res, next) => {
  const { to, subject } = req.body
  try {
    const { error } = emailSchema.validate({ to, title: subject })
    if (error !== undefined) return res.status(500).send({ message: 'Debes llenar todos los campos' })
    next()
  } catch (error) {
    res.status(500).send(error.message)
  }
}
