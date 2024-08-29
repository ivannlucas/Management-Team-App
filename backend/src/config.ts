import * as Path from "path";
import * as FileSystem from "fs";

const CONFIG_FILE = "./config/config.json";

/**
 * Configuración básica para el servidor HTTP.
 */
export class HttpConfig {
    public port: number;
    public bind: string;

    /**
     * Inicializa la configuración HTTP con valores predeterminados.
     */
    constructor(){
        this.port = 0;
        this.bind = "";
    }
}

/**
 * Configuración extendida para el servidor HTTPS, hereda de HttpConfig.
 */
export class HttpsConfig extends HttpConfig {
    public privateKey: string;
    public certificate: string;

    /**
     * Inicializa la configuración HTTPS con valores predeterminados y extiende HttpConfig.
     */
    constructor(){
        super();
        this.privateKey = "";
        this.certificate = "";
    }
}

/**
 * Clase de configuración utilizando el patrón Singleton para garantizar una única instancia global.
 */
export class Config {
    private static instance: Config | null = null;
    public redirect: boolean = false;
    public http: HttpConfig = new HttpConfig();
    public https: HttpsConfig = new HttpsConfig();

    /**
     * Obtiene la instancia única de Config, creándola si es necesario.
     * @returns {Config} La instancia de configuración.
     */
    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = Config.buildConfig();
        }
        return Config.instance;
    }

    /**
     * Construye la configuración cargando datos desde un archivo JSON.
     * @returns {Config} Una nueva instancia de configuración con los datos cargados.
     */
    private static buildConfig(): Config {
        const config: Config = new Config();
        const configPath = Path.resolve(__dirname, "..", CONFIG_FILE);
        // console.log("CONFIG PATH: ", configPath);
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
    private static load(config: Config, configPath: string): void {
        let jsonConfig: any = {};

        try {
            const configFile = FileSystem.readFileSync(configPath).toString();
            jsonConfig = JSON.parse(configFile);
        } catch (error) {
            console.error("Error reading configuration: ", error);
        }

        // console.log("JSON configuration: ", jsonConfig);

        config.redirect = jsonConfig.redirect ?? false;

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

        // console.log("Configuration loaded successfully: ", config);
        console.log("Configuration loaded successfully.");
    }
}
