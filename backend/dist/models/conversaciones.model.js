"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, SequelizeTypes) => {
    const Conversaciones = sequelize.define('conversaciones', {
        id: {
            type: SequelizeTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: SequelizeTypes.INTEGER,
            allowNull: false
        },
        destinatario_id: {
            type: SequelizeTypes.INTEGER,
            allowNull: false
        },
        mensajes: {
            type: SequelizeTypes.JSON
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return Conversaciones;
};
