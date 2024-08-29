"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SocketSingleton = void 0;
var _socket = require("socket.io");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // SocketSingleton.ts
/**
 * Tipo de datos para eventos personalizados de Socket.
 */
/**
 * Clase Singleton para manejar la instancia de Socket.io.
 * Garantiza que solo exista una instancia de Socket.io en toda la aplicación.
 */
var SocketSingleton = exports.SocketSingleton = /*#__PURE__*/function () {
  // Servidor Socket.IO

  /**
   * Constructor privado para prevenir la creación directa de instancias desde fuera de la clase.
   */
  function SocketSingleton() {
    _classCallCheck(this, SocketSingleton);
    // Instancia única de SocketSingleton
    _defineProperty(this, "io", null);
  }

  /**
   * Obtiene la instancia única de SocketSingleton.
   * @returns {SocketSingleton} La instancia única de SocketSingleton.
   */
  return _createClass(SocketSingleton, [{
    key: "initialize",
    value:
    /**
     * Inicializa el servidor Socket.IO asociándolo a un servidor HTTP o HTTPS.
     * Configura los eventos básicos de conexión, desconexión y eventos personalizados.
     * @param server El servidor HTTP o HTTPS con el que inicializar Socket.IO.
     */
    function initialize(server) {
      this.io = new _socket.Server(server, {
        // Aquí tus opciones de Socket.IO si las necesitas
      });
      this.io.on("connection", function (socket) {
        console.log("Nuevo cliente conectado");
        socket.on("disconnect", function () {
          console.log("Cliente desconectado");
        });
        socket.on("myEvent", function (data) {
          console.log(data.id, data.message);
        });

        // Configurar más eventos aquí
      });
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!SocketSingleton.instance) {
        SocketSingleton.instance = new SocketSingleton();
      }
      return SocketSingleton.instance;
    }
  }]);
}();