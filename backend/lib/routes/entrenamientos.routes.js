"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _multer = _interopRequireDefault(require("../middleware/multer"));
var _entrenamientos = require("../controllers/entrenamientos.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _default(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });

  // Rutas para operaciones CRUD de Entrenamientos
  app.post("/api/entrenamientos", _entrenamientos.createEntrenamiento);
  app.get("/api/entrenamientos", _entrenamientos.getAllEntrenamientos);
  app.get("/api/entrenamientos/:id", _entrenamientos.getEntrenamientoById);
  app.get("/api/entrenamientos/equipo/:equipoId", _entrenamientos.getEntrenamientosByEquipoId);
  app.put("/api/entrenamientos/:id", _entrenamientos.updateEntrenamiento);
  app["delete"]("/api/entrenamientos/:id", _entrenamientos.deleteEntrenamiento);
  app.post('/api/entrenamientos/upload-image', _multer["default"].single('image'), _entrenamientos.uploadExerciseImage);
  app["delete"]('/api/entrenamientos/:id/delete-image', _entrenamientos.deleteExerciseImage);
}