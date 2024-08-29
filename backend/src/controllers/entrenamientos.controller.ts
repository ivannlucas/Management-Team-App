import { Request, Response } from 'express';
import db from '../models';
import { uploadFileToS3, deleteFileFromS3 } from '../utils/aws';
import { v4 as uuidv4 } from 'uuid';

/**
 * Crea un nuevo entrenamiento en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el entrenamiento creado o un mensaje de error.
 */
export const createEntrenamiento = async (req: Request, res: Response): Promise<Response> => {
    try {
        const entrenamiento = await db.entrenamientos.create(req.body);
        return res.status(200).json(entrenamiento);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene todos los entrenamientos de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con todos los entrenamientos o un mensaje de error.
 */
export const getAllEntrenamientos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const entrenamientos = await db.entrenamientos.findAll();
        return res.status(200).json(entrenamientos);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene un entrenamiento por su ID.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el entrenamiento encontrado o un mensaje de error.
 */
export const getEntrenamientoById = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
        const entrenamiento = await db.entrenamientos.findByPk(id);
        if (!entrenamiento) {
            return res.status(404).json({ message: 'Entrenamiento no encontrado' });
        }
        return res.status(200).json(entrenamiento);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene todos los entrenamientos asociados a un equipo específico.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con los entrenamientos encontrados o un mensaje de error.
 */
export const getEntrenamientosByEquipoId = async (req: Request, res: Response): Promise<Response> => {
    const { equipoId } = req.params;
    try {
        const entrenamientos = await db.entrenamientos.findAll({
            where: { equipo_id: equipoId }
        });
        return res.status(200).json(entrenamientos);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Actualiza un entrenamiento en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el entrenamiento actualizado o un mensaje de error.
 */
export const updateEntrenamiento = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
        const updated = await db.entrenamientos.update(req.body, { where: { id: id } });
        if (updated) {
            const updatedEntrenamiento = await db.entrenamientos.findByPk(id);
            return res.status(200).json(updatedEntrenamiento);
        }
        throw new Error('Entrenamiento no encontrado');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Elimina un entrenamiento y sus imágenes asociadas de la base de datos y de S3.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Respuesta de éxito o un mensaje de error.
 */
export const deleteEntrenamiento = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const entrenamiento = await db.entrenamientos.findByPk(id);

        if (!entrenamiento) {
            return res.status(404).json({ message: 'Entrenamiento no encontrado' });
        }

        // Eliminar imágenes asociadas
        const exercises = entrenamiento.exercises;
        for (const exercise of exercises) {
            if (exercise.image_id) {
                const bucketName = 'awsbucketmanagement';
                const fileName = exercise.image_id.replace(`https://${bucketName}.s3.eu-north-1.amazonaws.com/uploads/exercises/`, '');
                const folderPath = 'uploads/exercises';

                await deleteFileFromS3(fileName, bucketName, folderPath);
            }
        }

        // Eliminar el entrenamiento
        await db.entrenamientos.destroy({ where: { id: id } });

        return res.status(204).send(); // No Content
    } catch (error: any) {
        console.error('Error al eliminar el entrenamiento: ', error);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Sube una imagen de ejercicio a S3 y guarda la URL.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con la URL de la imagen subida o un mensaje de error.
 */
export const uploadExerciseImage = async (req: Request, res: Response): Promise<Response> => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file provided' });
        }

        const fileBuffer = req.file.buffer;
        const originalFileName = req.file.originalname;
        const fileExtension = originalFileName.split('.').pop(); // Obtener la extensión del archivo
        const uniqueFileName = `${uuidv4()}.${fileExtension}`; // Generar un nombre de archivo único
        console.log("UniqueFileName: ", uniqueFileName);
        const bucketName = 'awsbucketmanagement';
        const folderPath = 'uploads/exercises';

        const s3Response = await uploadFileToS3(fileBuffer, uniqueFileName, bucketName, folderPath);
        const imageUrl = s3Response.Location; // Obtener la URL de la imagen subida

        return res.status(200).json({ imageUrl });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Elimina una imagen de ejercicio específica de la base de datos y de S3.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Respuesta de éxito o un mensaje de error.
 */
export const deleteExerciseImage = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { exerciseIndex } = req.body;  // Índice del ejercicio dentro del array

    if (!id || exerciseIndex === undefined) {
        return res.status(400).json({ message: 'No id or exercise index provided' });
    }

    try {
        const entrenamiento = await db.entrenamientos.findByPk(id);

        if (!entrenamiento) {
            return res.status(404).json({ message: 'Entrenamiento no encontrado' });
        }

        const exercises = entrenamiento.exercises;

        // Verificar que el índice sea válido
        if (exerciseIndex < 0 || exerciseIndex >= exercises.length) {
            return res.status(400).json({ message: 'Índice de ejercicio inválido' });
        }

        const image_id = exercises[exerciseIndex].image_id;

        if (image_id) {
            const bucketName = 'awsbucketmanagement';
            const fileName = image_id.replace(`https://${bucketName}.s3.eu-north-1.amazonaws.com/uploads/exercises/`, '');
            const folderPath = 'uploads/exercises';

            await deleteFileFromS3(fileName, bucketName, folderPath);

            // Eliminar la referencia a la imagen en el ejercicio específico
            exercises[exerciseIndex].image_id = null;

            // Guardar los cambios en la base de datos
            await db.entrenamientos.update(
                { exercises },
                { where: { id: id } }
            );

            return res.status(200).json({ message: 'Imagen eliminada con éxito' });
        } else {
            return res.status(400).json({ message: 'No se encontró imagen para eliminar' });
        }
    } catch (error: any) {
        console.error('Error al eliminar la imagen: ', error);
        return res.status(500).json({ message: error.message });
    }
};
