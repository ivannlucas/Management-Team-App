import { Express } from 'express';
import upload from '../middleware/multer'

import {
  createEntrenamiento,
  getAllEntrenamientos,
  getEntrenamientoById,
  getEntrenamientosByEquipoId,
  updateEntrenamiento,
  deleteEntrenamiento,
  uploadExerciseImage,
  deleteExerciseImage
} from '../controllers/entrenamientos.controller';

/**
 * Configura las rutas para el manejo de entrenamientos en la aplicación.
 * 
 * @param {Express} app - La instancia de la aplicación Express.
 */

export default function(app: Express) {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
        next();
    });

    // Rutas para operaciones CRUD de Entrenamientos
    app.post("/api/entrenamientos", createEntrenamiento);
    app.get("/api/entrenamientos", getAllEntrenamientos);
    app.get("/api/entrenamientos/:id", getEntrenamientoById);
    app.get("/api/entrenamientos/equipo/:equipoId", getEntrenamientosByEquipoId);
    app.put("/api/entrenamientos/:id", updateEntrenamiento);
    app.delete("/api/entrenamientos/:id", deleteEntrenamiento);
    app.post('/api/entrenamientos/upload-image', upload.single('image'), uploadExerciseImage);
    app.delete('/api/entrenamientos/:id/delete-image', deleteExerciseImage);
}
