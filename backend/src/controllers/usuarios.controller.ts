import { Request, Response } from 'express';
import db from '../models';
import { uploadFileToS3 } from '../utils/aws';
import { v4 as uuidv4 } from 'uuid';

/**
 * Crea un nuevo usuario en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el usuario creado o un mensaje de error.
 */
export const createUsuario = async (req: Request, res: Response): Promise<Response> => {
    try {
        const usuario = await db.usuarios.create(req.body);
        return res.status(200).json(usuario);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene todos los usuarios de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con todos los usuarios o un mensaje de error.
 */
export const getAllUsuarios = async (req: Request, res: Response): Promise<Response> => {
    try {
        const usuarios = await db.usuarios.findAll();
        return res.status(200).json(usuarios);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene los usuarios asociados a un equipo específico.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con los usuarios encontrados o un mensaje de error.
 */
export const getUsuariosByEquipo = async (req: Request, res: Response): Promise<Response> => {
    try {
        const equipoId = parseInt(req.params.equipoId); // Convertir equipoId a número
        console.log("EQUIPO ID en getUsuariosByEquipo", equipoId);
        if (isNaN(equipoId)) {
            return res.status(400).json({ message: "ID de equipo no válido" });
        }
        const usuarios = await db.usuarios.findAll({
            include: [{
                model: db.jugadores,
                as: 'jugadores',
                required: false, // Cambio a LEFT JOIN
                attributes: [],
                where: { equipo_id: equipoId }
            },
            {
                model: db.entrenadores,
                as: 'entrenadores',
                required: false, // Cambio a LEFT JOIN
                attributes: [],
                where: { equipo_id: equipoId }
            }],
            where: {
                [db.Sequelize.Op.or]: [
                    { '$jugadores.usuario_id$': { [db.Sequelize.Op.not]: null } },
                    { '$entrenadores.usuario_id$': { [db.Sequelize.Op.not]: null } }
                ]
            },
            attributes: ['id', 'nombre', 'apellidos', 'email', 'image_id', 'rol']
        });
        return res.status(200).json(usuarios);
    } catch (error: any) {
        console.log('Error al obtener usuarios por equipo: ', error);
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Obtiene un usuario por su ID.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el usuario encontrado o un mensaje de error.
 */
export const getUsuarioById = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No se proporcionó identificación' });
        
    }

    try {
        const usuario = await db.usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json(usuario);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Actualiza un usuario en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el usuario actualizado o un mensaje de error.
 */
export const updateUsuario = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No se proporcionó identificación' });
    }

    try {
        const usuario = await db.usuarios.findByPk(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        const { nombre, apellidos, email, password, rol } = req.body;
        const isverified = req.body.isverified === 'true'; // Convertir a booleano
        let image_id = usuario.imagen_id; // Mantener la URL existente si no hay nueva imagen

        if (req.file) {
            const fileBuffer = req.file.buffer;
            const originalFileName = req.file.originalname;
            const fileExtension = originalFileName.split('.').pop(); // Obtener la extensión del archivo
            const uniqueFileName = `${uuidv4()}.${fileExtension}`; // Generar un nombre de archivo único

            const bucketName = 'awsbucketmanagement';
            const folderPath = 'uploads/profiles';

            const s3Response = await uploadFileToS3(fileBuffer, uniqueFileName, bucketName, folderPath);
            image_id = s3Response.Location; // Actualizar la URL de la imagen si se subió una nueva
        }

        await db.usuarios.update({
            nombre,
            apellidos,
            email,
            password,
            rol,
            isverified,
            image_id
        }, {
            where: { id: id }
        });

        // Recuperar el usuario actualizado
        const updatedUsuario = await db.usuarios.findByPk(id);

        return res.status(200).json(updatedUsuario);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

/**
 * Elimina un usuario de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Respuesta de éxito o un mensaje de error.
 */
export const deleteUsuario = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'No se proporcionó identificación' });
        
    }

    try {
        const deleted = await db.usuarios.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).send(); // No Content
        }
        throw new Error('Usuario no encontrado');
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};
