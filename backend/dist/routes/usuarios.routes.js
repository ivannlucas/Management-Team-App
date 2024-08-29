"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Importar Controlador
const usuarios_controller_1 = require("../controllers/usuarios.controller");
function default_1(app) {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    //definicion de las rutas
    app.post("/api/users", usuarios_controller_1.createUsuario);
    app.get("/api/users", usuarios_controller_1.getAllUsuarios);
    app.get("/api/users/:id", usuarios_controller_1.getUsuarioById);
    app.put("/api/users/:id", usuarios_controller_1.updateUsuario);
    app.delete("/api/users/:id", usuarios_controller_1.deleteUsuario);
}
exports.default = default_1;
