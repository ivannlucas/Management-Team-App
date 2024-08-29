"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Configuración de almacenamiento de multer en memoria.
 * Los archivos se guardan en la memoria como un buffer, lo que permite su envío directo a S3 u otros servicios.
 */
var storage = _multer["default"].memoryStorage();

/**
 * Instancia de multer configurada para almacenar archivos en la memoria.
 * Esta instancia se puede usar como middleware en rutas de Express para manejar la carga de archivos.
 * 
 * @example
 * app.post('/upload', upload.single('file'), (req, res) => {
 *   // manejar el archivo cargado en req.file
 * });
 */
var upload = (0, _multer["default"])({
  storage: storage
});
var _default = exports["default"] = upload;