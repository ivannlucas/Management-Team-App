import { Sequelize } from 'sequelize';
import { Model } from 'sequelize/types';

/**
 * Define el modelo de `Partidos`.
 *
 * @param {Sequelize} sequelize - La instancia de Sequelize.
 * @param {any} SequelizeTypes - Tipos de datos proporcionados por Sequelize.
 * @returns {typeof Model} El modelo de `Partidos`.
 */
export default (sequelize: Sequelize, SequelizeTypes: any): typeof Model => {
    /**
     * @typedef {Object} Partidos
     * @property {number} id - ID único del partido.
     * @property {number} [equipo_local_id] - ID del equipo local.
     * @property {string} [equipo_local_nombre] - Nombre del equipo local.
     * @property {number} [equipo_visitante_id] - ID del equipo visitante.
     * @property {string} [equipo_visitante_nombre] - Nombre del equipo visitante.
     * @property {Date} fecha_hora - Fecha y hora del partido.
     * @property {string} [lugar] - Lugar donde se jugará el partido.
     * @property {number} [goles_equipo_local] - Goles anotados por el equipo local.
     * @property {number} [goles_equipo_visitante] - Goles anotados por el equipo visitante.
     * @property {'PROGRAMADO'|'FINALIZADO'} [estado] - Estado del partido.
     * @property {number} [estadisticas_partido_id] - ID de las estadísticas asociadas al partido.
     */
    const Partidos = sequelize.define('partidos', {
        id: {
            type: SequelizeTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        equipo_local_id: {
            type: SequelizeTypes.INTEGER,
            allowNull: true
        },
        equipo_local_nombre: {
            type: SequelizeTypes.STRING,
            allowNull: true
        },
        equipo_visitante_id: {
            type: SequelizeTypes.INTEGER,
            allowNull: true
        },
        equipo_visitante_nombre: {
            type: SequelizeTypes.STRING,
            allowNull: true
        },
        fecha_hora: {
            type: SequelizeTypes.DATE,
            allowNull: false
        },
        lugar: {
            type: SequelizeTypes.STRING
        },
        goles_equipo_local: {
            type: SequelizeTypes.INTEGER
        },
        goles_equipo_visitante: {
            type: SequelizeTypes.INTEGER
        },
        estado: {
            type: SequelizeTypes.ENUM('PROGRAMADO', 'FINALIZADO') 
        },
        estadisticas_partido_id: {
            type: SequelizeTypes.INTEGER
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Partidos;
}
