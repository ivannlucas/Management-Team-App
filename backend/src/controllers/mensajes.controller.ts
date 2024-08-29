import { Request, Response } from 'express';
import db from '../models';

/**
 * Crea un nuevo mensaje en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el mensaje creado o un mensaje de error.
 */
export const createMensaje = async (req: Request, res: Response): Promise<Response> => {
    try {
        const mensaje = await db.mensajes.create(req.body);
        return res.status(200).json(mensaje);
    } catch (error: any) {
        console.log(`ERROR INSERT MENSAJE: ${error}`);
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene todos los mensajes de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con todos los mensajes o un mensaje de error.
 */
export const getAllMensajes = async (req: Request, res: Response): Promise<Response> => {
    try {
        const mensajes = await db.mensajes.findAll();
        return res.status(200).json(mensajes);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene un mensaje por su ID.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el mensaje encontrado o un mensaje de error.
 */
export const getMensajeById = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No id provided' });
        
    }

    try {
        const mensaje = await db.mensajes.findByPk(id);
        if (!mensaje) {
            return res.status(404).json({ message: 'Mensaje not found' });
        }
        return res.status(200).json(mensaje);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene todos los mensajes de una conversación por su ID de conversación.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con los mensajes encontrados o un mensaje de error.
 */
export const getMensajesByConversacion = async (req: Request, res: Response) => {
    try {
        const mensajes = await db.mensajes.findAll({
            where: { conversacion_id: req.params.id }
        });
        res.status(200).json(mensajes);
    } catch (error: any) {
        console.log('Error al obtener mensajes por conversacion:', error);
        res.status(400).json({ message: 'Error al obtener mensajes' });
    }
};

/**
 * Obtiene el último mensaje de una conversación por su ID de conversación.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el último mensaje encontrado o un mensaje de error.
 */
export const getUltimoMensajeByConversacion = async (req: Request, res: Response): Promise<Response> => {
    const conversacionId = req.params.id;
    try {
        if (!conversacionId) {
            return res.status(404).json({ message: 'No conversacionId for this conversation' });
        }

        const ultimoMensaje = await db.mensajes.findOne({
            where: { conversacion_id: conversacionId },
            order: [['fecha_hora', 'DESC']]
        });

        if (!ultimoMensaje) {
            return res.status(404).json({ message: 'No messages found for this conversation' });
        }
        return res.status(200).json(ultimoMensaje);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Actualiza un mensaje en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el mensaje actualizado o un mensaje de error.
 */
export const updateMensaje = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No id provided' });
        
    }

    try {
        const updated = await db.mensajes.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedMensaje = await db.mensajes.findByPk(id);
            return res.status(200).json(updatedMensaje);
        }
        throw new Error('Mensaje not found');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Elimina un mensaje de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Respuesta de éxito o un mensaje de error.
 */
export const deleteMensaje = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No id provided' });
        
    }

    try {
        const deleted = await db.mensajes.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send(); // No Content
        }
        throw new Error('Mensaje not found');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};
