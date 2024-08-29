"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, SequelizeTypes) => {
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
    });
    return Jugadores;
};
