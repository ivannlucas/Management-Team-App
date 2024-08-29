"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, SequelizeTypes) => {
    const Entrenadores = sequelize.define('entrenadores', {
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
        nombre_entrenador: {
            type: SequelizeTypes.STRING,
            allowNull: false
        },
        edad: {
            type: SequelizeTypes.INTEGER
        },
        anios_experiencia: {
            type: SequelizeTypes.INTEGER
        },
        equipo_actual: {
            type: SequelizeTypes.STRING
        },
        licencia: {
            type: SequelizeTypes.STRING
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return Entrenadores;
};
