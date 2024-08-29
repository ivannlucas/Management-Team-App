"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, SequelizeTypes) => {
    const Usuarios = sequelize.define('usuarios', {
        id: {
            type: SequelizeTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: SequelizeTypes.STRING,
            allowNull: false
        },
        email: {
            type: SequelizeTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: SequelizeTypes.STRING,
            allowNull: false
        },
        rol: {
            type: SequelizeTypes.STRING,
            allowNull: false
        },
        imagen: {
            type: SequelizeTypes.STRING
        },
        conversaciones: {
            type: SequelizeTypes.JSON
        },
        isVerified: {
            type: SequelizeTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return Usuarios;
};
