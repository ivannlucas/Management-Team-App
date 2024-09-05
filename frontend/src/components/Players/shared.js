import Modal from "../../components/Partials/Modal";
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';
import JugadoresService from '@/services/jugadores/jugadores.service';
import EstadisticasService from '@/services/estadisticas/estadisticas.service';

/**
 * @mixin MyShared
 * @description Mixin que proporciona la funcionalidad para la gestión de jugadores y sus estadísticas.
 */
var MyShared = {
    /**
     * @name Players
     * @type {string}
     * @description Nombre del componente que utiliza este mixin.
     */
    name: "Players",

    /**
     * @description Datos reactivos del componente.
     * @returns {object} El estado inicial de los datos.
     */
    data() {
        return {
            /** 
             * @property {boolean} isDisabled - Indica si los campos de edición están deshabilitados.
             */
            isDisabled: true,

            /** 
             * @property {boolean} isDisabledStatistics - Indica si los campos de estadísticas están deshabilitados.
             */
            isDisabledStatistics: true,

            /** 
             * @property {boolean} isLoading - Indica si los datos están siendo cargados.
             */
            isLoading: true,

            /** 
             * @property {object} card - Objeto que contiene información de la tarjeta actual.
             * @property {number|null} card.id - ID de la tarjeta.
             * @property {string} card.title - Título de la tarjeta.
             */
            card: {
                id: null,
                title: ""
            },

            /** 
             * @property {object} user - Objeto que contiene información del jugador.
             * @property {object} user.detalles - Detalles del jugador.
             */
            user: {
                detalles: {}
            },

            /** 
             * @property {object} statistics - Objeto que contiene las estadísticas del jugador.
             */
            statistics: {},

            /** 
             * @property {Array<string>} roles - Lista de roles posibles para un jugador.
             */
            roles: [
                "Jugador",
                "Entrenador"
            ]
        };
    },

    /**
     * @description Componentes utilizados en este componente.
     */
    components: {
        Modal
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
    },

    /**
     * @description Métodos del componente.
     */
    methods: {
        /**
         * @description Guarda las estadísticas actualizadas del jugador.
         * @async
         */
        async saveStatics() {
            if (this.statistics && this.user && this.user.estadisticas_id) {
                try {
                    const updatedStats = await EstadisticasService.updateEstadistica(this.user.estadisticas_id, this.statistics);
                    console.log('Estadísticas actualizadas exitosamente:', updatedStats);
                } catch (error) {
                    console.error('Error actualizando estadísticas:', error);
                }
            } else {
                console.log('No se pueden actualizar las estadísticas. Datos no disponibles.');
            }
        },

        /**
         * @description Maneja el clic para habilitar/deshabilitar la edición de estadísticas y guarda las estadísticas si están deshabilitadas.
         */
        handleClick() {
            if (this.$store.state.auth.usuario.rol !== 'entrenador') {
                console.log('No tienes permisos para editar las estadísticas.');
                return;
            }
            
            this.isDisabledStatistics = !this.isDisabledStatistics;
            !this.isDisabledStatistics ? null : this.saveStatics();
        },

        /**
         * @description Crea estadísticas predeterminadas para un jugador si no existen.
         * @param {number} jugadorId - ID del jugador para el que se crearán las estadísticas.
         * @async
         */
        async createDefaultStatistics(jugadorId) {
            const newStats = {
                partidos_jugados: 0,
                minutos_jugados: 0,
                goles_anotados: 0,
                asistencias: 0,
                tarjetas_amarillas: 0,
                tarjetas_rojas: 0
            };
        
            try {
                const statsResponse = await EstadisticasService.createEstadistica(newStats);
                
                if (statsResponse && statsResponse.id) {
                    this.statistics = statsResponse;

                    const updatedUser = await JugadoresService.updateJugador(jugadorId, { estadisticas_id: statsResponse.id });
                    
                    this.user.estadisticas_id = statsResponse.id; 
                    console.log("Estadísticas creadas y asociadas con éxito.");
                }
            } catch (error) {
                console.error("Error al crear nuevas estadísticas:", error);
            }
        }
    },

    /**
     * @description Hook de ciclo de vida que se ejecuta cuando el componente ha sido creado.
     * @async
     */
    async created() {
        const jugadorId = this.$route.params.id;

        try {
            const response = await JugadoresService.getJugadorById(jugadorId);
            if (response) {
                this.user = response;

                if (this.user.estadisticas_id) {
                    const statsResponse = await EstadisticasService.getEstadisticaById(this.user.estadisticas_id);
                    if (statsResponse) {
                        this.statistics = statsResponse;
                    } else {
                        console.log("No se encontraron estadísticas, creando...");
                        this.createDefaultStatistics(jugadorId);
                    }
                } else {
                    console.log("Creando estadísticas nuevas...");
                    this.createDefaultStatistics(jugadorId);
                }
            }
        } catch (error) {
            console.error("Error al obtener los datos del jugador o estadísticas:", error);
        }

        this.isLoading = false;
    }
};

export default MyShared;
