"use strict";

var _app = require("./app");
/**
 * Instancia de la aplicación principal.
 * Se crea un objeto de la clase Application definida en app.ts.
 */
var app = new _app.Application();

/**
 * Inicia la aplicación.
 * Llama al método start de la clase Application para arrancar todos los servidores configurados
 * y cualquier otro servicio inicial necesario para el funcionamiento de la aplicación.
 */
app.start();