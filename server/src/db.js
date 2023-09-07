// Importar la función createPool de mysql2/promise para crear una piscina de conexiones
import { createPool } from 'mysql2/promise';

// Importar las configuraciones de la base de datos desde config.js
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from './config.js';

// Crear una piscina de conexiones a la base de datos utilizando la configuración
export const pool = createPool({
  host: DB_HOST, // Host de la base de datos
  user: DB_USER, // Usuario de la base de datos
  password: DB_PASSWORD, // Contraseña de la base de datos
  port: DB_PORT, // Puerto de la base de datos
  database: DB_DATABASE, // Nombre de la base de datos
});
