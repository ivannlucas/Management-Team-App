"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _conversaciones = _interopRequireDefault(require("./conversaciones.model"));
var _entrenadores = _interopRequireDefault(require("./entrenadores.model"));
var _entrenamientos = _interopRequireDefault(require("./entrenamientos.model"));
var _equipo = _interopRequireDefault(require("./equipo.model"));
var _estadisticas_partido = _interopRequireDefault(require("./estadisticas_partido.model"));
var _estadisticas = _interopRequireDefault(require("./estadisticas.model"));
var _jugadores = _interopRequireDefault(require("./jugadores.model"));
var _mensajes = _interopRequireDefault(require("./mensajes.model"));
var _notas = _interopRequireDefault(require("./notas.model"));
var _partidos = _interopRequireDefault(require("./partidos.model"));
var _usuarios = _interopRequireDefault(require("./usuarios.model"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Inicializa la conexión de Sequelize a la base de datos PostgreSQL.
 * 
 * @constant
 * @type {Sequelize}
 */
var sequelize = new _sequelize.Sequelize('postgresdb', 'postgres', 'postgres', {
  host: 'db',
  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

/**
 * Objeto que contiene todas las definiciones de modelos y la instancia de Sequelize.
 * 
 * @namespace db
 * @property {Sequelize} Sequelize - Clase Sequelize.
 * @property {Sequelize} sequelize - Instancia de Sequelize.
 * @property {Model} usuarios - Modelo `Usuarios`.
 * @property {Model} jugadores - Modelo `Jugadores`.
 * @property {Model} entrenadores - Modelo `Entrenadores`.
 * @property {Model} estadisticas - Modelo `Estadisticas`.
 * @property {Model} equipo - Modelo `Equipo`.
 * @property {Model} partidos - Modelo `Partidos`.
 * @property {Model} entrenamientos - Modelo `Entrenamientos`.
 * @property {Model} notasCalendario - Modelo `NotasCalendario`.
 * @property {Model} conversaciones - Modelo `Conversaciones`.
 * @property {Model} mensajes - Modelo `Mensajes`.
 * @property {Model} estadisticasPartidos - Modelo `EstadisticasPartidos`.
 */
var db = {};
db.Sequelize = _sequelize.Sequelize;
db.sequelize = sequelize;

// MODELOS
db.usuarios = (0, _usuarios["default"])(sequelize, _sequelize.Sequelize);
db.jugadores = (0, _jugadores["default"])(sequelize, _sequelize.Sequelize);
db.entrenadores = (0, _entrenadores["default"])(sequelize, _sequelize.Sequelize);
db.estadisticas = (0, _estadisticas["default"])(sequelize, _sequelize.Sequelize);
db.equipo = (0, _equipo["default"])(sequelize, _sequelize.Sequelize);
db.partidos = (0, _partidos["default"])(sequelize, _sequelize.Sequelize);
db.entrenamientos = (0, _entrenamientos["default"])(sequelize, _sequelize.Sequelize);
db.notasCalendario = (0, _notas["default"])(sequelize, _sequelize.Sequelize);
db.conversaciones = (0, _conversaciones["default"])(sequelize, _sequelize.Sequelize);
db.mensajes = (0, _mensajes["default"])(sequelize, _sequelize.Sequelize);
db.estadisticasPartidos = (0, _estadisticas_partido["default"])(sequelize, _sequelize.Sequelize);

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

// Relación de uno a muchos

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
var _default = exports["default"] = db;