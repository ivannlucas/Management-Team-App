"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _conversaciones = require("../controllers/conversaciones.controller");
function _default(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });

  // Rutas para operaciones CRUD de Conversaciones
  app.post("/api/conversaciones", _conversaciones.createConversacion);
  app.get("/api/conversaciones", _conversaciones.getAllConversaciones);
  app.get("/api/conversaciones/usuario/:userId", _conversaciones.getAllConversacionesByUsuario); // Asegúrate de que este endpoint esté correctamente implementado en el controlador
  app.get("/api/conversaciones/:id", _conversaciones.getConversacionById);
  app.put("/api/conversaciones/:id", _conversaciones.updateConversacion);
  app["delete"]("/api/conversaciones/:id", _conversaciones.deleteConversacion);
}