"use strict";
/**
 * INSTALL
 * npm install socket.io-client
 * npm install @types/socket.io-client --save-dev
 *
 * Compilar codigo
 * npm install -g typescript
 * tsc client-socket.ts
 *
 * Ejecutar
 * node client-socket.js
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)("http://localhost:443"); // Asegúrate de ajustar la URL
console.log("Antes connect");
socket.on("connect", () => {
    console.log("Conectado al servidor");
    socket.emit("myEvent", { id: 123, message: "Hola Mundo" });
});
