import { Request, Response } from 'express';
import db from '../models';

/**
 * Crea nuevas estadísticas de partido en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con las estadísticas creadas o un mensaje de error.
 */
export const createEstadisticasPartido = async (req: Request, res: Response): Promise<Response> => {
    try {
        const estadisticasPartido = await db.estadisticasPartidos.create(req.body);
        return res.status(200).json(estadisticasPartido);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene todas las estadísticas de partidos de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con todas las estadísticas o un mensaje de error.
 */
export const getAllEstadisticasPartidos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const estadisticasPartidos = await db.estadisticasPartidos.findAll();
        return res.status(200).json(estadisticasPartidos);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene las estadísticas de un partido por su ID.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con las estadísticas del partido encontradas o un mensaje de error.
 */
export const getEstadisticasPartidoById = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
        const estadisticasPartido = await db.estadisticasPartidos.findByPk(id);
        if (!estadisticasPartido) {
            return res.status(404).json({ message: 'Estadisticas Partido not found' });
        }
        return res.status(200).json(estadisticasPartido);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Actualiza las estadísticas de un partido en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con las estadísticas del partido actualizadas o un mensaje de error.
 */
export const updateEstadisticasPartido = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    console.log("ID EN UPDATE: ", id);
    console.log("BODY EN UPDATE: ", req.body);
    try {
        const updated = await db.estadisticasPartidos.update(req.body, { where: { id: id } });
        if (updated) {
            const updatedEstadisticasPartido = await db.estadisticasPartidos.findByPk(id);
            return res.status(200).json(updatedEstadisticasPartido);
        }
        throw new Error('Estadisticas Partido not found');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Elimina las estadísticas de un partido de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Respuesta de éxito o un mensaje de error.
 */
export const deleteEstadisticasPartido = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
        const deleted = await db.estadisticasPartidos.destroy({ where: { id: id } });
        if (deleted) {
            return res.status(204).send(); // No Content
        }
        throw new Error('Estadisticas Partido not found');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};
