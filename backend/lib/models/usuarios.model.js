"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/**
 * Define el modelo de `Usuarios`.
 *
 * @param {Sequelize} sequelize - La instancia de Sequelize.
 * @param {any} SequelizeTypes - Tipos de datos proporcionados por Sequelize.
 * @returns {typeof Model} El modelo de `Usuarios`.
 */
var _default = exports["default"] = function _default(sequelize, SequelizeTypes) {
  /**
   * @typedef {Object} Usuarios
   * @property {number} id - ID único del usuario.
   * @property {string} nombre - Nombre del usuario.
   * @property {string} apellidos - Apellidos del usuario.
   * @property {string} email - Dirección de correo electrónico del usuario.
   * @property {string} password - Contraseña del usuario.
   * @property {string} rol - Rol del usuario (e.g., entrenador, jugador).
   * @property {string} [image_id] - ID de la imagen asociada al usuario.
   * @property {Object} [conversaciones] - JSON que almacena las conversaciones del usuario.
   * @property {boolean} isverified - Indicador de si el usuario ha verificado su correo electrónico.
   */
  var Usuarios = sequelize.define('usuarios', {
    id: {
      type: SequelizeTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: SequelizeTypes.STRING,
      allowNull: false
    },
    apellidos: {
      type: SequelizeTypes.STRING,
      allowNull: false
    },
    email: {
      type: SequelizeTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: SequelizeTypes.STRING,
      allowNull: false
    },
    rol: {
      type: SequelizeTypes.STRING,
      allowNull: false
    },
    image_id: {
      type: SequelizeTypes.STRING
    },
    conversaciones: {
      type: SequelizeTypes.JSON
    },
    isverified: {
      type: SequelizeTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  return Usuarios;
};