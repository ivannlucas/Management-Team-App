import { Sequelize } from 'sequelize';
import { Model } from 'sequelize/types';

/**
 * Define el modelo de `Conversaciones`.
 *
 * @param {Sequelize} sequelize - La instancia de Sequelize.
 * @param {any} SequelizeTypes - Tipos de datos proporcionados por Sequelize.
 * @returns {typeof Model} El modelo de `Conversaciones`.
 */
export default (sequelize: Sequelize, SequelizeTypes: any): typeof Model => {
    /**
     * @typedef {Object} Conversaciones
     * @property {number} id - ID único de la conversación.
     * @property {number} usuario_id - ID del usuario que inicia la conversación.
     * @property {number} destinatario_id - ID del usuario destinatario de la conversación.
     * @property {Object} mensajes - Mensajes de la conversación en formato JSON.
     */
    const Conversaciones = sequelize.define('conversaciones', {
        /**
         * ID único de la conversación.
         * @type {number}
         */
        id: {
          type: SequelizeTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        /**
         * ID del usuario que inicia la conversación.
         * @type {number}
         */
        usuario_id: {
          type: SequelizeTypes.INTEGER,
          allowNull: false
        },
        /**
         * ID del usuario destinatario de la conversación.
         * @type {number}
         */
        destinatario_id: {
          type: SequelizeTypes.INTEGER,
          allowNull: false
        },
        /**
         * Mensajes de la conversación en formato JSON.
         * @type {Object}
         */
        mensajes: {
          type: SequelizeTypes.JSON
        }
      }, {
        timestamps: false,
        freezeTableName: true
      }
    )

    return Conversaciones;
}
