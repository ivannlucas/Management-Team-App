"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, SequelizeTypes) => {
    const Equipo = sequelize.define('equipo', {
        id: {
            type: SequelizeTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: SequelizeTypes.STRING,
            allowNull: false,
            unique: true
        },
        nombre_equipo: {
            type: SequelizeTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return Equipo;
};
