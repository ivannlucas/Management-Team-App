"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _entrenadores = require("../controllers/entrenadores.controller");
function _default(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });

  // Rutas para operaciones CRUD de Entrenadores
  app.post("/api/entrenadores", _entrenadores.createEntrenador);
  app.get("/api/entrenadores", _entrenadores.getAllEntrenadores);
  app.get("/api/entrenadores/:id", _entrenadores.getEntrenadorById);
  app.put("/api/entrenadores/:id", _entrenadores.updateEntrenador);
  app.put('/api/entrenadores/:id/detalles', _entrenadores.updateEntrenadorDetalles);
  app["delete"]("/api/entrenadores/:id", _entrenadores.deleteEntrenador);
}