import { Request, Response } from 'express';
import db from '../models';

/**
 * Crea un nuevo entrenador en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el entrenador creado o un mensaje de error.
 */
export const createEntrenador = async (req: Request, res: Response): Promise<Response> => {
    try {
        const entrenador = await db.entrenadores.create(req.body);
        return res.status(200).json(entrenador);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene todos los entrenadores de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con todos los entrenadores o un mensaje de error.
 */
export const getAllEntrenadores = async (req: Request, res: Response): Promise<Response> => {
    try {
        const entrenadores = await db.entrenadores.findAll();
        return res.status(200).json(entrenadores);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene un entrenador por su ID.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el entrenador encontrado o un mensaje de error.
 */
export const getEntrenadorById = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No se proporcionó identificación' });
        
    }

    try {
        const entrenador = await db.entrenadores.findByPk(id);
        if (!entrenador) {
            return res.status(404).json({ message: 'Entrenador no encontrado' });
        }
        return res.status(200).json(entrenador);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Actualiza un entrenador en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el entrenador actualizado o un mensaje de error.
 */
export const updateEntrenador = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No se proporcionó identificación' });
        
    }

    try {
        const updated = await db.entrenadores.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedEntrenador = await db.entrenadores.findByPk(id);
            return res.status(200).json(updatedEntrenador);
        }
        throw new Error('Entrenador no encontrado');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Actualiza los detalles de un entrenador en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con los detalles del entrenador actualizados o un mensaje de error.
 */
export const updateEntrenadorDetalles = async (req: Request, res: Response): Promise<Response> => {
    const usuario_id = req.params.id;
    if (!usuario_id) {
        return res.status(400).send({ message: 'No se proporcionó usuario ID' });
        
    }

    const { edad, anios_experiencia } = req.body;

    try {
        const updated = await db.entrenadores.update(
            { edad, anios_experiencia },
            { where: { usuario_id: usuario_id } }
        );

        if (updated) {
            const updatedEntrenador = await db.entrenadores.findOne({ where: { usuario_id: usuario_id } });
            return res.status(200).json(updatedEntrenador);
        }
        throw new Error('Entrenador no encontrado');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Elimina un entrenador de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Respuesta de éxito o un mensaje de error.
 */
export const deleteEntrenador = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No se proporcionó identificación' });
        
    }

    try {
        const deleted = await db.entrenadores.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send(); // 204 No Content
        }
        throw new Error('Entrenador no encontrado');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};
