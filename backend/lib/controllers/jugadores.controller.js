"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateJugadorDetalles = exports.updateJugador = exports.getJugadoresByEquipoId = exports.getJugadorById = exports.getAllJugadores = exports.deleteJugador = exports.createJugador = void 0;
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Crea un nuevo jugador en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el jugador creado o un mensaje de error.
 */
var createJugador = exports.createJugador = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, equipo_id, nombre, apellidos, email, pass1, pass2, rol, edad, num_camiseta, peso, altura, posicion, selectedPos, equipoId, edadInt, numCamisetaInt, pesoFloat, alturaFloat, jugador;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, equipo_id = _req$body.equipo_id, nombre = _req$body.nombre, apellidos = _req$body.apellidos, email = _req$body.email, pass1 = _req$body.pass1, pass2 = _req$body.pass2, rol = _req$body.rol, edad = _req$body.edad, num_camiseta = _req$body.num_camiseta, peso = _req$body.peso, altura = _req$body.altura, posicion = _req$body.posicion, selectedPos = _req$body.selectedPos; // Convertir a enteros apropiados o asignar nulos si están vacíos
          equipoId = equipo_id ? parseInt(equipo_id) : null;
          edadInt = edad ? parseInt(edad) : null;
          numCamisetaInt = num_camiseta ? parseInt(num_camiseta) : null;
          pesoFloat = peso ? parseFloat(peso) : null;
          alturaFloat = altura ? parseFloat(altura) : null;
          _context.next = 9;
          return _models["default"].jugadores.create(req.body);
        case 9:
          jugador = _context.sent;
          return _context.abrupt("return", res.status(200).json(jugador));
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.log("ERROR INSERT JUGADOR: ".concat(_context.t0));
          return _context.abrupt("return", res.status(400).json({
            message: _context.t0.message
          }));
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function createJugador(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Obtiene todos los jugadores de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con todos los jugadores o un mensaje de error.
 */
var getAllJugadores = exports.getAllJugadores = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var jugadores;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _models["default"].jugadores.findAll();
        case 3:
          jugadores = _context2.sent;
          return _context2.abrupt("return", res.status(200).json(jugadores));
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
  return function getAllJugadores(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Obtiene todos los jugadores de un equipo por su ID de equipo.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con los jugadores encontrados o un mensaje de error.
 */
var getJugadoresByEquipoId = exports.getJugadoresByEquipoId = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var equipoId, jugadores;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          equipoId = req.params.equipoId;
          console.log("EQUIPO ID: ".concat(equipoId));
          _context3.prev = 2;
          _context3.next = 5;
          return _models["default"].jugadores.findAll({
            where: {
              equipo_id: equipoId
            },
            include: [{
              model: _models["default"].usuarios,
              as: 'usuario',
              attributes: ['nombre', 'apellidos', 'image_id']
            }]
          });
        case 5:
          jugadores = _context3.sent;
          console.log("JUGADORES: ".concat(jugadores));
          return _context3.abrupt("return", res.status(200).json(jugadores));
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](2);
          console.log("ERROR GETTING JUGADORES BY EQUIPO ID: ".concat(_context3.t0));
          return _context3.abrupt("return", res.status(400).json({
            message: _context3.t0.message
          }));
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 10]]);
  }));
  return function getJugadoresByEquipoId(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Obtiene un jugador por su ID.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el jugador encontrado o un mensaje de error.
 */
var getJugadorById = exports.getJugadorById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, jugador;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          if (id) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return", res.status(400).send({
            message: 'No id provided'
          }));
        case 3:
          _context4.prev = 3;
          _context4.next = 6;
          return _models["default"].jugadores.findByPk(id, {
            include: [{
              model: _models["default"].usuarios,
              as: 'usuario',
              // Asegúrate de que 'as' corresponda a cómo has definido la relación en tus modelos
              // Especifica los atributos que deseas obtener
              attributes: ['nombre', 'apellidos', 'email', 'rol', 'image_id']
            }]
          });
        case 6:
          jugador = _context4.sent;
          if (jugador) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Jugador not found'
          }));
        case 9:
          return _context4.abrupt("return", res.status(200).json(jugador));
        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](3);
          return _context4.abrupt("return", res.status(400).json({
            message: _context4.t0.message
          }));
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 12]]);
  }));
  return function getJugadorById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Actualiza un jugador en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con el jugador actualizado o un mensaje de error.
 */
