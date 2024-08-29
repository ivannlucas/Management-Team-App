"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, SequelizeTypes) => {
    const Mensajes = sequelize.define('mensajes', {
        id: {
            type: SequelizeTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        contenido: {
            type: SequelizeTypes.STRING,
            allowNull: false
        },
        fecha_hora: {
            type: SequelizeTypes.DATE,
            allowNull: false
        },
        conversacion_id: {
            type: SequelizeTypes.INTEGER,
            allowNull: false
        },
        remitente_id: {
            type: SequelizeTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return Mensajes;
};
