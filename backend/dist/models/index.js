"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conversaciones_model_1 = __importDefault(require("./conversaciones.model"));
const entrenadores_model_1 = __importDefault(require("./entrenadores.model"));
const entrenamientos_model_1 = __importDefault(require("./entrenamientos.model"));
const equipo_model_1 = __importDefault(require("./equipo.model"));
const estadisticas_partido_model_1 = __importDefault(require("./estadisticas_partido.model"));
const estadisticas_model_1 = __importDefault(require("./estadisticas.model"));
const jugadores_model_1 = __importDefault(require("./jugadores.model"));
const mensajes_model_1 = __importDefault(require("./mensajes.model"));
const notas_model_1 = __importDefault(require("./notas.model"));
const partidos_model_1 = __importDefault(require("./partidos.model"));
const usuarios_model_1 = __importDefault(require("./usuarios.model"));
const sequelize = new sequelize_1.Sequelize('postgresdb', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
const db = {};
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = sequelize;
//MODELOS
db.usuarios = (0, usuarios_model_1.default)(sequelize, sequelize_1.Sequelize);
db.jugadores = (0, jugadores_model_1.default)(sequelize, sequelize_1.Sequelize);
db.entrenadores = (0, entrenadores_model_1.default)(sequelize, sequelize_1.Sequelize);
db.estadisticas = (0, estadisticas_model_1.default)(sequelize, sequelize_1.Sequelize);
db.equipo = (0, equipo_model_1.default)(sequelize, sequelize_1.Sequelize);
db.partidos = (0, partidos_model_1.default)(sequelize, sequelize_1.Sequelize);
db.entrenamientos = (0, entrenamientos_model_1.default)(sequelize, sequelize_1.Sequelize);
db.notasCalendario = (0, notas_model_1.default)(sequelize, sequelize_1.Sequelize);
db.conversaciones = (0, conversaciones_model_1.default)(sequelize, sequelize_1.Sequelize);
db.mensajes = (0, mensajes_model_1.default)(sequelize, sequelize_1.Sequelize);
db.estadisticasPartidos = (0, estadisticas_partido_model_1.default)(sequelize, sequelize_1.Sequelize);
// Definir relaciones
// Jugadores
db.jugadores.belongsTo(db.usuarios, {
    as: 'usuario',
    foreignKey: 'usuario_id'
});
db.jugadores.belongsTo(db.equipo, {
    as: 'equipo',
    foreignKey: 'equipo_id'
});
// Entrenadores
db.entrenadores.belongsTo(db.usuarios, {
    as: 'usuario',
    foreignKey: 'usuario_id'
});
db.entrenadores.belongsTo(db.equipo, {
    as: 'equipo',
    foreignKey: 'equipo_id'
});
// Partidos
db.partidos.belongsTo(db.equipo, {
    as: 'equipoLocal',
    foreignKey: 'equipo_local_id'
});
db.partidos.belongsTo(db.equipo, {
    as: 'equipoVisitante',
    foreignKey: 'equipo_visitante_id'
});
db.partidos.belongsTo(db.estadisticasPartidos, {
    as: 'estadisticasPartido',
    foreignKey: 'estadisticas_partido_id'
});
// Entrenamientos
db.entrenamientos.belongsTo(db.equipo, {
    as: 'equipo',
    foreignKey: 'equipo_id'
});
// Notas Calendario
db.notasCalendario.belongsTo(db.equipo, {
    as: 'equipo',
    foreignKey: 'equipo_id'
});
// Conversaciones y Mensajes
db.conversaciones.belongsTo(db.usuarios, {
    as: 'usuario',
    foreignKey: 'usuario_id'
});
db.conversaciones.belongsTo(db.usuarios, {
    as: 'destinatario',
    foreignKey: 'destinatario_id'
});
db.mensajes.belongsTo(db.conversaciones, {
    as: 'conversacion',
    foreignKey: 'conversacion_id'
});
db.mensajes.belongsTo(db.usuarios, {
    as: 'remitente',
    foreignKey: 'remitente_id'
});
//hasMany es útil cuando necesitas hacer consultas que recuperan un objeto 
//y todos sus objetos relacionados en una sola llamada, lo cual podría no ser necesario en todos los casos.
// Usuarios puede tener muchos jugadores
db.usuarios.hasMany(db.jugadores, {
    as: 'jugadores',
    foreignKey: 'usuario_id'
});
// Usuarios puede tener muchos entrenadores
db.usuarios.hasMany(db.entrenadores, {
    as: 'entrenadores',
    foreignKey: 'usuario_id'
});
// Equipo puede tener muchos jugadores
db.equipo.hasMany(db.jugadores, {
    as: 'jugadores',
    foreignKey: 'equipo_id'
});
// Equipo puede tener muchos partidos como local
db.equipo.hasMany(db.partidos, {
    as: 'partidosLocal',
    foreignKey: 'equipo_local_id'
});
// Equipo puede tener muchos partidos como visitante
db.equipo.hasMany(db.partidos, {
    as: 'partidosVisitante',
    foreignKey: 'equipo_visitante_id'
});
// Usuarios puede tener muchas conversaciones como iniciador
db.usuarios.hasMany(db.conversaciones, {
    as: 'conversacionesIniciadas',
    foreignKey: 'usuario_id'
});
// Usuarios puede tener muchas conversaciones como destinatario
db.usuarios.hasMany(db.conversaciones, {
    as: 'conversacionesRecibidas',
    foreignKey: 'destinatario_id'
});
// Conversaciones puede tener muchos mensajes
db.conversaciones.hasMany(db.mensajes, {
    as: 'mensajesAsociados',
    foreignKey: 'conversacion_id'
});
exports.default = db;
