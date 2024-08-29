"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Importar Controlador 
function default_1(app) {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    //definicion de las rutas
}
exports.default = default_1;
