import { Request, Response } from 'express';
import db from '../models';

/**
 * Crea una nueva conversación en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 */
export const createConversacion = async (req: Request, res: Response)  => {
  try {
    const conversacion = await db.conversaciones.create(req.body);
    res.status(200).json(conversacion);
  } catch (error: any) {
    console.error(`ERROR INSERT CONVERSACION: ${error}`);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Obtiene todas las conversaciones de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 */
export const getAllConversaciones = async (req: Request, res: Response)  => {
  try {
    const conversaciones = await db.conversaciones.findAll();
    res.status(200).json(conversaciones);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Obtiene todas las conversaciones asociadas a un usuario específico.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 */
export const getAllConversacionesByUsuario = async (req: Request, res: Response)  => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID de usuario no válido" });
    }
    const conversaciones = await db.conversaciones.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          { usuario_id: userId },
          { destinatario_id: userId }
        ]
      }
    });
    res.status(200).json(conversaciones);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Obtiene una conversación específica por su ID.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 */
export const getConversacionById = async (req: Request, res: Response)  => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Identificación inválida" });
    }
    const conversacion = await db.conversaciones.findByPk(id);
    if (!conversacion) {
      res.status(404).json({ message: 'Conversacion no encontrada' });
    } else {
      res.status(200).json(conversacion);
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Actualiza una conversación existente en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 */
export const updateConversacion = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({ message: 'Identificación inválida' });
    }
    const [updated] = await db.conversaciones.update(req.body, { where: { id } });
    if (updated) {
      const updatedConversacion = await db.conversaciones.findByPk(id);
      res.status(200).json(updatedConversacion);
    } else {
      throw new Error('Conversacion no encontrada');
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Elimina una conversación de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 */
export const deleteConversacion = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({ message: 'Identificación inválida' });
    }
    const deleted = await db.conversaciones.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send(); // No Content
    } else {
      throw new Error('Conversacion no encontrada');
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
