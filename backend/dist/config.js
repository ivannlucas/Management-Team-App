"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.HttpsConfig = exports.HttpConfig = void 0;
const Path = __importStar(require("path"));
const FileSystem = __importStar(require("fs"));
const CONFIG_FILE = "./config/config.json";
/**
 * Configuración básica para el servidor HTTP.
 */
class HttpConfig {
    /**
     * Inicializa la configuración HTTP con valores predeterminados.
     */
    constructor() {
        this.port = 0;
        this.bind = "";
    }
}
exports.HttpConfig = HttpConfig;
/**
 * Configuración extendida para el servidor HTTPS, hereda de HttpConfig.
 */
class HttpsConfig extends HttpConfig {
    /**
     * Inicializa la configuración HTTPS con valores predeterminados y extiende HttpConfig.
     */
    constructor() {
        super();
        this.privateKey = "";
        this.certificate = "";
    }
}
exports.HttpsConfig = HttpsConfig;
/**
 * Clase de configuración utilizando el patrón Singleton para garantizar una única instancia global.
 */
class Config {
    constructor() {
        this.redirect = false;
        this.http = new HttpConfig();
        this.https = new HttpsConfig();
    }
    /**
     * Obtiene la instancia única de Config, creándola si es necesario.
     * @returns {Config} La instancia de configuración.
     */
    static getInstance() {
        if (!Config.instance) {
            Config.instance = Config.buildConfig();
        }
        return Config.instance;
    }
    /**
     * Construye la configuración cargando datos desde un archivo JSON.
     * @returns {Config} Una nueva instancia de configuración con los datos cargados.
     */
    static buildConfig() {
        const config = new Config();
        const configPath = Path.resolve(__dirname, "..", CONFIG_FILE);
        console.log("CONFIG PATH: ", configPath);
        Config.load(config, configPath);
        FileSystem.watchFile(configPath, (curr, prev) => {
            Config.load(config, configPath);
        });
        return config;
    }
    /**
     * Carga y aplica la configuración desde un archivo JSON especificado.
     * @param {Config} config - La instancia de configuración a actualizar.
     * @param {string} configPath - Ruta al archivo de configuración JSON.
     */
    static load(config, configPath) {
        var _a;
        let jsonConfig = {};
        try {
            const configFile = FileSystem.readFileSync(configPath).toString();
            jsonConfig = JSON.parse(configFile);
        }
        catch (error) {
            console.error("Error reading configuration: ", error);
        }
        console.log("JSON configuration: ", jsonConfig);
        config.redirect = (_a = jsonConfig.redirect) !== null && _a !== void 0 ? _a : false;
        if (typeof jsonConfig === "object") {
            if (typeof jsonConfig.http === "object") {
                config.http.port = jsonConfig.http.port;
                config.http.bind = jsonConfig.http.bind;
            }
            if (typeof jsonConfig.https === "object") {
                config.https.port = jsonConfig.https.port;
                config.https.bind = jsonConfig.https.bind;
                config.https.privateKey = jsonConfig.https.privateKey;
                config.https.certificate = jsonConfig.https.certificate;
            }
        }
        console.log("Configuration loaded successfully: ", config);
    }
}
exports.Config = Config;
Config.instance = null;
