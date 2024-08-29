import { Sequelize } from 'sequelize';
import { Model } from 'sequelize/types';

/**
 * Define el modelo de `Jugadores`.
 *
 * @param {Sequelize} sequelize - La instancia de Sequelize.
 * @param {any} SequelizeTypes - Tipos de datos proporcionados por Sequelize.
 * @returns {typeof Model} El modelo de `Jugadores`.
 */
export default (sequelize: Sequelize, SequelizeTypes: any): typeof Model => {
    /**
     * @typedef {Object} Jugadores
     * @property {number} id - ID único del jugador.
     * @property {number} usuario_id - ID del usuario asociado al jugador.
     * @property {number} equipo_id - ID del equipo al que pertenece el jugador.
     * @property {string} nombre_jugador - Nombre del jugador.
     * @property {number} [numero_camiseta] - Número de camiseta del jugador.
     * @property {number} [edad] - Edad del jugador.
     * @property {number} [altura] - Altura del jugador en metros.
     * @property {number} [peso] - Peso del jugador en kilogramos.
     * @property {string} [posicion] - Posición del jugador en el campo.
     * @property {number} [estadisticas_id] - ID de las estadísticas asociadas al jugador.
     */
    const Jugadores = sequelize.define('jugadores', {
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
        nombre_jugador: {
          type: SequelizeTypes.STRING,
          allowNull: false
        },
        numero_camiseta: {
          type: SequelizeTypes.INTEGER
        },
        edad: {
          type: SequelizeTypes.INTEGER
        },
        altura: {
          type: SequelizeTypes.FLOAT
        },
        peso: {
          type: SequelizeTypes.FLOAT
        },
        posicion: {
          type: SequelizeTypes.STRING
        },
        estadisticas_id: {
          type: SequelizeTypes.INTEGER
        }
      }, {
        timestamps: false,
        freezeTableName: true
      }
    )
    
    return Jugadores;
}
