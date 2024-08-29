import { Express } from 'express';
import {
  createEntrenador,
  getAllEntrenadores,
  getEntrenadorById,
  updateEntrenador,
  updateEntrenadorDetalles,
  deleteEntrenador
} from '../controllers/entrenadores.controller';

/**
 * Configura las rutas para el manejo de entrenadores en la aplicación.
 * 
 * @param {Express} app - La instancia de la aplicación Express.
 */

export default function(app: Express) {
    
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
        next();
    });

    // Rutas para operaciones CRUD de Entrenadores
    app.post("/api/entrenadores", createEntrenador);  
    app.get("/api/entrenadores", getAllEntrenadores);  
    app.get("/api/entrenadores/:id", getEntrenadorById);  
    app.put("/api/entrenadores/:id", updateEntrenador);  
    app.put('/api/entrenadores/:id/detalles', updateEntrenadorDetalles);
    app.delete("/api/entrenadores/:id", deleteEntrenador);  
}
