import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import FileUpload from 'primevue/fileupload';
import Dropdown from 'primevue/dropdown';
import Button from "primevue/button";
import MultiSelect from 'primevue/multiselect';
import SidebarHome from '../../components/Partials/SidebarHome.vue';
import Modal from "../../components/Partials/Modal";
import { mapActions, mapGetters, mapState } from 'vuex';
import EquipoService from "../../services/equipo/equipo.service";

/**
 * @mixin MyShared
 * @description Mixin que proporciona la funcionalidad para el registro de jugadores en la plantilla, incluyendo la creación de un nuevo usuario y la asociación con un equipo existente mediante un token de invitación.
 */
var MyShared = {
    /**
     * @name Profile
     * @type {string}
     * @description Nombre del componente que utiliza este mixin.
     */
    name: "Profile",

    /**
     * @description Datos reactivos del componente.
     * @returns {object} El estado inicial de los datos.
     */
    data() {
        return {
            /** 
             * @property {number} currentStep - Paso actual en el flujo de creación de usuario.
             */
            currentStep: 1,

            /** 
             * @property {string|null} token - Token de invitación para unirse a un equipo.
             */
            token: null,

            /** 
             * @property {string} equipo_id - ID del equipo asociado con el usuario.
             */
            equipo_id: '',

            /** 
             * @property {string} nombre - Nombre del usuario.
             */
            nombre: '',

            /** 
             * @property {string} apellidos - Apellidos del usuario.
             */
            apellidos: '',

            /** 
             * @property {string} email - Correo electrónico del usuario.
             */
            email: '',

            /** 
             * @property {string} pass1 - Primera entrada de la contraseña del usuario.
             */
            pass1: '',

            /** 
             * @property {string} pass2 - Segunda entrada de la contraseña del usuario para la confirmación.
             */
            pass2: '',

            /** 
             * @property {string} rol - Rol del usuario (e.g., jugador, entrenador).
             */
            rol: 'jugador',

            /** 
             * @property {number} edad - Edad del usuario.
             */
            edad: 0,

            /** 
             * @property {number} num_camiseta - Número de camiseta del jugador.
             */
            num_camiseta: 0,

            /** 
             * @property {number} peso - Peso del jugador.
             */
            peso: 0.0,

            /** 
             * @property {number} altura - Altura del jugador.
             */
            altura: 0.0,

            /** 
             * @property {string} posicion - Posición del jugador en el campo.
             */
            posicion: '',

            /** 
             * @property {string|null} selectedPos - Posición seleccionada del jugador.
             */
            selectedPos: null,

            /** 
             * @property {Array<object>} cascadePos - Lista de posiciones en el campo, organizadas jerárquicamente.
             */
            cascadePos: [
                {
                    pname: 'Portero',
                    code: 'PT',
                },
                {
                    name: 'Defensa',
                    code: 'DF',
                    posiciones: [
                        { pname: 'Lateral Izquierdo', code: 'LI' },
                        { pname: 'Central', code: 'DF' },
                        { pname: 'Lateral Derecho', code: 'LD' },
                    ]
                },
                {
                    name: 'Mediocentro',
                    code: 'MC',
                    posiciones: [
                        { pname: 'Mediocentro Defensivo', code: 'MCD' },
                        { pname: 'Mediocampista Izquierdo', code: 'MI' },
                        { pname: 'Mediocampista Derecho', code: 'MD' },
                        { pname: 'Mediocentro Ofensivo', code: 'MCO' },
                    ]
                },
                {
                    name: 'Delantero',
                    code: 'DC',
                    posiciones: [
                        { pname: 'Extremo Izquierdo', code: 'EI' },
                        { pname: 'Delantero centro', code: 'DC' },
                        { pname: 'Extremo Derecho', code: 'ED' },
                    ]
                }
            ]
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
        MultiSelect,
        SidebarHome
    },

    /**
     * @description Props recibidas por el componente.
     */
    props: {},

    /**
     * @description Propiedades computadas del componente.
     */
    computed: {
        /**
         * @getter getError
         * @memberof MyShared
         * @description Obtiene el mensaje de error de autenticación desde Vuex.
         * @returns {string|null} El mensaje de error o null si no hay error.
         */
        ...mapGetters('auth', ['getError']),

        /**
         * @description Verifica si las contraseñas coinciden y no están vacías.
         * @returns {boolean} True si las contraseñas coinciden y no están vacías, de lo contrario False.
         */
        desactivar() {
            return this.pass1 === this.pass2 && this.pass1.trim() !== '';
        },

        /**
         * @description Verifica si hay un error de autenticación activo.
         * @returns {boolean} True si hay un error, de lo contrario False.
         */
        activarError() {
            return this.$store.state.auth.error !== '';
        }
    },

    /**
     * @description Métodos del componente.
     */
    methods: {
        /**
         * @method createUser
         * @memberof MyShared
         * @description Acción de Vuex para crear un nuevo usuario.
         * @action auth/createUser
         */
        ...mapActions('auth', ['createUser', 'clearError']),

        /**
         * @description Avanza al siguiente paso en el flujo de creación de usuario.
         */
        nextStep() {
            this.currentStep++;
        },

        /**
         * @description Retrocede al paso anterior en el flujo de creación de usuario.
         */
        prevStep() {
            this.currentStep--;
        },

        /**
         * @description Maneja la creación de un nuevo usuario después de validar las contraseñas.
         * @async
         */
        async handleCreateUser() {
            if (!this.desactivar) {
                this.$refs.toast.add({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: 'Las contraseñas no coinciden o están vacías.',
                    life: 5000
                });
                return;
            }

            try {
                await this.createUser({
                    name: this.nombre,
                    apellidos: this.apellidos,
                    email: this.email,
                    password: this.pass1,
                    rol: this.rol,
                    equipo_id: this.equipo_id,
                    edad: this.edad,
                    num_camiseta: this.num_camiseta,
                    peso: this.peso,
                    altura: this.altura,
                    posicion: this.selectedPos
                });

                this.$refs.toast.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Usuario registrado correctamente.',
                    life: 5000
                });
            } catch (error) {
                this.$refs.toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: this.getError ? this.$store.state.auth.error.errorMessage : 'Error al registrar el usuario.',
                    life: 5000
                });
            }
        }
    },

    /**
     * @description Hook de ciclo de vida que se ejecuta cuando el componente ha sido creado.
     * @async
     */
    async created() {
        this.token = this.$route.query.token;
        console.log("TOKEN: ", this.token);

        if (!this.token) {
            console.error("Token no proporcionado");
            this.$refs.toast.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Token no proporcionado',
                life: 5000
            });
        } else {
            const equipoResponse = await EquipoService.getEquipoByToken(this.token);

            if (equipoResponse) {
                console.log("El ID del documento es:", equipoResponse.id);
                this.equipo_id = equipoResponse.id;
            } else {
                console.log("No se encontró un equipo con ese token");
                this.$refs.toast.add({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: 'No se encontró un equipo con ese token.',
                    life: 5000
                });
            }
        }
    },

    /**
     * @description Eventos emitidos por el componente.
     * @event
     */
    emits: [],
};

export default MyShared;
