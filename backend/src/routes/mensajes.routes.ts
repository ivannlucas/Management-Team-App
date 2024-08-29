import { Express } from 'express';
import {
  createMensaje,
  getAllMensajes,
  getMensajesByConversacion,
  getMensajeById,
  getUltimoMensajeByConversacion,
  updateMensaje,
  deleteMensaje
} from '../controllers/mensajes.controller';

/**
 * Configura las rutas para el manejo de mensajes en la aplicación.
 * 
 * @param {Express} app - La instancia de la aplicación Express.
 */

export default function(app: Express) {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
        next();
    });

    // Rutas para operaciones CRUD de Mensajes
    app.post("/api/mensajes", createMensaje);
    app.get("/api/mensajes", getAllMensajes);
    app.get('/api/mensajes/conversacion/:id', getMensajesByConversacion);
    app.get("/api/mensajes/:id", getMensajeById);
    app.get('/api/mensajes/ultimo/:id', getUltimoMensajeByConversacion);
    app.put("/api/mensajes/:id", updateMensaje);
    app.delete("/api/mensajes/:id", deleteMensaje);
}
