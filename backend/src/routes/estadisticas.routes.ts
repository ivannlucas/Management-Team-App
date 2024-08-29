import { Express } from 'express';
import {
  createEstadistica,
  getAllEstadisticas,
  getEstadisticaById,
  updateEstadistica,
  deleteEstadistica
} from '../controllers/estadisticas.controller';

/**
 * Configura las rutas para el manejo de estadísticas en la aplicación.
 * 
 * @param {Express} app - La instancia de la aplicación Express.
 */

export default function(app: Express) {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
        next();
    });

    // Rutas para operaciones CRUD de Estadisticas
    app.post("/api/estadisticas", createEstadistica);
    app.get("/api/estadisticas", getAllEstadisticas);
    app.get("/api/estadisticas/:id", getEstadisticaById);
    app.put("/api/estadisticas/:id", updateEstadistica);
    app.delete("/api/estadisticas/:id", deleteEstadistica);
}
