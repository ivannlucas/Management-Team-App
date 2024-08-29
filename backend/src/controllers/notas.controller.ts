import { Request, Response } from 'express';
import db from '../models';

/**
 * Crea una nueva nota de calendario en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con la nota de calendario creada o un mensaje de error.
 */
export const createNotaCalendario = async (req: Request, res: Response): Promise<Response> => {
    try {
        console.log('Datos recibidos CREATE:', req.body);
        const notaCalendario = await db.notasCalendario.create({
            equipo_id: req.body.equipo_id,
            titulo: req.body.titulo,  
            type: req.body.type,
            bgColor: req.body.bgColor,
            borderColor: req.body.borderColor,
            color: req.body.color,
            dragBgColor: req.body.dragBgColor,
            dueDateClass: req.body.dueDateClass,
            start: req.body.start,
            end_time: req.body.end
        });
        return res.status(200).json(notaCalendario);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene todas las notas de calendario de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con todas las notas de calendario o un mensaje de error.
 */
export const getAllNotasCalendario = async (req: Request, res: Response): Promise<Response> => {
    try {
        const notasCalendario = await db.notasCalendario.findAll();
        return res.status(200).json(notasCalendario);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene una nota de calendario por su ID.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con la nota de calendario encontrada o un mensaje de error.
 */
export const getNotaCalendarioById = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
        const notaCalendario = await db.notasCalendario.findByPk(id);
        if (!notaCalendario) {
            return res.status(404).json({ message: 'Nota Calendario not found' });
        }
        return res.status(200).json(notaCalendario);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Actualiza una nota de calendario en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con la nota de calendario actualizada o un mensaje de error.
 */
export const updateNotaCalendario = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
        console.log('Datos recibidos UPDATE:', req.body);
        const updated = await db.notasCalendario.update({
            titulo: req.body.titulo,
            type: req.body.type,
            bgColor: req.body.bgColor,
            borderColor: req.body.borderColor,
            color: req.body.color,
            dragBgColor: req.body.dragBgColor,
            dueDateClass: req.body.dueDateClass,
            start: req.body.start,
            end_time: req.body.end
        }, { where: { id } });

        if (updated) {
            const updatedNotaCalendario = await db.notasCalendario.findByPk(id);
            return res.status(200).json(updatedNotaCalendario);
        }
        throw new Error('Nota Calendario not found');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Elimina una nota de calendario de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Respuesta de éxito o un mensaje de error.
 */
export const deleteNotaCalendario = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
        const deleted = await db.notasCalendario.destroy({ where: { id } });
        if (deleted) {
            return res.status(204).send(); // No Content
        }
        throw new Error('Nota Calendario not found');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};
