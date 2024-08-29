import { Express } from "express";

//Importar Controlador
import {
    register,
    login,
    changePassword,
    verifyEmail,
    resetPassword
} from '../controllers/autenticacion.controller';

/**
 * Configura las rutas de autenticación para la aplicación.
 * 
 * @param {Express} app - La instancia de la aplicación Express.
 */

export default function setupAuthenticationRoutes(app: Express) {
    // Middleware opcional para configurar headers o realizar otras operaciones antes de las rutas
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers", 
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    // Rutas para el manejo de la autenticación
    app.post("/api/auth/register", register);       
    app.post("/api/auth/login", login);             
    app.post("/api/auth/change-password", changePassword); 
    app.get("/api/auth/verify-email", verifyEmail); 
    app.post("/api/auth/reset-password", resetPassword);
}