import { Request, Response } from 'express';
import db from '../models';

/**
 * Crea una nueva estadística en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con la estadística creada o un mensaje de error.
 */
export const createEstadistica = async (req: Request, res: Response): Promise<Response> => {
    try {
        const estadistica = await db.estadisticas.create(req.body);
        return res.status(200).json(estadistica);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene todas las estadísticas de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con todas las estadísticas o un mensaje de error.
 */
export const getAllEstadisticas = async (req: Request, res: Response): Promise<Response> => {
    try {
        const estadisticas = await db.estadisticas.findAll();
        return res.status(200).json(estadisticas);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene una estadística por su ID.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con la estadística encontrada o un mensaje de error.
 */
export const getEstadisticaById = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No id provided' });
    }

    try {
        const estadistica = await db.estadisticas.findByPk(id);
        if (!estadistica) {
            return res.status(404).json({ message: 'Estadistica not found' });
        }
        return res.status(200).json(estadistica);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Actualiza una estadística en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con la estadística actualizada o un mensaje de error.
 */
export const updateEstadistica = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No id provided' });
    }

    try {
        const updated = await db.estadisticas.update(req.body, { where: { id: id } });
        if (updated) {
            const updatedEstadistica = await db.estadisticas.findByPk(id);
            return res.status(200).json(updatedEstadistica);
        }
        throw new Error('Estadistica not found');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Elimina una estadística de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Respuesta de éxito o un mensaje de error.
 */
export const deleteEstadistica = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No id provided' });
    }

    try {
        const deleted = await db.estadisticas.destroy({ where: { id: id } });
        if (deleted) {
            return res.status(204).send(); // No Content
        }
        throw new Error('Estadistica not found');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};
