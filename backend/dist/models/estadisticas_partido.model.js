"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, SequelizeTypes) => {
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
    });
    return EstadisticasPartidos;
};
