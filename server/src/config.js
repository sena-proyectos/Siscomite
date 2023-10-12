// Importar el módulo de configuración de variables de entorno
import { config } from 'dotenv'
import nodemailer from 'nodemailer'
import * as Minio from 'minio'

// Cargar las variables de entorno desde un archivo .env
config()

// Definir constantes para las variables de entorno o valores predeterminados
export const PORT = process.env.PORT ?? 3000 // Puerto para el servidor web
export const DB_HOST = process.env.DB_HOST ?? 'localhost' // Host de la base de datos
export const DB_PORT = process.env.DB_PORT ?? 3306 // Puerto de la base de datos
export const DB_USER = process.env.DB_USER ?? 'root' // Usuario de la base de datos
export const DB_PASSWORD = process.env.DB_PASSWORD ?? 'root' // Contraseña de la base de datos
export const DB_DATABASE = process.env.DB_DATABASE ?? 'siscomite' // Nombre de la base de datos
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME ?? '' // Correo electrónico de la cuenta que envía los emails
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD ?? '' // Contraseña del correo electrónico
export const MINIO_ROOT_USER = process.env.MINIO_ROOT_USER ?? '' // Usuario MinIO
export const MINIO_ROOT_PASSWORD = process.env.MINIO_ROOT_PASSWORD ?? '' // Contraseña MinIO

export const emailConfig = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD
  }
})

export const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  accessKey: MINIO_ROOT_USER,
  secretKey: MINIO_ROOT_PASSWORD,
  useSSL: false
})
