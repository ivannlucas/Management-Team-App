import { Request, Response } from 'express';
import db from '../models';

/**
 * Crea un nuevo partido en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el partido creado o un mensaje de error.
 */
export const createPartido = async (req: Request, res: Response): Promise<Response> => {
    try {
        const partido = await db.partidos.create(req.body);
        return res.status(200).json(partido);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene todos los partidos de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con todos los partidos o un mensaje de error.
 */
export const getAllPartidos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const partidos = await db.partidos.findAll();
        return res.status(200).json(partidos);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene un partido por su ID.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el partido encontrado o un mensaje de error.
 */
export const getPartidoById = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
        const partido = await db.partidos.findByPk(id);
        if (!partido) {
            return res.status(404).json({ message: 'Partido no encontrado' });
        }
        return res.status(200).json(partido);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Actualiza un partido en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el partido actualizado o un mensaje de error.
 */
export const updatePartido = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
        const updated = await db.partidos.update(req.body, { where: { id } });
        if (updated) {
            const updatedPartido = await db.partidos.findByPk(id);
            return res.status(200).json(updatedPartido);
        }
        throw new Error('Partido no encontrado');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Elimina un partido de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Respuesta de éxito o un mensaje de error.
 */
export const deletePartido = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
        const deleted = await db.partidos.destroy({ where: { id } });
        if (deleted) {
            return res.status(204).send(); // No Content
        }
        throw new Error('Partido no encontrado');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};
