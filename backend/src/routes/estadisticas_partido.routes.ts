import { Express } from 'express';
import {
  createEstadisticasPartido,
  getAllEstadisticasPartidos,
  getEstadisticasPartidoById,
  updateEstadisticasPartido,
  deleteEstadisticasPartido
} from '../controllers/estadisticas_partido.controller';

/**
 * Configura las rutas para el manejo de estadísticas de partidos en la aplicación.
 * 
 * @param {Express} app - La instancia de la aplicación Express.
 */

export default function(app: Express) {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
        next();
    });

    // Rutas para operaciones CRUD de Estadísticas de Partidos
    app.post("/api/estadisticas-partidos", createEstadisticasPartido);
    app.get("/api/estadisticas-partidos", getAllEstadisticasPartidos);
    app.get("/api/estadisticas-partidos/:id", getEstadisticasPartidoById);
    app.put("/api/estadisticas-partidos/:id", updateEstadisticasPartido);
    app.delete("/api/estadisticas-partidos/:id", deleteEstadisticasPartido);
}
