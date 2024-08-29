import { Express } from 'express';
import {
  createJugador,
  getAllJugadores,
  getJugadoresByEquipoId,
  getJugadorById,
  updateJugador,
  updateJugadorDetalles,
  deleteJugador
} from '../controllers/jugadores.controller';


/**
 * Configura las rutas para el manejo de jugadores en la aplicación.
 * 
 * @param {Express} app - La instancia de la aplicación Express.
 */

export default function(app: Express) {
    // Middleware para configurar headers que podrías necesitar para CORS
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
        next();
    });

    // Rutas para operaciones CRUD de Jugadores
    app.post("/api/jugadores", createJugador);  
    app.get("/api/jugadores", getAllJugadores);  
    app.get("/api/jugadores/equipo/:equipoId", getJugadoresByEquipoId); 
    app.get("/api/jugadores/:id", getJugadorById);  
    app.put("/api/jugadores/:id", updateJugador); 
    app.put('/api/jugadores/:id/detalles', updateJugadorDetalles); 
    app.delete("/api/jugadores/:id", deleteJugador);  
}
