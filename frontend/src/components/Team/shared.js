import Modal from "../../components/Partials/Modal";
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';
import JugadoresService from '@/services/jugadores/jugadores.service';

/**
 * @mixin MyShared
 * @description Mixin que proporciona la funcionalidad para la gestión del equipo, organizando a los jugadores en función de sus posiciones y permitiendo ver los detalles de cada jugador.
 */
var MyShared = {
    /**
     * @name Team
     * @type {string}
     * @description Nombre del componente que utiliza este mixin.
     */
    name: "Team",

    /**
     * @description Datos reactivos del componente.
     * @returns {object} El estado inicial de los datos.
     */
    data() {
        return {
            /** 
             * @property {Array<object>} arrayPorteros - Lista de jugadores que son porteros.
             */
            arrayPorteros: [],

            /** 
             * @property {Array<object>} arrayDefensas - Lista de jugadores que son defensas.
             */
            arrayDefensas: [],

            /** 
             * @property {Array<object>} arrayMedios - Lista de jugadores que son mediocampistas.
             */
            arrayMedios: [],

            /** 
             * @property {Array<object>} arrayDelanteros - Lista de jugadores que son delanteros.
             */
            arrayDelanteros: [],
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
         * @description Redirige al usuario a la página de detalles de un jugador específico.
         * @param {number} id - ID del jugador cuyos detalles se desean ver.
         */
        verDetalles(id) {
            this.$router.push(`/players/${id}`);
        },

        /**
         * @description Obtiene todos los jugadores del equipo del usuario autenticado y los organiza por posición.
         * @async
         */
        async fetchJugadores() {
            try {
                const equipoId = this.usuario.detalles.equipo_id;
                const jugadores = await JugadoresService.getAllJugadoresByEquipoId(equipoId);
                this.organizarJugadoresPorPosicion(jugadores);
            } catch (error) {
                console.error("Error al obtener jugadores:", error);
            }
        },

        /**
         * @description Organiza a los jugadores por su posición en el campo y los añade a las listas correspondientes.
         * @param {Array<object>} jugadores - Lista de jugadores a organizar.
         */
        organizarJugadoresPorPosicion(jugadores) {
            const defensaPosiciones = ['Lateral Izquierdo', 'Central', 'Lateral Derecho'];
            const medioPosiciones = ['Mediocentro Defensivo', 'Mediocampista Izquierdo', 'Mediocampista Derecho', 'Mediocentro Ofensivo'];
            const delanteroPosiciones = ['Extremo Izquierdo', 'Delantero centro', 'Extremo Derecho'];

            jugadores.forEach(jugador => {
                const posicion = jugador.posicion;
                if (posicion) {
                    if (posicion === 'Portero') {
                        this.arrayPorteros.push(jugador);
                    } else if (defensaPosiciones.includes(posicion)) {
                        this.arrayDefensas.push(jugador);
                    } else if (medioPosiciones.includes(posicion)) {
                        this.arrayMedios.push(jugador);
                    } else if (delanteroPosiciones.includes(posicion)) {
                        this.arrayDelanteros.push(jugador);
                    }
                }
            });
        }
    },

    /**
     * @description Hook de ciclo de vida que se ejecuta cuando el componente ha sido creado.
     * @async
     */
    async created() {
        await this.fetchJugadores();
    }
};

export default MyShared;
