"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _notas = require("../controllers/notas.controller");
function _default(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });

  // Rutas para operaciones CRUD de Notas Calendario
  app.post("/api/notas-calendario", _notas.createNotaCalendario);
  app.get("/api/notas-calendario", _notas.getAllNotasCalendario);
  app.get("/api/notas-calendario/:id", _notas.getNotaCalendarioById);
  app.put("/api/notas-calendario/:id", _notas.updateNotaCalendario);
  app["delete"]("/api/notas-calendario/:id", _notas.deleteNotaCalendario);
}