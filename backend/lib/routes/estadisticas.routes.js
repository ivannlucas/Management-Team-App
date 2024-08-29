"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _estadisticas = require("../controllers/estadisticas.controller");
function _default(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });

  // Rutas para operaciones CRUD de Estadisticas
  app.post("/api/estadisticas", _estadisticas.createEstadistica);
  app.get("/api/estadisticas", _estadisticas.getAllEstadisticas);
  app.get("/api/estadisticas/:id", _estadisticas.getEstadisticaById);
  app.put("/api/estadisticas/:id", _estadisticas.updateEstadistica);
  app["delete"]("/api/estadisticas/:id", _estadisticas.deleteEstadistica);
}