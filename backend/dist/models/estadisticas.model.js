"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, SequelizeTypes) => {
    const Estadisticas = sequelize.define('estadisticas', {
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