var updateJugador = exports.updateJugador = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, updated, updatedJugador;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          if (id) {
            _context5.next = 3;
            break;
          }
          return _context5.abrupt("return", res.status(400).send({
            message: 'No id provided'
          }));
        case 3:
          _context5.prev = 3;
          _context5.next = 6;
          return _models["default"].jugadores.update(req.body, {
            where: {
              id: id
            }
          });
        case 6:
          updated = _context5.sent;
          if (!updated) {
            _context5.next = 12;
            break;
          }
          _context5.next = 10;
          return _models["default"].jugadores.findByPk(id);
        case 10:
          updatedJugador = _context5.sent;
          return _context5.abrupt("return", res.status(200).json(updatedJugador));
        case 12:
          throw new Error('Jugador not found');
        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](3);
          return _context5.abrupt("return", res.status(400).json({
            message: _context5.t0.message
          }));
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 15]]);
  }));
  return function updateJugador(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Actualiza los detalles de un jugador en la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Objeto de respuesta con los detalles del jugador actualizados o un mensaje de error.
 */
var updateJugadorDetalles = exports.updateJugadorDetalles = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var usuario_id, _req$body2, edad, peso, altura, num_camiseta, posicion, updated, updatedJugador;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          usuario_id = req.params.id;
          if (usuario_id) {
            _context6.next = 3;
            break;
          }
          return _context6.abrupt("return", res.status(400).send({
            message: 'No usuario_id provided'
          }));
        case 3:
          _req$body2 = req.body, edad = _req$body2.edad, peso = _req$body2.peso, altura = _req$body2.altura, num_camiseta = _req$body2.num_camiseta, posicion = _req$body2.posicion;
          _context6.prev = 4;
          _context6.next = 7;
          return _models["default"].jugadores.update({
            edad: edad,
            peso: peso,
            altura: altura,
            num_camiseta: num_camiseta,
            posicion: posicion
          }, {
            where: {
              usuario_id: usuario_id
            }
          });
        case 7:
          updated = _context6.sent;
          if (!updated) {
            _context6.next = 13;
            break;
          }
          _context6.next = 11;
          return _models["default"].jugadores.findOne({
            where: {
              usuario_id: usuario_id
            }
          });
        case 11:
          updatedJugador = _context6.sent;
          return _context6.abrupt("return", res.status(200).json(updatedJugador));
        case 13:
          throw new Error('Jugador not found');
        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](4);
          return _context6.abrupt("return", res.status(400).json({
            message: _context6.t0.message
          }));
        case 19:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[4, 16]]);
  }));
  return function updateJugadorDetalles(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Elimina un jugador de la base de datos.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @returns {Promise<Response>} - Respuesta de éxito o un mensaje de error.
 */
var deleteJugador = exports.deleteJugador = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var id, deleted;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          if (id) {
            _context7.next = 3;
            break;
          }
          return _context7.abrupt("return", res.status(400).send({
            message: 'No id provided'
          }));
        case 3:
          _context7.prev = 3;
          _context7.next = 6;
          return _models["default"].jugadores.destroy({
            where: {
              id: id
            }
          });
        case 6:
          deleted = _context7.sent;
          if (!deleted) {
            _context7.next = 9;
            break;
          }
          return _context7.abrupt("return", res.status(204).send());
        case 9:
          throw new Error('Jugador not found');
        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](3);
          return _context7.abrupt("return", res.status(400).json({
            message: _context7.t0.message
          }));
        case 15:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[3, 12]]);
  }));
  return function deleteJugador(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();