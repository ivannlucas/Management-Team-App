import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import FileUpload from 'primevue/fileupload';
import Dropdown from 'primevue/dropdown';
import Button from "primevue/button";
import MultiSelect from 'primevue/multiselect';

import Modal from "../../components/Partials/Modal";

import PartidosService from "../../services/partidos/partidos.service";
import EstadisticasPartidosService from "../../services/estadisticasPartido/estadisticasPartido.service";

/**
 * @mixin MyShared
 * @description Mixin que proporciona la funcionalidad para la gestión de las estadísticas de los partidos.
 */
var MyShared = {
    /**
     * @name GamesStatistics
     * @type {string}
     * @description Nombre del componente que utiliza este mixin.
     */
    name: "GamesStatistics",

    /**
     * @description Datos reactivos del componente.
     * @returns {object} El estado inicial de los datos.
     */
    data() {
        return {
            /** 
             * @property {object} partido - Objeto que contiene los detalles del partido y sus estadísticas.
             * @property {number|null} partido.id - ID del partido.
             * @property {number|null} partido.equipo_local_id - ID del equipo local.
             * @property {string} partido.equipo_local_nombre - Nombre del equipo local.
             * @property {number|null} partido.equipo_visitante_id - ID del equipo visitante.
             * @property {string} partido.equipo_visitante_nombre - Nombre del equipo visitante.
             * @property {number|null} partido.estadisticas_partido_id - ID de las estadísticas del partido.
             * @property {object} partido.estadisticas_partido - Objeto que contiene las estadísticas del partido.
             * @property {number} partido.estadisticas_partido.posesion_balon_equipo_local - Posesión del balón del equipo local.
             * @property {number} partido.estadisticas_partido.posesion_balon_equipo_visitante - Posesión del balón del equipo visitante.
             * @property {number} partido.estadisticas_partido.tiros_gol_equipo_local - Tiros a gol del equipo local.
             * @property {number} partido.estadisticas_partido.tiros_gol_equipo_visitante - Tiros a gol del equipo visitante.
             * @property {number} partido.estadisticas_partido.tiros_esquina_equipo_local - Tiros de esquina del equipo local.
             * @property {number} partido.estadisticas_partido.tiros_esquina_equipo_visitante - Tiros de esquina del equipo visitante.
             * @property {number} partido.estadisticas_partido.faltas_equipo_local - Faltas cometidas por el equipo local.
             * @property {number} partido.estadisticas_partido.faltas_equipo_visitante - Faltas cometidas por el equipo visitante.
             * @property {number} partido.estadisticas_partido.tarjetas_amarillas_equipo_local - Tarjetas amarillas recibidas por el equipo local.
             * @property {number} partido.estadisticas_partido.tarjetas_amarillas_equipo_visitante - Tarjetas amarillas recibidas por el equipo visitante.
             * @property {number} partido.estadisticas_partido.tarjetas_rojas_equipo_local - Tarjetas rojas recibidas por el equipo local.
             * @property {number} partido.estadisticas_partido.tarjetas_rojas_equipo_visitante - Tarjetas rojas recibidas por el equipo visitante.
             * @property {string} partido.estado - Estado del partido (PROGRAMADO, FINALIZADO, etc.).
             * @property {string} partido.fecha_hora - Fecha y hora del partido.
             * @property {number} partido.goles_equipo_local - Goles anotados por el equipo local.
             * @property {number} partido.goles_equipo_visitante - Goles anotados por el equipo visitante.
             * @property {string} partido.lugar - Lugar donde se jugará el partido.
             */
            partido: {
                id: null,
                equipo_local_id: null,
                equipo_local_nombre: "",
                equipo_visitante_id: null,
                equipo_visitante_nombre: "",
                estadisticas_partido_id: null,
                estadisticas_partido: {
                    posesion_balon_equipo_local: 50,
                    posesion_balon_equipo_visitante: 50,
                    tiros_gol_equipo_local: 0,
                    tiros_gol_equipo_visitante: 0,
                    tiros_esquina_equipo_local: 0,
                    tiros_esquina_equipo_visitante: 0,
                    faltas_equipo_local: 0,
                    faltas_equipo_visitante: 0,
                    tarjetas_amarillas_equipo_local: 0,
                    tarjetas_amarillas_equipo_visitante: 0,
                    tarjetas_rojas_equipo_local: 0,
                    tarjetas_rojas_equipo_visitante: 0
                },
                estado: "PROGRAMADO",
                fecha_hora: "",
                goles_equipo_local: 0,
                goles_equipo_visitante: 0,
                lugar: ""
            },
            /** @property {boolean} isDisabled - Indica si los campos de estadísticas están deshabilitados. */
            isDisabled: true,
            /** @property {boolean} isDisabledLocal - Indica si los campos de estadísticas del equipo local están deshabilitados. */
            isDisabledLocal: true,
            /** @property {boolean} isDisabledVisitante - Indica si los campos de estadísticas del equipo visitante están deshabilitados. */
            isDisabledVisitante: true
        };
    },

    /**
     * @description Componentes utilizados en este componente.
     */
    components: {
        DataTable,
        Column,
        Button,
        InputText,
        FileUpload,
        InputNumber,
        Modal,
        Dropdown,
        MultiSelect
    },

    /**
     * @description Props recibidas por el componente.
     */
    props: {
        /** 
         * @property {string} id - ID del partido que se está gestionando.
         */
        id: {
          type: String, // O Number, dependiendo del tipo de tu ID
        }
    },

    /**
     * @description Observadores de propiedades reactivas.
     */
    watch: {
        /**
         * @description Observa los cambios en la posesión del balón del equipo local y ajusta la posesión del equipo visitante para que la suma sea 100.
         * @param {number} newVal - Nuevo valor de la posesión del balón del equipo local.
         */
        'partido.estadisticas_partido.posesion_balon_equipo_local': function(newVal) {
            if (!this.isDisabledLocal) {
                this.partido.estadisticas_partido.posesion_balon_equipo_visitante = 100 - newVal;
            }
        },

        /**
         * @description Observa los cambios en la posesión del balón del equipo visitante y ajusta la posesión del equipo local para que la suma sea 100.
         * @param {number} newVal - Nuevo valor de la posesión del balón del equipo visitante.
         */
        'partido.estadisticas_partido.posesion_balon_equipo_visitante': function(newVal) {
            if (!this.isDisabledLocal) {
                this.partido.estadisticas_partido.posesion_balon_equipo_local = 100 - newVal;
            }
        }
    },

    /**
     * @description Propiedades computadas del componente.
     */
    computed: {
        /**
         * @description Devuelve el ID del partido desde los parámetros de la ruta.
         * @returns {string} El ID del partido.
         */
        id_game() {
            return this.$route.params.id;
        }
    },

    /**
     * @description Métodos del componente.
     */
    methods: {
        /**
         * @description Guarda las estadísticas y la información del partido en el servidor.
         * @async
         */
        async saveGame() {
            try {
                if (this.partido.estadisticas_partido_id) {
                    await EstadisticasPartidosService.updateEstadisticasPartido(
                        this.partido.estadisticas_partido_id,
                        this.partido.estadisticas_partido
                    );
                    console.log('Estadísticas del partido actualizadas exitosamente.');
                }

                await PartidosService.updatePartido(this.partido.id, {
                    ...this.partido,
                    estadisticas_partido_id: this.partido.estadisticas_partido_id
                });
                console.log('Partido actualizado exitosamente.');
            } catch (error) {
                console.error('Error al actualizar el partido o las estadísticas:', error);
            }
        },

        /**
         * @description Formatea una fecha para mostrarla en formato de fecha.
         * @param {Date|string} datetime - La fecha y hora que se desea formatear.
         * @returns {string} La fecha formateada en formato "MM/DD/YYYY".
         */
        formatDate(datetime) {
            let date;
            if (!datetime) {
                console.error("datetime es null o undefined");
                return 'Fecha no válida';
            }
        
            if (datetime instanceof Date) {
                date = datetime;
            } else if (datetime && typeof datetime.toDate === 'function') {
                date = datetime.toDate();
            } else if (typeof datetime === 'string' && !isNaN(Date.parse(datetime))) {
                date = new Date(datetime);
            } else {
                console.error("Formato de datetime no es reconocido:", datetime);
                return 'Fecha no válida';
            }
        
            if (date) {
                return date.toLocaleDateString();  // Formato de fecha como "MM/DD/YYYY"
            } else {
                console.error("La fecha recibida no es válida:", datetime);
                return 'Fecha no válida';
            }
        },

        /**
         * @description Formatea una fecha para mostrarla en formato de hora.
         * @param {Date|string} datetime - La fecha y hora que se desea formatear.
         * @returns {string} La hora formateada en formato "HH:MM:SS".
         */
        formatTime(datetime) {
            let date;
            if (!datetime) {
                console.error("datetime es null o undefined");
                return 'Hora no válida';
            }
        
            if (datetime instanceof Date) {
                date = datetime;
            } else if (datetime && typeof datetime.toDate === 'function') {
                date = datetime.toDate();
            } else if (typeof datetime === 'string' && !isNaN(Date.parse(datetime))) {
                date = new Date(datetime);
            } else {
                console.error("Formato de datetime no es reconocido:", datetime);
                return 'Hora no válida';
            }
        
            if (date) {
                return date.toLocaleTimeString();  // Formato de hora como "HH:MM:SS"
            } else {
                console.error("La hora recibida no es válida:", datetime);
                return 'Hora no válida';
            }
        },

        /**
         * @description Alterna el estado de los campos deshabilitados y guarda el partido si es entrenador.
         */
        toggleAndSave() {
            if (this.$store.state.auth.usuario.rol === 'entrenador') {
                this.isDisabled = !this.isDisabled;
                if (this.isDisabled) {
                    this.saveGame();
                }
            }
        },

        /**
         * @description Alterna el estado de los campos deshabilitados del equipo local y guarda el partido si es entrenador.
         */
        toggleAndSaveLocal() {
            if (this.$store.state.auth.usuario.rol === 'entrenador') {
                this.isDisabledLocal = !this.isDisabledLocal;
                if (this.isDisabledLocal) { 
                    this.saveGame();  
                }
            }
        }
    },

    /**
     * @description Hook de ciclo de vida que se ejecuta cuando el componente ha sido montado.
     * @async
     */
    async mounted() {
        try {
            const partidoData = await PartidosService.getPartidoById(this.id_game);
            
            this.partido.id = partidoData.id;
            this.partido.equipo_local_id = partidoData.equipo_local_id;
            this.partido.equipo_local_nombre = partidoData.equipo_local_nombre;
            this.partido.equipo_visitante_id = partidoData.equipo_visitante_id;
            this.partido.equipo_visitante_nombre = partidoData.equipo_visitante_nombre;
            this.partido.estadisticas_partido_id = partidoData.estadisticas_partido_id;

            this.partido.estado = partidoData.estado;
            this.partido.fecha_hora = partidoData.fecha_hora;
            this.partido.goles_equipo_local = partidoData.goles_equipo_local;
            this.partido.goles_equipo_visitante = partidoData.goles_equipo_visitante;
            this.partido.lugar = partidoData.lugar;
            
            if (this.partido.estadisticas_partido_id) {
                const estadisticas = await EstadisticasPartidosService.getEstadisticasPartidoById(this.partido.estadisticas_partido_id);
                
                this.partido.estadisticas_partido.posesion_balon_equipo_local = estadisticas.posesion_balon_equipo_local;
                this.partido.estadisticas_partido.posesion_balon_equipo_visitante = estadisticas.posesion_balon_equipo_visitante;
                this.partido.estadisticas_partido.tiros_gol_equipo_local = estadisticas.tiros_gol_equipo_local;
                this.partido.estadisticas_partido.tiros_gol_equipo_visitante = estadisticas.tiros_gol_equipo_visitante;
                this.partido.estadisticas_partido.tiros_esquina_equipo_local = estadisticas.tiros_esquina_equipo_local;
                this.partido.estadisticas_partido.tiros_esquina_equipo_visitante = estadisticas.tiros_esquina_equipo_visitante;
                this.partido.estadisticas_partido.faltas_equipo_local = estadisticas.faltas_equipo_local;
                this.partido.estadisticas_partido.faltas_equipo_visitante = estadisticas.faltas_equipo_visitante;
                this.partido.estadisticas_partido.tarjetas_amarillas_equipo_local = estadisticas.tarjetas_amarillas_equipo_local;
                this.partido.estadisticas_partido.tarjetas_amarillas_equipo_visitante = estadisticas.tarjetas_amarillas_equipo_visitante;
                this.partido.estadisticas_partido.tarjetas_rojas_equipo_local = estadisticas.tarjetas_rojas_equipo_local;
                this.partido.estadisticas_partido.tarjetas_rojas_equipo_visitante = estadisticas.tarjetas_rojas_equipo_visitante;
            }
        } catch (error) {
            console.error("Error al cargar los datos del partido:", error);
        }
    },

    /**
     * @description Eventos emitidos por el componente.
     * @event
     */
    emits: ["editPerson"],
};

export default MyShared;
