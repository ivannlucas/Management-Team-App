"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, SequelizeTypes) => {
    const Partidos = sequelize.define('partidos', {
        id: {
            type: SequelizeTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        equipo_local_id: {
            type: SequelizeTypes.INTEGER,
            allowNull: false
        },
        equipo_visitante_id: {
            type: SequelizeTypes.INTEGER,
            allowNull: false
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
};
