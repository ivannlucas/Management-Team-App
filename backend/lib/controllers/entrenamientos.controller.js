"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadExerciseImage = exports.updateEntrenamiento = exports.getEntrenamientosByEquipoId = exports.getEntrenamientoById = exports.getAllEntrenamientos = exports.deleteExerciseImage = exports.deleteEntrenamiento = exports.createEntrenamiento = void 0;
var _models = _interopRequireDefault(require("../models"));
var _aws = require("../utils/aws");
var _uuid = require("uuid");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Crea un nuevo entrenamiento en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el entrenamiento creado o un mensaje de error.
 */
var createEntrenamiento = exports.createEntrenamiento = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var entrenamiento;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _models["default"].entrenamientos.create(req.body);
        case 3:
          entrenamiento = _context.sent;
          return _context.abrupt("return", res.status(200).json(entrenamiento));
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(400).json({
            message: _context.t0.message
          }));
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function createEntrenamiento(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Obtiene todos los entrenamientos de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con todos los entrenamientos o un mensaje de error.
 */
var getAllEntrenamientos = exports.getAllEntrenamientos = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var entrenamientos;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _models["default"].entrenamientos.findAll();
        case 3:
          entrenamientos = _context2.sent;
          return _context2.abrupt("return", res.status(200).json(entrenamientos));
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(400).json({
            message: _context2.t0.message
          }));
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function getAllEntrenamientos(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Obtiene un entrenamiento por su ID.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el entrenamiento encontrado o un mensaje de error.
 */
var getEntrenamientoById = exports.getEntrenamientoById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, entrenamiento;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return _models["default"].entrenamientos.findByPk(id);
        case 4:
          entrenamiento = _context3.sent;
          if (entrenamiento) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Entrenamiento no encontrado'
          }));
        case 7:
          return _context3.abrupt("return", res.status(200).json(entrenamiento));
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", res.status(400).json({
            message: _context3.t0.message
          }));
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 10]]);
  }));
  return function getEntrenamientoById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Obtiene todos los entrenamientos asociados a un equipo específico.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con los entrenamientos encontrados o un mensaje de error.
 */
