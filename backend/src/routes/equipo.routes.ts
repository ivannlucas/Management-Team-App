import { Request, Response, NextFunction, Express } from "express";

// Importar Controlador de Equipo
import {
    createEquipo,
    getAllEquipos,
    getEquipoById,
    updateEquipo,
    deleteEquipo,
    getEquipoByToken
} from '../controllers/equipo.controller';

/**
 * Configura las rutas para el manejo de equipos en la aplicación.
 * 
 * @param {Express} app - La instancia de la aplicación Express.
 */

export default function(app: Express) {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Definición de las rutas para equipos
    app.post("/api/equipos", createEquipo);
    app.get("/api/equipos", getAllEquipos);
    app.get("/api/equipos/:id", getEquipoById);
    app.get("/api/equipos/token/:token", getEquipoByToken);
    app.put("/api/equipos/:id", updateEquipo);
    app.delete("/api/equipos/:id", deleteEquipo);
    
}
