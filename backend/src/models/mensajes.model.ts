import { Sequelize } from 'sequelize';
import { Model } from 'sequelize/types';

/**
 * Define el modelo de `Mensajes`.
 *
 * @param {Sequelize} sequelize - La instancia de Sequelize.
 * @param {any} SequelizeTypes - Tipos de datos proporcionados por Sequelize.
 * @returns {typeof Model} El modelo de `Mensajes`.
 */
export default (sequelize: Sequelize, SequelizeTypes: any): typeof Model => {
    /**
     * @typedef {Object} Mensajes
     * @property {number} id - ID único del mensaje.
     * @property {string} contenido - Contenido del mensaje.
     * @property {Date} fecha_hora - Fecha y hora en que se envió el mensaje.
     * @property {number} conversacion_id - ID de la conversación a la que pertenece el mensaje.
     * @property {number} remitente_id - ID del remitente del mensaje.
     */
    const Mensajes = sequelize.define('mensajes', {
        id: {
          type: SequelizeTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        contenido: {
          type: SequelizeTypes.STRING,
          allowNull: false
        },
        fecha_hora: {
          type: SequelizeTypes.DATE,
          allowNull: false
        },
        conversacion_id: {
          type: SequelizeTypes.INTEGER,
          allowNull: false
        },
        remitente_id: {
          type: SequelizeTypes.INTEGER,
          allowNull: false
        }
      }, {
        timestamps: false,
        freezeTableName: true
      }
    )

    return Mensajes;
}
