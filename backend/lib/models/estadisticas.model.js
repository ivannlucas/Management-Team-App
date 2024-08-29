"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/**
 * Define el modelo de `Estadisticas`.
 *
 * @param {Sequelize} sequelize - La instancia de Sequelize.
 * @param {any} SequelizeTypes - Tipos de datos proporcionados por Sequelize.
 * @returns {typeof Model} El modelo de `Estadisticas`.
 */
var _default = exports["default"] = function _default(sequelize, SequelizeTypes) {
  /**
   * @typedef {Object} Estadisticas
   * @property {number} id - ID único de las estadísticas.
   * @property {number} [partidos_jugados] - Número de partidos jugados.
   * @property {number} [minutos_jugados] - Número de minutos jugados.
   * @property {number} [goles_anotados] - Número de goles anotados.
   * @property {number} [asistencias] - Número de asistencias realizadas.
   * @property {number} [tarjetas_amarillas] - Número de tarjetas amarillas recibidas.
   * @property {number} [tarjetas_rojas] - Número de tarjetas rojas recibidas.
   */
  var Estadisticas = sequelize.define('estadisticas', {
    id: {
      type: SequelizeTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    partidos_jugados: {
      type: SequelizeTypes.INTEGER
    },
    minutos_jugados: {
      type: SequelizeTypes.INTEGER
    },
    goles_anotados: {
      type: SequelizeTypes.INTEGER
    },
    asistencias: {
      type: SequelizeTypes.INTEGER
    },
    tarjetas_amarillas: {
      type: SequelizeTypes.INTEGER
    },
    tarjetas_rojas: {
      type: SequelizeTypes.INTEGER
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  return Estadisticas;
};