import { Sequelize } from "sequelize";
import { Config } from '../config'

import Converaciones from './conversaciones.model'
import Entrenadores from './entrenadores.model'
import Entrenamientos from './entrenamientos.model'
import Equipo from './equipo.model'
import EstadisticasPartidos from './estadisticas_partido.model'
import Estadisticas from './estadisticas.model'
import Jugadores from './jugadores.model'
import Mensajes from './mensajes.model'
import NotasCalendario from './notas.model'
import Partidos from './partidos.model'
import Usuarios from './usuarios.model'

/**
 * Inicializa la conexión de Sequelize a la base de datos PostgreSQL.
 * 
 * @constant
 * @type {Sequelize}
 */
const sequelize: Sequelize = new Sequelize(
    'postgresdb', 
    'postgres', 
    'postgres', 
    {
        host: 'db',
        port: 5432,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
)

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
const db: any = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

// MODELOS
db.usuarios = Usuarios(sequelize, Sequelize);
db.jugadores = Jugadores(sequelize, Sequelize);
db.entrenadores = Entrenadores(sequelize, Sequelize);
db.estadisticas = Estadisticas(sequelize, Sequelize);
db.equipo = Equipo(sequelize, Sequelize);
db.partidos = Partidos(sequelize, Sequelize);
db.entrenamientos = Entrenamientos(sequelize, Sequelize);
db.notasCalendario = NotasCalendario(sequelize, Sequelize);
db.conversaciones = Converaciones(sequelize, Sequelize);
db.mensajes = Mensajes(sequelize, Sequelize);
db.estadisticasPartidos = EstadisticasPartidos(sequelize, Sequelize);

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

export default db;
