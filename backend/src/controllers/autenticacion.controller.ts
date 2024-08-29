import { Request, Response } from 'express';
import { sendEmail } from '../utils/nodemailer';
import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require('dotenv').config();

/**
 * Genera un token JWT utilizando el ID y el email del usuario.
 * @param {number} id - ID del usuario.
 * @param {string} email - Email del usuario.
 * @returns {string} - Token JWT.
 * @throws {Error} - Si el JWT_SECRET no está definido.
 */
const generateToken = (id: number, email: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido');
  }
  return jwt.sign({ id, email }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
};

/**
 * Registra un nuevo usuario en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  const { nombre, apellidos, email, password, rol, image_id, isverified } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await db.usuarios.create({
      nombre,
      apellidos,
      email,
      password: hashedPassword,
      rol,
      image_id,
      isverified
    });

    const token = generateToken(newUser.id, newUser.email);

    const verificationLink = `http://localhost:8080/verifyEmail?token=${token}`;
    sendEmail(
      newUser.email,
      "Verificar su correo electrónico",
      "Por favor haga clic en el siguiente enlace para verificar su correo electrónico: " + verificationLink,
      `<p>Por favor haga clic en el siguiente enlace para verificar su correo electrónico: <a href="${verificationLink}">Verificar correo electrónico</a></p>`
    );

    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar nuevo usuario' });
  }
};

/**
 * Inicia sesión de un usuario en la aplicación.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await db.usuarios.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: 'Credenciales inválidas' });

    let detalles = {};
    if (user.rol === 'entrenador') {
      detalles = await db.entrenadores.findOne({ where: { usuario_id: user.id } });
    } else if (user.rol === 'jugador') {
      detalles = await db.jugadores.findOne({ where: { usuario_id: user.id } });
    }

    const token = generateToken(user.id, user.email);
    res.status(201).json({ user: { ...user.toJSON(), detalles }, token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

/**
 * Cambia la contraseña de un usuario.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 */
export const changePassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;
  try {
    const user = await db.usuarios.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la contraseña' });
  }
};

/**
 * Envía un enlace para restablecer la contraseña al correo electrónico del usuario.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 */
export const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await db.usuarios.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const token = generateToken(user.id, user.email);
    const resetLink = `http://localhost:8080/change-password?token=${token}`;

    sendEmail(
      user.email,
      "Restablecer su contraseña",
      `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetLink}`,
      `<p>Haga clic en el siguiente enlace para restablecer su contraseña: <a href="${resetLink}">Restablecer contraseña</a></p>`
    );

    res.json({ message: 'Se envió un correo electrónico de restablecimiento de contraseña.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar correo electrónico de restablecimiento de contraseña' });
  }
};

/**
 * Verifica la dirección de correo electrónico del usuario.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 */
export const verifyEmail = async (req: Request, res: Response) => {
  const token = req.query.token;

  if (typeof token !== 'string') {
    return res.status(400).json({ message: 'El token es obligatorio y debe ser una cadena' });
  }
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET no está definido');
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET) as any;

    const user = await db.usuarios.findByPk(payload.id);

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    await user.update({ isverified: true });

    res.json({ message: 'Correo electrónico verificado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar el correo electrónico' });
  }
};
