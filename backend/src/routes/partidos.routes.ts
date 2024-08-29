import { Express } from 'express';
import {
  createPartido,
  getAllPartidos,
  getPartidoById,
  updatePartido,
  deletePartido
} from '../controllers/partidos.controller';


/**
 * Configura las rutas para el manejo de partidos en la aplicación.
 * 
 * @param {Express} app - La instancia de la aplicación Express.
 */

export default function(app: Express) {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
        next();
    });

    // Rutas para operaciones CRUD de Partidos
    app.post("/api/partidos", createPartido);
    app.get("/api/partidos", getAllPartidos);
    app.get("/api/partidos/:id", getPartidoById);
    app.put("/api/partidos/:id", updatePartido);
    app.delete("/api/partidos/:id", deletePartido);
}
