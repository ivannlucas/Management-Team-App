import { Express } from 'express';
import {
  createNotaCalendario,
  getAllNotasCalendario,
  getNotaCalendarioById,
  updateNotaCalendario,
  deleteNotaCalendario
} from '../controllers/notas.controller';

/**
 * Configura las rutas para el manejo de notas en el calendario de la aplicación.
 * 
 * @param {Express} app - La instancia de la aplicación Express.
 */

export default function(app: Express) {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
        next();
    });

    // Rutas para operaciones CRUD de Notas Calendario
    app.post("/api/notas-calendario", createNotaCalendario);
    app.get("/api/notas-calendario", getAllNotasCalendario);
    app.get("/api/notas-calendario/:id", getNotaCalendarioById);
    app.put("/api/notas-calendario/:id", updateNotaCalendario);
    app.delete("/api/notas-calendario/:id", deleteNotaCalendario);
}
