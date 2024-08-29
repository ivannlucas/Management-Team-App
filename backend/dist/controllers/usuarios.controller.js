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
exports.deleteUsuario = exports.updateUsuario = exports.getUsuarioById = exports.getAllUsuarios = exports.createUsuario = void 0;
const models_1 = __importDefault(require("../models"));
const createUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield models_1.default.usuarios.create(req.body);
        return res.status(200).json(usuario);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.createUsuario = createUsuario;
const getAllUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield models_1.default.usuarios.findAll();
        return res.status(200).json(usuarios);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.getAllUsuarios = getAllUsuarios;
const getUsuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({ message: 'No id provided' });
        return;
    }
    try {
        const usuario = yield models_1.default.usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario not found' });
        }
        return res.status(200).json(usuario);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.getUsuarioById = getUsuarioById;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({ message: 'No id provided' });
        return;
    }
    try {
        const updated = yield models_1.default.usuarios.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedUsuario = yield models_1.default.usuarios.findByPk(req.params.id);
            return res.status(200).json(updatedUsuario);
        }
        throw new Error('Usuario not found');
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.updateUsuario = updateUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({ message: 'No id provided' });
        return;
    }
    try {
        const deleted = yield models_1.default.usuarios.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).send();
        }
        throw new Error('Usuario not found');
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.deleteUsuario = deleteUsuario;
