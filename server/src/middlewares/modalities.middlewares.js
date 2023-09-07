// Importar el esquema de validación createModalities
import { createModalities } from '../schemas/modalities.schema.js';

// Middleware para verificar y validar los datos de una modalidad antes de crearla
export const createDataModalities = (req, res, next) => {
    // Extraer el nombre de la modalidad del cuerpo de la solicitud
    const { nombre_modalidad } = req.body;
    
    try {
        // Validar los datos de la modalidad utilizando el esquema de validación 'createModalities'
        const { error } = createModalities.validate({ nombre_modalidad });
        
        // Comprobar si hay un error de validación
        if (error !== undefined) {
            return res.status(400).json({ message: 'Los datos de la modalidad no son válidos, verifícalos.' });
        }
        
        // Si los datos de la modalidad son válidos, se permite que la solicitud continúe al siguiente middleware o controlador
        next();
    } catch (error) {
        // En caso de error, se envía una respuesta de error interno del servidor (500) con un mensaje genérico de error
        return res.status(500).json({ message: 'Error inesperado' });
    }
};
