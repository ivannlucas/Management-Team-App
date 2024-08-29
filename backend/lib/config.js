"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpsConfig = exports.HttpConfig = exports.Config = void 0;
var Path = _interopRequireWildcard(require("path"));
var FileSystem = _interopRequireWildcard(require("fs"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var CONFIG_FILE = "./config/config.json";

/**
 * Configuración básica para el servidor HTTP.
 */
var HttpConfig = exports.HttpConfig = /*#__PURE__*/_createClass(
/**
 * Inicializa la configuración HTTP con valores predeterminados.
 */
function HttpConfig() {
  _classCallCheck(this, HttpConfig);
  this.port = 0;
  this.bind = "";
});
/**
 * Configuración extendida para el servidor HTTPS, hereda de HttpConfig.
 */
var HttpsConfig = exports.HttpsConfig = /*#__PURE__*/function (_HttpConfig) {
  /**
   * Inicializa la configuración HTTPS con valores predeterminados y extiende HttpConfig.
   */
  function HttpsConfig() {
    var _this;
    _classCallCheck(this, HttpsConfig);
    _this = _callSuper(this, HttpsConfig);
    _this.privateKey = "";
    _this.certificate = "";
    return _this;
  }
  _inherits(HttpsConfig, _HttpConfig);
  return _createClass(HttpsConfig);
}(HttpConfig);
/**
 * Clase de configuración utilizando el patrón Singleton para garantizar una única instancia global.
 */
var Config = exports.Config = /*#__PURE__*/function () {
  function Config() {
    _classCallCheck(this, Config);
    _defineProperty(this, "redirect", false);
    _defineProperty(this, "http", new HttpConfig());
    _defineProperty(this, "https", new HttpsConfig());
  }
  return _createClass(Config, null, [{
    key: "getInstance",
    value:
    /**
     * Obtiene la instancia única de Config, creándola si es necesario.
     * @returns {Config} La instancia de configuración.
     */
    function getInstance() {
      if (!Config.instance) {
        Config.instance = Config.buildConfig();
      }
      return Config.instance;
    }

    /**
     * Construye la configuración cargando datos desde un archivo JSON.
     * @returns {Config} Una nueva instancia de configuración con los datos cargados.
     */
  }, {
    key: "buildConfig",
    value: function buildConfig() {
      var config = new Config();
      var configPath = Path.resolve(__dirname, "..", CONFIG_FILE);
      // console.log("CONFIG PATH: ", configPath);
      Config.load(config, configPath);
      FileSystem.watchFile(configPath, function (curr, prev) {
        Config.load(config, configPath);
      });
      return config;
    }

    /**
     * Carga y aplica la configuración desde un archivo JSON especificado.
     * @param {Config} config - La instancia de configuración a actualizar.
     * @param {string} configPath - Ruta al archivo de configuración JSON.
     */
  }, {
    key: "load",
    value: function load(config, configPath) {
      var _jsonConfig$redirect;
      var jsonConfig = {};
      try {
        var configFile = FileSystem.readFileSync(configPath).toString();
        jsonConfig = JSON.parse(configFile);
      } catch (error) {
        console.error("Error reading configuration: ", error);
      }

      // console.log("JSON configuration: ", jsonConfig);

      config.redirect = (_jsonConfig$redirect = jsonConfig.redirect) !== null && _jsonConfig$redirect !== void 0 ? _jsonConfig$redirect : false;
      if (_typeof(jsonConfig) === "object") {
        if (_typeof(jsonConfig.http) === "object") {
          config.http.port = jsonConfig.http.port;
          config.http.bind = jsonConfig.http.bind;
        }
        if (_typeof(jsonConfig.https) === "object") {
          config.https.port = jsonConfig.https.port;
          config.https.bind = jsonConfig.https.bind;
          config.https.privateKey = jsonConfig.https.privateKey;
          config.https.certificate = jsonConfig.https.certificate;
        }
      }

      // console.log("Configuration loaded successfully: ", config);
      console.log("Configuration loaded successfully.");
    }
  }]);
}();
_defineProperty(Config, "instance", null);