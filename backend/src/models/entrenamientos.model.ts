import { Sequelize } from 'sequelize';
import { Model } from 'sequelize/types';

/**
 * Define el modelo de `Entrenamientos`.
 *
 * @param {Sequelize} sequelize - La instancia de Sequelize.
 * @param {any} SequelizeTypes - Tipos de datos proporcionados por Sequelize.
 * @returns {typeof Model} El modelo de `Entrenamientos`.
 */
export default (sequelize: Sequelize, SequelizeTypes: any): typeof Model => {
    /**
     * @typedef {Object} Entrenamientos
     * @property {number} id - ID único del entrenamiento.
     * @property {Date} created_at - Fecha de creación del entrenamiento.
     * @property {number} equipo_id - ID del equipo asociado al entrenamiento.
     * @property {Object} exercises - Ejercicios planificados en el entrenamiento en formato JSON.
     * @property {Date} fecha - Fecha del entrenamiento.
     * @property {Date} hora_fin - Hora de finalización del entrenamiento.
     * @property {Date} hora_inicio - Hora de inicio del entrenamiento.
     * @property {string} name - Nombre del entrenamiento.
     * @property {number} [numexercises] - Número de ejercicios planificados.
     */
    const Entrenamientos = sequelize.define('entrenamientos', {
        id: {
          type: SequelizeTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        created_at: {
          type: SequelizeTypes.DATE,
          allowNull: false,
          defaultValue: SequelizeTypes.NOW
        },
        equipo_id: {
          type: SequelizeTypes.INTEGER,
          allowNull: false
        },
        exercises: {
          type: SequelizeTypes.JSON
        },
        fecha: {
          type: SequelizeTypes.DATE,
          allowNull: false
        },
        hora_fin: {
          type: SequelizeTypes.DATE,
          allowNull: false
        },
        hora_inicio: {
          type: SequelizeTypes.DATE,
          allowNull: false
        },
        name: {
          type: SequelizeTypes.STRING,
          allowNull: false
        },
        numexercises: {
          type: SequelizeTypes.INTEGER
        }
      }, {
        timestamps: false,
        freezeTableName: true
      }
    )

    return Entrenamientos;
}
