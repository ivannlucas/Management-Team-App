import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import FileUpload from 'primevue/fileupload';
import Dropdown from 'primevue/dropdown';
import Button from "primevue/button";
import MultiSelect from 'primevue/multiselect';

import Modal from "../../components/Partials/Modal";
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';

import PartidosService from "../../services/partidos/partidos.service";
import EstadisticasPartidosService from "../../services/estadisticasPartido/estadisticasPartido.service";
import EquipoService from "../../services/equipo/equipo.service";

/**
 * @mixin MyShared
 * @description Mixin que proporciona la funcionalidad para la gestión de la tabla de partidos y estadísticas de los mismos.
 */
var MyShared = {
    /**
     * @name GamesTable
     * @type {string}
     * @description Nombre del componente que utiliza este mixin.
     */
    name: "GamesTable",

    /**
     * @description Datos reactivos del componente.
     * @returns {object} El estado inicial de los datos.
     */
    data() {
        return {
            /** @property {Array} games - Lista de partidos. */
            games: [],
            /** @property {string} equipo_local - Nombre del equipo local. */
            equipo_local: '',
            /** @property {string} equipo_visitante - Nombre del equipo visitante. */
            equipo_visitante: '',
            /** @property {Date|null} fecha_hora - Fecha y hora del partido. */
            fecha_hora: null,
            /** @property {string} lugar - Lugar donde se jugará el partido. */
            lugar: '',
            /** @property {number} goles_equipo_local - Goles anotados por el equipo local. */
            goles_equipo_local: 0,
            /** @property {number} goles_equipo_visitante - Goles anotados por el equipo visitante. */
            goles_equipo_visitante: 0,
            /** @property {string} estado - Estado del partido, puede ser 'PROGRAMADO' o 'FINALIZADO'. */
            estado: 'PROGRAMADO', 
            /** @property {number} posesion_balon_equipo_local - Porcentaje de posesión del balón del equipo local. */
            posesion_balon_equipo_local: 50,
            /** @property {number} posesion_balon_equipo_visitante - Porcentaje de posesión del balón del equipo visitante. */
            posesion_balon_equipo_visitante: 50,
            /** @property {number} tiros_gol_equipo_local - Tiros a gol del equipo local. */
            tiros_gol_equipo_local: 0,
            /** @property {number} tiros_gol_equipo_visitante - Tiros a gol del equipo visitante. */
            tiros_gol_equipo_visitante: 0,
            /** @property {number} tiros_esquina_equipo_local - Tiros de esquina del equipo local. */
            tiros_esquina_equipo_local: 0,
            /** @property {number} tiros_esquina_equipo_visitante - Tiros de esquina del equipo visitante. */
            tiros_esquina_equipo_visitante: 0,
            /** @property {number} faltas_equipo_local - Faltas cometidas por el equipo local. */
            faltas_equipo_local: 0,
            /** @property {number} faltas_equipo_visitante - Faltas cometidas por el equipo visitante. */
            faltas_equipo_visitante: 0,
            /** @property {number} tarjetas_amarillas_equipo_local - Tarjetas amarillas recibidas por el equipo local. */
            tarjetas_amarillas_equipo_local: 0,
            /** @property {number} tarjetas_amarillas_equipo_visitante - Tarjetas amarillas recibidas por el equipo visitante. */
            tarjetas_amarillas_equipo_visitante: 0,
            /** @property {number} tarjetas_rojas_equipo_local - Tarjetas rojas recibidas por el equipo local. */
            tarjetas_rojas_equipo_local: 0,
            /** @property {number} tarjetas_rojas_equipo_visitante - Tarjetas rojas recibidas por el equipo visitante. */
            tarjetas_rojas_equipo_visitante: 0,
            /** @property {string} layout - Disposición de la tabla (grid o lista). */
            layout: 'grid',
            /** @property {string|null} sortKey - Clave por la cual se ordenarán los partidos. */
            sortKey: null,
            /** @property {number|null} sortOrder - Orden de clasificación de los partidos (ascendente o descendente). */
            sortOrder: null,
            /** @property {string|null} sortField - Campo por el cual se ordenarán los partidos. */
            sortField: null,
            /** @property {Array} sortOptions - Opciones de clasificación disponibles. */
            sortOptions: [
                {label: 'Price High to Low', value: '!price'},
                {label: 'Price Low to High', value: 'price'},
            ],
            /** @property {null} productService - Servicio de productos (sin usar en este código). */
            productService: null,
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
     * @description Observadores de propiedades reactivas.
     */
    watch: {
        /**
         * @description Observa los cambios en la posesión del balón del equipo local y ajusta la posesión del equipo visitante para que la suma sea 100.
         * @param {number} newVal - Nuevo valor de la posesión del balón del equipo local.
         */
        posesion_balon_equipo_local(newVal) {
            if (newVal < 10) this.posesion_balon_equipo_local = 10;
            if (newVal > 100) this.posesion_balon_equipo_local = 100;
            this.posesion_balon_equipo_visitante = 100 - newVal;
        },

        /**
         * @description Observa los cambios en la posesión del balón del equipo visitante y ajusta la posesión del equipo local para que la suma sea 100.
         * @param {number} newVal - Nuevo valor de la posesión del balón del equipo visitante.
         */
        posesion_balon_equipo_visitante(newVal) {
            if (newVal < 10) this.posesion_balon_equipo_visitante = 10;
            if (newVal > 100) this.posesion_balon_equipo_visitante = 100;
            this.posesion_balon_equipo_local = 100 - newVal;
        }
    },

    /**
     * @description Propiedades computadas del componente.
     */
    computed: {
        /**
         * @getter usuario
         * @memberof MyShared
         * @description Obtiene el objeto usuario desde el módulo 'auth' en Vuex.
         * @returns {object} Objeto usuario con sus detalles.
         */
        ...mapState('auth', ['usuario']),

        /**
         * @description Verifica si el usuario es un entrenador.
         * @returns {boolean} True si el usuario es entrenador, de lo contrario False.
         */
        isUserEntrenador() {
            return this.$store.state.auth.usuario && this.$store.state.auth.usuario.rol === 'entrenador';
        }
    },

    /**
     * @description Métodos del componente.
     */
    methods: {
        /**
         * @description Verifica y carga las estadísticas de un partido específico.
         * @param {number} partidoId - ID del partido.
         * @param {object} partido - Objeto del partido seleccionado.
         */
        async checkStatistics(partidoId, partido) {
            const estadisticas = await EstadisticasPartidosService.getEstadisticasPartidoById(partidoId);
            const { id, ...estadisticasSinId } = estadisticas;
            partido.estadisticas_partido = estadisticasSinId;
            this.$store.commit('setPartido', partido);
            this.$router.push({
                name: 'GamesStatistics',
                params: { id: partidoId } 
            });
        },

        /**
         * @description Maneja el cambio de orden en la tabla.
         * @param {object} event - Evento que contiene la información de clasificación.
         */
        onSortChange(event) {
            const value = event.value.value;
            const sortValue = event.value;

            if (value.indexOf('!') === 0) {
                this.sortOrder = -1;
                this.sortField = value.substring(1, value.length);
                this.sortKey = sortValue;
            } else {
                this.sortOrder = 1;
                this.sortField = value;
                this.sortKey = sortValue;
            }
        },

        /**
         * @description Formatea una fecha para mostrarla en formato de fecha.
         * @param {Date|string} datetime - La fecha y hora que se desea formatear.
         * @returns {string} La fecha formateada en formato "MM/DD/YYYY".
         */
        formatDate(datetime) {
            let date;
            if (datetime instanceof Date) {
                date = datetime;
            } else if (datetime && typeof datetime.toDate === 'function') {
                date = datetime.toDate();
            } else if (typeof datetime === 'string' && !isNaN(Date.parse(datetime))) {
                date = new Date(datetime);
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
            if (datetime instanceof Date) {
                date = datetime;
            } else if (datetime && typeof datetime.toDate === 'function') {
                date = datetime.toDate();
            } else if (typeof datetime === 'string' && !isNaN(Date.parse(datetime))) {
                date = new Date(datetime);
            }
        
            if (date) {
                return date.toLocaleTimeString();  // Formato de hora como "HH:MM:SS"
            } else {
                console.error("La hora recibida no es válida:", datetime);
                return 'Hora no válida';
            }
        },

        /**
         * @description Añade un nuevo partido a la lista de partidos y guarda las estadísticas asociadas.
         */
        async addGame() {
            if (
                !this.equipo_local ||
                !this.equipo_visitante ||
                !this.fecha_hora ||
                !this.lugar ||
                !this.estado
            ) {
                this.$refs.toast.add({
                    severity: 'warn',
                    summary: 'Aviso',
                    detail: 'Por favor, completa todos los campos',
                    life: 5000
                });
                return;
            }
        
            try {
                const estadisticasPartidoData = {
                    posesion_balon_equipo_local: this.posesion_balon_equipo_local,
                    posesion_balon_equipo_visitante: this.posesion_balon_equipo_visitante,
                    tiros_gol_equipo_local: this.tiros_gol_equipo_local,
                    tiros_gol_equipo_visitante: this.tiros_gol_equipo_visitante,
                    tiros_esquina_equipo_local: this.tiros_esquina_equipo_local,
                    tiros_esquina_equipo_visitante: this.tiros_esquina_equipo_visitante,
                    faltas_equipo_local: this.faltas_equipo_local,
                    faltas_equipo_visitante: this.faltas_equipo_visitante,
                    tarjetas_amarillas_equipo_local: this.tarjetas_amarillas_equipo_local,
                    tarjetas_amarillas_equipo_visitante: this.tarjetas_amarillas_equipo_visitante,
                    tarjetas_rojas_equipo_local: this.tarjetas_rojas_equipo_local,
                    tarjetas_rojas_equipo_visitante: this.tarjetas_rojas_equipo_visitante,
                };
                const estadisticasResponse = await EstadisticasPartidosService.createEstadisticasPartido(estadisticasPartidoData);
        
                const equipoUsuarioId = this.$store.state.auth.usuario.detalles.equipo_id;
        
                let equipo_local_id = null;
                let equipo_visitante_id = null;
        
                if (this.equipo_local === this.$store.state.auth.usuario.detalles.equipo_actual) {
                    equipo_local_id = equipoUsuarioId;
                } else {
                    equipo_visitante_id = equipoUsuarioId;
                }
        
                const partidoData = {
                    equipo_local_id: equipo_local_id,
                    equipo_local_nombre: this.equipo_local,
                    equipo_visitante_id: equipo_visitante_id,
                    equipo_visitante_nombre: this.equipo_visitante,
                    fecha_hora: this.fecha_hora,
                    lugar: this.lugar,
                    goles_equipo_local: this.goles_equipo_local,
                    goles_equipo_visitante: this.goles_equipo_visitante,
                    estado: this.estado,
                    estadisticas_partido_id: estadisticasResponse.id 
                };
        
                if (!partidoData.equipo_visitante_id || !partidoData.equipo_local_id) {
                    const equipos = await EquipoService.getAllEquipos();

                    if (!partidoData.equipo_visitante_id) {
                        const equipoVisitante = equipos.find(equipo => equipo.nombre_equipo === this.equipo_visitante_nombre);
                        if (equipoVisitante) {
                            partidoData.equipo_visitante_id = equipoVisitante.id;
                        } else {
                            console.warn("El equipo visitante no está registrado.");
                        }
                    }

                    if (!partidoData.equipo_local_id) {
                        const equipoLocal = equipos.find(equipo => equipo.nombre_equipo === this.equipo_local_nombre);
                        if (equipoLocal) {
                            partidoData.equipo_local_id = equipoLocal.id;
                        } else {
                            console.warn("El equipo local no está registrado.");
                        }
                    }
                }

                const partidoResponse = await PartidosService.createPartido(partidoData);
                this.games.push(partidoResponse);
                this.$refs.addGame.closeModal();
            } catch (e) {
                console.error("Error al agregar el partido:", e);
            }
        },

        /**
         * @description Elimina un partido de la lista y sus estadísticas asociadas.
         * @param {number} id - ID del partido a eliminar.
         */
        async deleteGame(id) {
            try {
                const partido = this.games.find(game => game.id === id);
        
                if (partido) {
                    await PartidosService.deletePartido(id);
                    console.log(`Partido con ID ${id} ha sido eliminado`);
        
                    if (partido.estadisticas_partido_id) {
                        await EstadisticasPartidosService.deleteEstadisticasPartido(partido.estadisticas_partido_id);
                        console.log(`Estadísticas con ID ${partido.estadisticas_partido_id} han sido eliminadas`);
                    }
        
                    this.games = this.games.filter(game => game.id !== id);
                } else {
                    console.log("El partido no existe en this.games");
                }
            } catch (error) {
                console.error(`Error eliminando el partido con ID ${id}: `, error);
            }
        }
    },

    /**
     * @description Hook de ciclo de vida que se ejecuta cuando el componente ha sido creado.
     */
    async created() {
        try {
            const partidos = await PartidosService.getAllPartidos();
            const equipoId = this.$store.state.auth.usuario.detalles.equipo_id;
            this.games = partidos.filter(partido =>
                partido.equipo_local_id === equipoId || partido.equipo_visitante_id === equipoId
            );
        } catch (error) {
            console.error("Error al cargar los partidos:", error);
        }
    },

    /**
     * @description Eventos emitidos por el componente.
     * @event
     */
    emits: ["editPerson"],
};

export default MyShared;
