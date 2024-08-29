"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _jugadores = require("../controllers/jugadores.controller");
function _default(app) {
  // Middleware para configurar headers que podrías necesitar para CORS
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });

  // Rutas para operaciones CRUD de Jugadores
  app.post("/api/jugadores", _jugadores.createJugador);
  app.get("/api/jugadores", _jugadores.getAllJugadores);
  app.get("/api/jugadores/equipo/:equipoId", _jugadores.getJugadoresByEquipoId);
  app.get("/api/jugadores/:id", _jugadores.getJugadorById);
  app.put("/api/jugadores/:id", _jugadores.updateJugador);
  app.put('/api/jugadores/:id/detalles', _jugadores.updateJugadorDetalles);
  app["delete"]("/api/jugadores/:id", _jugadores.deleteJugador);
}