import { Sequelize } from 'sequelize';
import { Model } from 'sequelize/types';

/**
 * Define el modelo de `EstadisticasPartidos`.
 *
 * @param {Sequelize} sequelize - La instancia de Sequelize.
 * @param {any} SequelizeTypes - Tipos de datos proporcionados por Sequelize.
 * @returns {typeof Model} El modelo de `EstadisticasPartidos`.
 */
export default (sequelize: Sequelize, SequelizeTypes: any): typeof Model => {
    /**
     * @typedef {Object} EstadisticasPartidos
     * @property {number} id - ID único de las estadísticas del partido.
     * @property {number} [posesion_balon_equipo_local] - Posesión de balón del equipo local (porcentaje).
     * @property {number} [posesion_balon_equipo_visitante] - Posesión de balón del equipo visitante (porcentaje).
     * @property {number} [tiros_gol_equipo_local] - Número de tiros a gol del equipo local.
     * @property {number} [tiros_gol_equipo_visitante] - Número de tiros a gol del equipo visitante.
     * @property {number} [tiros_esquina_equipo_local] - Número de tiros de esquina del equipo local.
     * @property {number} [tiros_esquina_equipo_visitante] - Número de tiros de esquina del equipo visitante.
     * @property {number} [faltas_equipo_local] - Número de faltas cometidas por el equipo local.
     * @property {number} [faltas_equipo_visitante] - Número de faltas cometidas por el equipo visitante.
     * @property {number} [tarjetas_amarillas_equipo_local] - Número de tarjetas amarillas recibidas por el equipo local.
     * @property {number} [tarjetas_amarillas_equipo_visitante] - Número de tarjetas amarillas recibidas por el equipo visitante.
     * @property {number} [tarjetas_rojas_equipo_local] - Número de tarjetas rojas recibidas por el equipo local.
     * @property {number} [tarjetas_rojas_equipo_visitante] - Número de tarjetas rojas recibidas por el equipo visitante.
     */
    const EstadisticasPartidos = sequelize.define('estadisticas_partidos', {
        id: {
          type: SequelizeTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        posesion_balon_equipo_local: {
          type: SequelizeTypes.FLOAT
        },
        posesion_balon_equipo_visitante: {
          type: SequelizeTypes.FLOAT
        },
        tiros_gol_equipo_local: {
          type: SequelizeTypes.INTEGER
        },
        tiros_gol_equipo_visitante: {
          type: SequelizeTypes.INTEGER
        },
        tiros_esquina_equipo_local: {
          type: SequelizeTypes.INTEGER
        },
        tiros_esquina_equipo_visitante: {
          type: SequelizeTypes.INTEGER
        },
        faltas_equipo_local: {
          type: SequelizeTypes.INTEGER
        },
        faltas_equipo_visitante: {
          type: SequelizeTypes.INTEGER
        },
        tarjetas_amarillas_equipo_local: {
          type: SequelizeTypes.INTEGER
        },
        tarjetas_amarillas_equipo_visitante: {
          type: SequelizeTypes.INTEGER
        },
        tarjetas_rojas_equipo_local: {
          type: SequelizeTypes.INTEGER
        },
        tarjetas_rojas_equipo_visitante: {
          type: SequelizeTypes.INTEGER
        }
      }, {
        timestamps: false,
        freezeTableName: true
      }
    )

    return EstadisticasPartidos;
}
