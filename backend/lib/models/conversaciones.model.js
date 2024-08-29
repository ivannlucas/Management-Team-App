"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/**
 * Define el modelo de `Conversaciones`.
 *
 * @param {Sequelize} sequelize - La instancia de Sequelize.
 * @param {any} SequelizeTypes - Tipos de datos proporcionados por Sequelize.
 * @returns {typeof Model} El modelo de `Conversaciones`.
 */
var _default = exports["default"] = function _default(sequelize, SequelizeTypes) {
  /**
   * @typedef {Object} Conversaciones
   * @property {number} id - ID único de la conversación.
   * @property {number} usuario_id - ID del usuario que inicia la conversación.
   * @property {number} destinatario_id - ID del usuario destinatario de la conversación.
   * @property {Object} mensajes - Mensajes de la conversación en formato JSON.
   */
  var Conversaciones = sequelize.define('conversaciones', {
    id: {
      type: SequelizeTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuario_id: {
      type: SequelizeTypes.INTEGER,
      allowNull: false
    },
    destinatario_id: {
      type: SequelizeTypes.INTEGER,
      allowNull: false
    },
    mensajes: {
      type: SequelizeTypes.JSON
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  return Conversaciones;
};