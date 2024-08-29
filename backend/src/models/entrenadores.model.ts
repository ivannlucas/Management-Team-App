import { Sequelize } from 'sequelize';
import { Model } from 'sequelize/types';

/**
 * Define el modelo de `Entrenadores`.
 *
 * @param {Sequelize} sequelize - La instancia de Sequelize.
 * @param {any} SequelizeTypes - Tipos de datos proporcionados por Sequelize.
 * @returns {typeof Model} El modelo de `Entrenadores`.
 */
export default (sequelize: Sequelize, SequelizeTypes: any): typeof Model => {
    /**
     * @typedef {Object} Entrenadores
     * @property {number} id - ID único del entrenador.
     * @property {number} usuario_id - ID del usuario asociado al entrenador.
     * @property {number} equipo_id - ID del equipo asociado al entrenador.
     * @property {string} nombre_entrenador - Nombre del entrenador.
     * @property {number} [edad] - Edad del entrenador.
     * @property {number} [anios_experiencia] - Años de experiencia del entrenador.
     * @property {string} [equipo_actual] - Nombre del equipo actual del entrenador.
     */
    const Entrenadores = sequelize.define('entrenadores', {
        id: {
          type: SequelizeTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        usuario_id: {
          type: SequelizeTypes.INTEGER,
          allowNull: false
        },
        equipo_id: {
          type: SequelizeTypes.INTEGER,
          allowNull: false
        },
        nombre_entrenador: {
          type: SequelizeTypes.STRING,
          allowNull: false
        },
        edad: {
          type: SequelizeTypes.INTEGER
        },
        anios_experiencia: {
          type: SequelizeTypes.INTEGER
        },
        equipo_actual: {
          type: SequelizeTypes.STRING
        }
      }, {
        timestamps: false,
        freezeTableName: true
      }
    )

    return Entrenadores;
}