var getEntrenamientosByEquipoId = exports.getEntrenamientosByEquipoId = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var equipoId, entrenamientos;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          equipoId = req.params.equipoId;
          _context4.prev = 1;
          _context4.next = 4;
          return _models["default"].entrenamientos.findAll({
            where: {
              equipo_id: equipoId
            }
          });
        case 4:
          entrenamientos = _context4.sent;
          return _context4.abrupt("return", res.status(200).json(entrenamientos));
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          return _context4.abrupt("return", res.status(400).json({
            message: _context4.t0.message
          }));
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 8]]);
  }));
  return function getEntrenamientosByEquipoId(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Actualiza un entrenamiento en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el entrenamiento actualizado o un mensaje de error.
 */
var updateEntrenamiento = exports.updateEntrenamiento = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, updated, updatedEntrenamiento;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return _models["default"].entrenamientos.update(req.body, {
            where: {
              id: id
            }
          });
        case 4:
          updated = _context5.sent;
          if (!updated) {
            _context5.next = 10;
            break;
          }
          _context5.next = 8;
          return _models["default"].entrenamientos.findByPk(id);
        case 8:
          updatedEntrenamiento = _context5.sent;
          return _context5.abrupt("return", res.status(200).json(updatedEntrenamiento));
        case 10:
          throw new Error('Entrenamiento no encontrado');
        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](1);
          return _context5.abrupt("return", res.status(400).json({
            message: _context5.t0.message
          }));
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 13]]);
  }));
  return function updateEntrenamiento(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Elimina un entrenamiento y sus imágenes asociadas de la base de datos y de S3.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Respuesta de éxito o un mensaje de error.
 */
var deleteEntrenamiento = exports.deleteEntrenamiento = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, entrenamiento, exercises, _iterator, _step, exercise, bucketName, fileName, folderPath;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.prev = 1;
          _context6.next = 4;
          return _models["default"].entrenamientos.findByPk(id);
        case 4:
          entrenamiento = _context6.sent;
          if (entrenamiento) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'Entrenamiento no encontrado'
          }));
        case 7:
          // Eliminar imágenes asociadas
          exercises = entrenamiento.exercises;
          _iterator = _createForOfIteratorHelper(exercises);
          _context6.prev = 9;
          _iterator.s();
        case 11:
          if ((_step = _iterator.n()).done) {
            _context6.next = 21;
            break;
          }
          exercise = _step.value;
          if (!exercise.image_id) {
            _context6.next = 19;
            break;
          }
          bucketName = 'awsbucketmanagement';
          fileName = exercise.image_id.replace("https://".concat(bucketName, ".s3.eu-north-1.amazonaws.com/uploads/exercises/"), '');
          folderPath = 'uploads/exercises';
          _context6.next = 19;
          return (0, _aws.deleteFileFromS3)(fileName, bucketName, folderPath);
        case 19:
          _context6.next = 11;
          break;
        case 21:
          _context6.next = 26;
          break;
        case 23:
          _context6.prev = 23;
          _context6.t0 = _context6["catch"](9);
          _iterator.e(_context6.t0);
        case 26:
          _context6.prev = 26;
          _iterator.f();
          return _context6.finish(26);
        case 29:
          _context6.next = 31;
          return _models["default"].entrenamientos.destroy({
            where: {
              id: id
            }
          });
        case 31:
          return _context6.abrupt("return", res.status(204).send());
        case 34:
          _context6.prev = 34;
          _context6.t1 = _context6["catch"](1);
          console.error('Error al eliminar el entrenamiento: ', _context6.t1);
          return _context6.abrupt("return", res.status(500).json({
            message: _context6.t1.message
          }));
        case 38:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 34], [9, 23, 26, 29]]);
  }));
  return function deleteEntrenamiento(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Sube una imagen de ejercicio a S3 y guarda la URL.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con la URL de la imagen subida o un mensaje de error.
 */
var uploadExerciseImage = exports.uploadExerciseImage = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var fileBuffer, originalFileName, fileExtension, uniqueFileName, bucketName, folderPath, s3Response, imageUrl;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          if (req.file) {
            _context7.next = 3;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: 'No file provided'
          }));
        case 3:
          fileBuffer = req.file.buffer;
          originalFileName = req.file.originalname;
          fileExtension = originalFileName.split('.').pop(); // Obtener la extensión del archivo
          uniqueFileName = "".concat((0, _uuid.v4)(), ".").concat(fileExtension); // Generar un nombre de archivo único
          console.log("UniqueFileName: ", uniqueFileName);
          bucketName = 'awsbucketmanagement';
          folderPath = 'uploads/exercises';
          _context7.next = 12;
          return (0, _aws.uploadFileToS3)(fileBuffer, uniqueFileName, bucketName, folderPath);
        case 12:
          s3Response = _context7.sent;
          imageUrl = s3Response.Location; // Obtener la URL de la imagen subida
          return _context7.abrupt("return", res.status(200).json({
            imageUrl: imageUrl
          }));
        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", res.status(500).json({
            message: _context7.t0.message
          }));
        case 20:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 17]]);
  }));
  return function uploadExerciseImage(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Elimina una imagen de ejercicio específica de la base de datos y de S3.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Respuesta de éxito o un mensaje de error.
 */
var deleteExerciseImage = exports.deleteExerciseImage = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var id, exerciseIndex, entrenamiento, exercises, image_id, bucketName, fileName, folderPath;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          exerciseIndex = req.body.exerciseIndex; // Índice del ejercicio dentro del array
          if (!(!id || exerciseIndex === undefined)) {
            _context8.next = 4;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            message: 'No id or exercise index provided'
          }));
        case 4:
          _context8.prev = 4;
          _context8.next = 7;
          return _models["default"].entrenamientos.findByPk(id);
        case 7:
          entrenamiento = _context8.sent;
          if (entrenamiento) {
            _context8.next = 10;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: 'Entrenamiento no encontrado'
          }));
        case 10:
          exercises = entrenamiento.exercises; // Verificar que el índice sea válido
          if (!(exerciseIndex < 0 || exerciseIndex >= exercises.length)) {
            _context8.next = 13;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            message: 'Índice de ejercicio inválido'
          }));
        case 13:
          image_id = exercises[exerciseIndex].image_id;
          if (!image_id) {
            _context8.next = 26;
            break;
          }
          bucketName = 'awsbucketmanagement';
          fileName = image_id.replace("https://".concat(bucketName, ".s3.eu-north-1.amazonaws.com/uploads/exercises/"), '');
          folderPath = 'uploads/exercises';
          _context8.next = 20;
          return (0, _aws.deleteFileFromS3)(fileName, bucketName, folderPath);
        case 20:
          // Eliminar la referencia a la imagen en el ejercicio específico
          exercises[exerciseIndex].image_id = null;

          // Guardar los cambios en la base de datos
          _context8.next = 23;
          return _models["default"].entrenamientos.update({
            exercises: exercises
          }, {
            where: {
              id: id
            }
          });
        case 23:
          return _context8.abrupt("return", res.status(200).json({
            message: 'Imagen eliminada con éxito'
          }));
        case 26:
          return _context8.abrupt("return", res.status(400).json({
            message: 'No se encontró imagen para eliminar'
          }));
        case 27:
          _context8.next = 33;
          break;
        case 29:
          _context8.prev = 29;
          _context8.t0 = _context8["catch"](4);
          console.error('Error al eliminar la imagen: ', _context8.t0);
          return _context8.abrupt("return", res.status(500).json({
            message: _context8.t0.message
          }));
        case 33:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[4, 29]]);
  }));
  return function deleteExerciseImage(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();