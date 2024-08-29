"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setupAuthenticationRoutes;
var _autenticacion = require("../controllers/autenticacion.controller");
//Importar Controlador

function setupAuthenticationRoutes(app) {
  // Middleware opcional para configurar headers o realizar otras operaciones antes de las rutas
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, Content-Type, Accept");
    next();
  });

  // Rutas para el manejo de la autenticación
  app.post("/api/auth/register", _autenticacion.register);
  app.post("/api/auth/login", _autenticacion.login);
  app.post("/api/auth/change-password", _autenticacion.changePassword);
  app.get("/api/auth/verify-email", _autenticacion.verifyEmail);
  app.post("/api/auth/reset-password", _autenticacion.resetPassword);
}