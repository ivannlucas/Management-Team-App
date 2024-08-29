"use strict";

var _socket = require("socket.io-client");
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

var socket = (0, _socket.io)("http://localhost:443"); // Asegúrate de ajustar la URL

console.log("Antes connect");
socket.on("connect", function () {
  console.log("Conectado al servidor");
  socket.emit("myEvent", {
    id: 123,
    message: "Hola Mundo"
  });
});