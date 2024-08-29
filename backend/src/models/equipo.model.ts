import { Sequelize } from 'sequelize';
import { Model } from 'sequelize/types';

/**
 * Define el modelo de `Equipo`.
 *
 * @param {Sequelize} sequelize - La instancia de Sequelize.
 * @param {any} SequelizeTypes - Tipos de datos proporcionados por Sequelize.
 * @returns {typeof Model} El modelo de `Equipo`.
 */
export default (sequelize: Sequelize, SequelizeTypes: any): typeof Model => {
    /**
     * @typedef {Object} Equipo
     * @property {number} id - ID único del equipo.
     * @property {string} token - Token único del equipo.
     * @property {string} nombre_equipo - Nombre del equipo.
     */
    const Equipo = sequelize.define('equipo', {
        id: {
          type: SequelizeTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        token: {
          type: SequelizeTypes.STRING,
          allowNull: false,
          unique: true
        },
        nombre_equipo: {
          type: SequelizeTypes.STRING,
          allowNull: false
        }
      }, {
        timestamps: false,
        freezeTableName: true
      }
    )

    return Equipo;
}
