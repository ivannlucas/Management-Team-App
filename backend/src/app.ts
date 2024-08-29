import Express from "express";
import Cors from 'cors';
import * as HTTP from "http";
import * as HTTPS from "https";
import * as Path from "path";
import * as Fs from "fs";
import { Server as SocketIOServer } from 'socket.io';
import {Config} from './config';
import db from './models';

import usuariosRoutes from './routes/usuarios.routes'
import autenticationRoutes from './routes/autentication.routes'
import equipoRoutes from './routes/equipo.routes'
import entrenadoresRoutes from './routes/entrenadores.routes'
import jugadoresRoutes from './routes/jugadores.routes'
import conversacionesRoues from './routes/conversaciones.routes'
import estadisticasPartidoRoutes from './routes/estadisticas_partido.routes'
import entrenamientosRoutes from './routes/entrenamientos.routes'
import estadisticasRoutes from './routes/estadisticas.routes'
import mensajesRoutes from './routes/mensajes.routes'
import notasRoutes from './routes/notas.routes'
import partidosRoutes from './routes/partidos.routes'





/**
 * Clase principal de la aplicación que configura el servidor HTTP y HTTPS, así como los websockets.
 */
export class Application {
    private application: Express.Express;

    /**
     * Constructor de la clase Application.
     * Configura el servidor express, añade middleware para CORS y define una ruta de prueba.
     */
    constructor() {
        this.application = Express();
        //this.application.use(Cors());
        this.application.use(Cors({
            origin: ["http://localhost:8080", "http://frontend-web"], 
            methods: ["GET", "POST",'PUT', 'DELETE'],
            allowedHeaders: ["Content-Type"],
            credentials: true
        }));
        
        this.application.use(Express.json());
        
        // Definir rutas 
        usuariosRoutes(this.application)
        autenticationRoutes(this.application)
        equipoRoutes(this.application)
        entrenadoresRoutes(this.application)
        jugadoresRoutes(this.application)
        conversacionesRoues(this.application)
        estadisticasPartidoRoutes(this.application)
        entrenamientosRoutes(this.application)
        estadisticasRoutes(this.application)
        mensajesRoutes(this.application)
        notasRoutes(this.application)
        partidosRoutes(this.application)


        this.application.get("/test", this.test_endpoint.bind(this));
    }

    /**
     * Inicia los servidores HTTP y HTTPS y configura los sockets.
     */
    public start(): void {
        // Configuración y arranque del servidor HTTP
        const httpServer = HTTP.createServer(this.application)
            .on("error", (e: any) => {
                console.error("[HTTP] Error: ", e);
            }).listen(Config.getInstance().http.port, Config.getInstance().http.bind, () => {
                console.log(`[HTTP] Application listening on http://${Config.getInstance().http.bind}:${Config.getInstance().http.port}`);
            });

        // Configuración y arranque del servidor HTTPS
        const httpsServer = HTTPS.createServer({
            key: Fs.readFileSync(Path.resolve(__dirname, "..", Config.getInstance().https.privateKey)),
            cert: Fs.readFileSync(Path.resolve(__dirname, "..", Config.getInstance().https.certificate))
        }, this.application)
            .on("error", (e: any) => {
                console.error("[HTTPS] Error: ", e);
            }).listen(Config.getInstance().https.port, Config.getInstance().https.bind, () => {
                console.log(`[HTTPS] Application listening on https://${Config.getInstance().https.bind}:${Config.getInstance().https.port}`);
            });

        //const io = new SocketIOServer(httpServer);
        const io = new SocketIOServer(httpServer, {
            cors: {
                origin: "http://localhost:8080", // Ajusta esto según donde se aloje tu frontend
                methods: ["GET", "POST"],
                credentials: true
            }
        });
        // Configuración de los sockets
        this.configureSocket(io);
    }

    /**
     * Configura y inicializa el socket utilizando el servidor proporcionado.
     * @param httpsServer Servidor HTTP o HTTPS utilizado para la inicialización del socket.
     */
    private configureSocket(io: SocketIOServer): void {
        io.on('connection', (socket) => {
            console.log('A user connected with socket id:', socket.id);
    
            // Manejo de eventos de mensajes
            socket.on('sendMessage', async (msg) => {
                console.log('Message received:', msg);
                try {
                    const savedMessage = await db.mensajes.create(msg);
                    io.emit('receiveMessage', savedMessage);  // Emitir a todos los clientes
                } catch (error) {
                    console.log('Error saving message:', error);
                    socket.emit('error', { message: 'Error al guardar el mensaje' });
                }
            });
    
            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id);
            });
        });
    }

    /**
     * Endpoint de prueba que responde con un mensaje de éxito.
     * @param req La solicitud HTTP entrante.
     * @param res La respuesta HTTP que se enviará.
     */
    public test_endpoint(req: Express.Request, res: Express.Response): void {
        res.json({ 'success': 'Hello World!' });
    }

    /**
     * Método para obtener la instancia de la aplicación Express.
     * Utilizado principalmente para propósitos de prueba.
     * @returns La aplicación Express.
     */
    public getExpressApp(): Express.Express {
        return this.application;
    }
}

