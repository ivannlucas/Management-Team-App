import { Request, Response } from 'express';
import db from '../models';
import crypto from 'crypto';

/**
 * Crea un nuevo equipo en la base de datos y genera un token de invitación basado en el nombre del equipo.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el equipo creado o un mensaje de error.
 */
export const createEquipo = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Genera un hash SHA-256 del nombre del equipo
        const hash = crypto.createHash('sha256').update(req.body.nombre_equipo).digest('hex');
        // Recorta el hash para obtener un token de longitud deseada
        const tokenInvitacion = hash.substring(0, 15);

        const equipoData = {
            ...req.body,
            token: tokenInvitacion
        };

        const equipo = await db.equipo.create(equipoData);
        return res.status(200).json(equipo);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene todos los equipos de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con todos los equipos o un mensaje de error.
 */
export const getAllEquipos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const equipos = await db.equipo.findAll();
        return res.status(200).json(equipos);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene un equipo por su ID.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el equipo encontrado o un mensaje de error.
 */
export const getEquipoById = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No id provided' });
        
    }

    try {
        const equipo = await db.equipo.findByPk(id);
        if (!equipo) {
            return res.status(404).json({ message: 'Equipo not found' });
        }
        return res.status(200).json(equipo);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene un equipo por su token de invitación.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el equipo encontrado o un mensaje de error.
 */
export const getEquipoByToken = async (req: Request, res: Response): Promise<Response> => {
    const token = req.params.token;
    console.log("Token recibido:", token);
    if (!token) {
        return res.status(400).send({ message: 'No token provided' });
        
    }

    try {
        const equipo = await db.equipo.findOne({ where: { token: token } });
        console.log(`RESPONSE EQUIPO: ${equipo}`);
        if (!equipo) {
            return res.status(404).json({ message: 'Equipo not found' });
        }
        return res.status(200).json(equipo);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Actualiza un equipo en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el equipo actualizado o un mensaje de error.
 */
export const updateEquipo = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No id provided' });
        
    }

    try {
        const updated = await db.equipo.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedEquipo = await db.equipo.findByPk(req.params.id);
            return res.status(200).json(updatedEquipo);
        }
        throw new Error('Equipo not found');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Elimina un equipo de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Respuesta de éxito o un mensaje de error.
 */
export const deleteEquipo = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No id provided' });
        
    }

    try {
        const deleted = await db.equipo.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).send(); // 204 No Content
        }
        throw new Error('Equipo not found');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};
