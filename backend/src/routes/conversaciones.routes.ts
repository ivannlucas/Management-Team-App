import { Express } from 'express';
import {
  createConversacion,
  getAllConversaciones,
  getAllConversacionesByUsuario,
  getConversacionById,
  updateConversacion,
  deleteConversacion
} from '../controllers/conversaciones.controller';

/**
 * Configura las rutas para el manejo de conversaciones en la aplicación.
 * 
 * @param {Express} app - La instancia de la aplicación Express.
 */

export default function(app: Express) {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
        next();
    });

    // Rutas para operaciones CRUD de Conversaciones
    app.post("/api/conversaciones", createConversacion);
    app.get("/api/conversaciones", getAllConversaciones);
    app.get("/api/conversaciones/usuario/:userId", getAllConversacionesByUsuario); // Asegúrate de que este endpoint esté correctamente implementado en el controlador
    app.get("/api/conversaciones/:id", getConversacionById);
    app.put("/api/conversaciones/:id", updateConversacion);
    app.delete("/api/conversaciones/:id", deleteConversacion);
}
