"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, SequelizeTypes) => {
    const Entrenamientos = sequelize.define('entrenamientos', {
        id: {
            type: SequelizeTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        created_at: {
            type: SequelizeTypes.DATE,
            allowNull: false,
            defaultValue: SequelizeTypes.fn('now')
        },
        equipo_id: {
            type: SequelizeTypes.INTEGER,
            allowNull: false
        },
        exercises: {
            type: SequelizeTypes.JSON
        },
        fecha: {
            type: SequelizeTypes.DATE,
            allowNull: false
        },
        hora_fin: {
            type: SequelizeTypes.DATE,
            allowNull: false
        },
        hora_inicio: {
            type: SequelizeTypes.DATE,
            allowNull: false
        },
        name: {
            type: SequelizeTypes.STRING,
            allowNull: false
        },
        numExercises: {
            type: SequelizeTypes.INTEGER
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return Entrenamientos;
};
