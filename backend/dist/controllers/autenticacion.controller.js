"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.changePassword = exports.login = exports.register = void 0;
const nodemailer_1 = require("../utils/nodemailer");
const models_1 = __importDefault(require("../models"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const generateToken = (id, email) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jsonwebtoken_1.default.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '24h' });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password, rol, imagen } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    try {
        const newUser = yield models_1.default.usuarios.create({
            nombre,
            email,
            password: hashedPassword,
            rol,
            imagen
        });
        const token = generateToken(newUser.id, newUser.email);
        // Enviar email de verificación
        const verificationLink = `http://yourdomain.com/verify?token=${token}`;
        (0, nodemailer_1.sendEmail)(newUser.email, "Verify Your Email", "Please click on the following link to verify your email: " + verificationLink, `<p>Please click on the following link to verify your email: <a href="${verificationLink}">Verify Email</a></p>`);
        res.status(201).json({ newUser, token });
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering new user' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield models_1.default.usuarios.findOne({ where: { email } });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const isValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValid)
            return res.status(400).json({ message: 'Invalid credentials' });
        const token = generateToken(user.id, user.email);
        res.json({ user, token });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});
exports.login = login;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, oldPassword, newPassword } = req.body;
    try {
        const user = yield models_1.default.usuarios.findOne({ where: { email } });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const isValid = yield bcryptjs_1.default.compare(oldPassword, user.password);
        if (!isValid)
            return res.status(400).json({ message: 'Incorrect password' });
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        yield user.update({ password: hashedPassword });
        res.json({ message: 'Password updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating password' });
    }
});
exports.changePassword = changePassword;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token; // Asume que el token se envía como parámetro de consulta
    // Verificar que el token exista y sea un string
    if (typeof token !== 'string') {
        return res.status(400).json({ message: 'Token is required and must be a string' });
    }
    try {
        // Asegúrate de que JWT_SECRET esté definido
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        // Verifica y decodifica el token
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield models_1.default.usuarios.findByPk(payload.id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        yield user.update({ isVerified: true }); // Asume que tienes un campo `isVerified` en tu modelo
        res.json({ message: 'Email verified successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error verifying email' });
    }
});
exports.verifyEmail = verifyEmail;
