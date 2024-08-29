"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _equipo = require("../controllers/equipo.controller");
// Importar Controlador de Equipo

function _default(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  // Definición de las rutas para equipos
  app.post("/api/equipos", _equipo.createEquipo);
  app.get("/api/equipos", _equipo.getAllEquipos);
  app.get("/api/equipos/:id", _equipo.getEquipoById);
  app.get("/api/equipos/token/:token", _equipo.getEquipoByToken);
  app.put("/api/equipos/:id", _equipo.updateEquipo);
  app["delete"]("/api/equipos/:id", _equipo.deleteEquipo);
}