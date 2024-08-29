import { Request, Response } from 'express';
import db from '../models';

/**
 * Crea un nuevo jugador en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el jugador creado o un mensaje de error.
 */
export const createJugador = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {
            equipo_id, nombre, apellidos, email, pass1, pass2, rol, edad, num_camiseta, peso, altura, posicion, selectedPos
        } = req.body;
    
        // Convertir a enteros apropiados o asignar nulos si están vacíos
        const equipoId = equipo_id ? parseInt(equipo_id) : null;
        const edadInt = edad ? parseInt(edad) : null;
        const numCamisetaInt = num_camiseta ? parseInt(num_camiseta) : null;
        const pesoFloat = peso ? parseFloat(peso) : null;
        const alturaFloat = altura ? parseFloat(altura) : null;

        const jugador = await db.jugadores.create(req.body);
        return res.status(200).json(jugador);
    } catch (error: any) {
        console.log(`ERROR INSERT JUGADOR: ${error}`);
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene todos los jugadores de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con todos los jugadores o un mensaje de error.
 */
export const getAllJugadores = async (req: Request, res: Response): Promise<Response> => {
    try {
        const jugadores = await db.jugadores.findAll();
        return res.status(200).json(jugadores);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene todos los jugadores de un equipo por su ID de equipo.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con los jugadores encontrados o un mensaje de error.
 */
export const getJugadoresByEquipoId = async (req: Request, res: Response): Promise<Response> => {
    const equipoId = req.params.equipoId;
    console.log(`EQUIPO ID: ${equipoId}`);
    try {
        const jugadores = await db.jugadores.findAll({
            where: { equipo_id: equipoId },
            include: [{
                model: db.usuarios,  
                as: 'usuario',       
                attributes: ['nombre', 'apellidos', 'image_id']
            }]
        });
        console.log(`JUGADORES: ${jugadores}`);
        return res.status(200).json(jugadores);
    } catch (error: any) {
        console.log(`ERROR GETTING JUGADORES BY EQUIPO ID: ${error}`);
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene un jugador por su ID.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el jugador encontrado o un mensaje de error.
 */
export const getJugadorById = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No id provided' });
        
    }

    try {
        const jugador = await db.jugadores.findByPk(id, {
            include: [{
                model: db.usuarios,
                as: 'usuario', // Asegúrate de que 'as' corresponda a cómo has definido la relación en tus modelos
                 // Especifica los atributos que deseas obtener
                attributes: ['nombre', 'apellidos','email','rol', 'image_id']
            }]
        });
        if (!jugador) {
            return res.status(404).json({ message: 'Jugador not found' });
        }
        return res.status(200).json(jugador);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Actualiza un jugador en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el jugador actualizado o un mensaje de error.
 */
export const updateJugador = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No id provided' });
        
    }

    try {
        const updated = await db.jugadores.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedJugador = await db.jugadores.findByPk(id);
            return res.status(200).json(updatedJugador);
        }
        throw new Error('Jugador not found');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Actualiza los detalles de un jugador en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con los detalles del jugador actualizados o un mensaje de error.
 */
export const updateJugadorDetalles = async (req: Request, res: Response): Promise<Response> => {
    const usuario_id = req.params.id;
    if (!usuario_id) {
        return res.status(400).send({ message: 'No usuario_id provided' });
        
    }

    const { edad, peso, altura, num_camiseta, posicion } = req.body;

    try {
        const updated = await db.jugadores.update(
            { edad, peso, altura, num_camiseta, posicion },
            { where: { usuario_id: usuario_id } }
        );

        if (updated) {
            const updatedJugador = await db.jugadores.findOne({ where: { usuario_id: usuario_id } });
            return res.status(200).json(updatedJugador);
        }
        throw new Error('Jugador not found');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Elimina un jugador de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Respuesta de éxito o un mensaje de error.
 */
export const deleteJugador = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No id provided' });
        
    }

    try {
        const deleted = await db.jugadores.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send(); // No Content
        }
        throw new Error('Jugador not found');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};
