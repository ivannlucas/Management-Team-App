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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const HTTP = __importStar(require("http"));
const HTTPS = __importStar(require("https"));
const Path = __importStar(require("path"));
const Fs = __importStar(require("fs"));
const socket_1 = require("./socket/socket");
const config_1 = require("./config");
const usuarios_routes_1 = __importDefault(require("./routes/usuarios.routes"));
const autentication_routes_1 = __importDefault(require("./routes/autentication.routes"));
/**
 * Clase principal de la aplicación que configura el servidor HTTP y HTTPS, así como los websockets.
 */
class Application {
    /**
     * Constructor de la clase Application.
     * Configura el servidor express, añade middleware para CORS y define una ruta de prueba.
     */
    constructor() {
        this.application = (0, express_1.default)();
        this.application.use((0, cors_1.default)());
        this.application.use(express_1.default.json());
        // Definir ruta de prueba
        (0, usuarios_routes_1.default)(this.application);
        (0, autentication_routes_1.default)(this.application);
        this.application.get("/test", this.test_endpoint.bind(this));
    }
    /**
     * Inicia los servidores HTTP y HTTPS y configura los sockets.
     */
    start() {
        // Configuración y arranque del servidor HTTP
        const httpServer = HTTP.createServer(this.application)
            .on("error", (e) => {
            console.error("[HTTP] Error: ", e);
        }).listen(config_1.Config.getInstance().http.port, config_1.Config.getInstance().http.bind, () => {
            console.log(`[HTTP] Application listening on http://${config_1.Config.getInstance().http.bind}:${config_1.Config.getInstance().http.port}`);
        });
        // Configuración y arranque del servidor HTTPS
        const httpsServer = HTTPS.createServer({
            key: Fs.readFileSync(Path.resolve(__dirname, "..", config_1.Config.getInstance().https.privateKey)),
            cert: Fs.readFileSync(Path.resolve(__dirname, "..", config_1.Config.getInstance().https.certificate))
        }, this.application)
            .on("error", (e) => {
            console.error("[HTTPS] Error: ", e);
        }).listen(config_1.Config.getInstance().https.port, config_1.Config.getInstance().https.bind, () => {
            console.log(`[HTTPS] Application listening on https://${config_1.Config.getInstance().https.bind}:${config_1.Config.getInstance().https.port}`);
        });
        // Configuración de los sockets
        this.configureSocket(httpsServer);
    }
    /**
     * Configura y inicializa el socket utilizando el servidor proporcionado.
     * @param httpsServer Servidor HTTP o HTTPS utilizado para la inicialización del socket.
     */
    configureSocket(httpsServer) {
        socket_1.SocketSingleton.getInstance().initialize(httpsServer);
        console.log(`[SOCKET] Socket initialized and listening on port 443`);
    }
    /**
     * Endpoint de prueba que responde con un mensaje de éxito.
     * @param req La solicitud HTTP entrante.
     * @param res La respuesta HTTP que se enviará.
     */
    test_endpoint(req, res) {
        res.json({ 'success': 'Hello World!' });
    }
    /**
     * Método para obtener la instancia de la aplicación Express.
     * Utilizado principalmente para propósitos de prueba.
     * @returns La aplicación Express.
     */
    getExpressApp() {
        return this.application;
    }
}
exports.Application = Application;
