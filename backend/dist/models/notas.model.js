"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, SequelizeTypes) => {
    const NotasCalendario = sequelize.define('notas_calendario', {
        id: {
            type: SequelizeTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        equipo_id: {
            type: SequelizeTypes.INTEGER,
            allowNull: false
        },
        titulo: {
            type: SequelizeTypes.STRING,
            allowNull: false
        },
        type: {
            type: SequelizeTypes.ENUM('partido', 'entrenamiento', 'vacaciones') // Asegúrate de definir este ENUM en la base de datos o Sequelize según tu configuración
        },
        fecha_hora: {
            type: SequelizeTypes.DATE,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return NotasCalendario;
};
