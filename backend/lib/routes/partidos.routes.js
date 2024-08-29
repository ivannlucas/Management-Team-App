"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _partidos = require("../controllers/partidos.controller");
function _default(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });

  // Rutas para operaciones CRUD de Partidos
  app.post("/api/partidos", _partidos.createPartido);
  app.get("/api/partidos", _partidos.getAllPartidos);
  app.get("/api/partidos/:id", _partidos.getPartidoById);
  app.put("/api/partidos/:id", _partidos.updatePartido);
  app["delete"]("/api/partidos/:id", _partidos.deletePartido);
}