// Importar el módulo de configuración de variables de entorno
import { config } from 'dotenv';

// Cargar las variables de entorno desde un archivo .env
config();

// Definir constantes para las variables de entorno o valores predeterminados
export const PORT = process.env.PORT ?? 3000; // Puerto para el servidor web
export const DB_HOST = process.env.DB_HOST ?? 'localhost'; // Host de la base de datos
export const DB_PORT = process.env.DB_PORT ?? 3306; // Puerto de la base de datos
export const DB_USER = process.env.DB_USER ?? 'root'; // Usuario de la base de datos
export const DB_PASSWORD = process.env.DB_PASSWORD ?? 'root'; // Contraseña de la base de datos
export const DB_DATABASE = process.env.DB_DATABASE ?? 'siscomite'; // Nombre de la base de datos
