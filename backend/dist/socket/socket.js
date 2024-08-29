"use strict";
// SocketSingleton.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketSingleton = void 0;
const socket_io_1 = require("socket.io");
/**
 * Clase Singleton para manejar la instancia de Socket.io.
 * Garantiza que solo exista una instancia de Socket.io en toda la aplicación.
 */
class SocketSingleton {
    /**
     * Constructor privado para prevenir la creación directa de instancias desde fuera de la clase.
     */
    constructor() {
        this.io = null; // Servidor Socket.IO
    }
    /**
     * Obtiene la instancia única de SocketSingleton.
     * @returns {SocketSingleton} La instancia única de SocketSingleton.
     */
    static getInstance() {
        if (!SocketSingleton.instance) {
            SocketSingleton.instance = new SocketSingleton();
        }
        return SocketSingleton.instance;
    }
    /**
     * Inicializa el servidor Socket.IO asociándolo a un servidor HTTP o HTTPS.
     * Configura los eventos básicos de conexión, desconexión y eventos personalizados.
     * @param server El servidor HTTP o HTTPS con el que inicializar Socket.IO.
     */
    initialize(server) {
        this.io = new socket_io_1.Server(server, {
        // Aquí tus opciones de Socket.IO si las necesitas
        });
        this.io.on("connection", (socket) => {
            console.log("Nuevo cliente conectado");
            socket.on("disconnect", () => {
                console.log("Cliente desconectado");
            });
            socket.on("myEvent", (data) => {
                console.log(data.id, data.message);
            });
            // Configurar más eventos aquí
        });
    }
}
exports.SocketSingleton = SocketSingleton;
