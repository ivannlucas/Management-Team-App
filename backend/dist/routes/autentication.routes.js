"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Importar Controlador
const autenticacion_controller_1 = require("../controllers/autenticacion.controller");
function setupAuthenticationRoutes(app) {
    // Middleware opcional para configurar headers o realizar otras operaciones antes de las rutas
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "Authorization, Origin, Content-Type, Accept");
        next();
    });
    // Rutas para el manejo de la autenticación
    app.post("/api/auth/register", autenticacion_controller_1.register);
    app.post("/api/auth/login", autenticacion_controller_1.login);
    app.post("/api/auth/change-password", autenticacion_controller_1.changePassword);
    app.get("/api/auth/verify-email", autenticacion_controller_1.verifyEmail);
}
exports.default = setupAuthenticationRoutes;
