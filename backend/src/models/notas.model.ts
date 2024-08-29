import { Sequelize } from 'sequelize';
import { Model } from 'sequelize/types';

/**
 * Define el modelo de `NotasCalendario`.
 *
 * @param {Sequelize} sequelize - La instancia de Sequelize.
 * @param {any} SequelizeTypes - Tipos de datos proporcionados por Sequelize.
 * @returns {typeof Model} El modelo de `NotasCalendario`.
 */
export default (sequelize: Sequelize, SequelizeTypes: any): typeof Model => {
    /**
     * @typedef {Object} NotasCalendario
     * @property {number} id - ID único de la nota del calendario.
     * @property {number} equipo_id - ID del equipo asociado a la nota.
     * @property {string} titulo - Título de la nota del calendario.
     * @property {'partido'|'entrenamiento'|'vacaciones'} type - Tipo de la nota del calendario.
     * @property {string} [bgColor] - Color de fondo de la nota.
     * @property {string} [borderColor] - Color del borde de la nota.
     * @property {string} [color] - Color del texto de la nota.
     * @property {string} [dragBgColor] - Color de fondo cuando la nota es arrastrada.
     * @property {string} [dueDateClass] - Clase CSS para la fecha límite de la nota.
     * @property {Date} start - Fecha y hora de inicio de la nota.
     * @property {Date} end_time - Fecha y hora de finalización de la nota.
     */
    const NotasCalendario = sequelize.define('notas_calendario', {
        id: {
            type: SequelizeTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        equipo_id: {
            type: SequelizeTypes.INTEGER,
            allowNull: false
        },
        titulo: {
            type: SequelizeTypes.STRING,
            allowNull: false
        },
        type: {
            type: SequelizeTypes.ENUM('partido', 'entrenamiento', 'vacaciones'), 
            allowNull: false
        },
        bgColor: {
            type: SequelizeTypes.STRING(7),
            allowNull: true,
            field: 'bgcolor'
        },
        borderColor: {
            type: SequelizeTypes.STRING(7),
            allowNull: true,
            field: 'bordercolor' 
        },
        color: {
            type: SequelizeTypes.STRING(7),
            allowNull: true
        },
        dragBgColor: {
            type: SequelizeTypes.STRING(7),
            allowNull: true,
            field: 'dragbgcolor' 
        },
        dueDateClass: {
            type: SequelizeTypes.STRING(50),
            allowNull: true,
            field: 'duedateclass' 
        },
        start: {
            type: SequelizeTypes.DATE,
            allowNull: false
        },
        end_time: {
            type: SequelizeTypes.DATE,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return NotasCalendario;
};
