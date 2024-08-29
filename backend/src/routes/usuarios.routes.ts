import { Request, Response, NextFunction, Express } from "express";

import upload from '../middleware/multer'

//Importar Controlador
import {createUsuario, 
	getAllUsuarios, 
	getUsuariosByEquipo,
	getUsuarioById, 
	updateUsuario,
	deleteUsuario
} from '../controllers/usuarios.controller' 

/**
 * Configura las rutas para el manejo de usuarios en la aplicación.
 * 
 * @param {Express} app - La instancia de la aplicación Express.
 */

export default function( app: Express){
    app.use((req: Request, res: Response, next: NextFunction) => {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

    //definicion de las rutas
	app.post("/api/users", createUsuario); 
	app.get("/api/users", getAllUsuarios)
	app.get("/api/users/equipo/:equipoId", getUsuariosByEquipo);
	app.get("/api/users/:id", getUsuarioById);
	// Aplicar multer en la ruta PUT para manejar la subida de archivos
    app.put("/api/users/:id", upload.single('imagen'), updateUsuario);
	app.delete("/api/users/:id", deleteUsuario);
}