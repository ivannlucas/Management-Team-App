"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _mensajes = require("../controllers/mensajes.controller");
function _default(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });

  // Rutas para operaciones CRUD de Mensajes
  app.post("/api/mensajes", _mensajes.createMensaje);
  app.get("/api/mensajes", _mensajes.getAllMensajes);
  app.get('/api/mensajes/conversacion/:id', _mensajes.getMensajesByConversacion);
  app.get("/api/mensajes/:id", _mensajes.getMensajeById);
  app.get('/api/mensajes/ultimo/:id', _mensajes.getUltimoMensajeByConversacion);
  app.put("/api/mensajes/:id", _mensajes.updateMensaje);
  app["delete"]("/api/mensajes/:id", _mensajes.deleteMensaje);
}