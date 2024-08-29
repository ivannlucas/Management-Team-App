"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _estadisticas_partido = require("../controllers/estadisticas_partido.controller");
function _default(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });

  // Rutas para operaciones CRUD de Estadísticas de Partidos
  app.post("/api/estadisticas-partidos", _estadisticas_partido.createEstadisticasPartido);
  app.get("/api/estadisticas-partidos", _estadisticas_partido.getAllEstadisticasPartidos);
  app.get("/api/estadisticas-partidos/:id", _estadisticas_partido.getEstadisticasPartidoById);
  app.put("/api/estadisticas-partidos/:id", _estadisticas_partido.updateEstadisticasPartido);
  app["delete"]("/api/estadisticas-partidos/:id", _estadisticas_partido.deleteEstadisticasPartido);
}