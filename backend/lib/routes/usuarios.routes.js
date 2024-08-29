"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _multer = _interopRequireDefault(require("../middleware/multer"));
var _usuarios = require("../controllers/usuarios.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//Importar Controlador

function _default(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  //definicion de las rutas
  app.post("/api/users", _usuarios.createUsuario);
  app.get("/api/users", _usuarios.getAllUsuarios);
  app.get("/api/users/equipo/:equipoId", _usuarios.getUsuariosByEquipo);
  app.get("/api/users/:id", _usuarios.getUsuarioById);
  // Aplicar multer en la ruta PUT para manejar la subida de archivos
  app.put("/api/users/:id", _multer["default"].single('imagen'), _usuarios.updateUsuario);
  app["delete"]("/api/users/:id", _usuarios.deleteUsuario);
}