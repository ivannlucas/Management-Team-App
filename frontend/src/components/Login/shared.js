import SidebarHome from '../../components/Partials/SidebarHome.vue';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

/**
 * @mixin MyShared
 * @description Mixin que proporciona la funcionalidad para la vista principal de inicio de sesión y restablecimiento de contraseña.
 */
var MyShared = {
    /**
     * @name Home
     * @type {string}
     * @description Nombre del componente que utiliza este mixin.
     */
    name: "Home",

    /**
     * @description Datos reactivos del componente.
     * @returns {object} El estado inicial de los datos.
     */
    data() {
        return {
            /** 
             * @property {string} email - Correo electrónico del usuario.
             */
            email: '',

            /** 
             * @property {string} pass - Contraseña del usuario.
             */
            pass: '',

            /** 
             * @property {string} emailReset - Correo electrónico para el restablecimiento de contraseña.
             */
            emailReset: ''
        };
    },

    /**
     * @description Componentes utilizados en este componente.
     */
    components: {
        SidebarHome
    },

    /**
     * @description Métodos del componente.
     */
    methods: {
        /**
         * @method signUser
         * @memberof MyShared
         * @description Acción de Vuex para iniciar sesión del usuario.
         * @action auth/signUser
         */
        ...mapActions('auth', ['signUser', 'signUserGoogle', 'resetPassword', 'clearError']),

        /**
         * @method setResetDisable
         * @memberof MyShared
         * @description Mutación de Vuex para deshabilitar el restablecimiento de contraseña.
         * @mutation auth/setResetDisable
         */
        ...mapMutations('auth', ['setResetDisable']),

        /**
         * @description Borra el error de autenticación desde Vuex.
         */
        clearError() {
            this.$store.commit('auth/clearError');
        },

        /**
         * @description Maneja el proceso de inicio de sesión del usuario.
         * @param {object} credentials - Las credenciales del usuario.
         * @async
         */
        async handleSignUser(credentials) {
            try {
                await this.signUser(credentials);
            } catch (error) {
                this.$refs.toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: this.getError ? this.$store.state.auth.error.errorMessage : 'Hubo un problema al iniciar sesión.',
                    life: 5000
                });
            }
        },

        /**
         * @description Maneja el proceso de restablecimiento de contraseña.
         * @param {object} payload - Los datos para el restablecimiento de la contraseña.
         * @async
         */
        async handleResetPassword(payload) {
            try {
                await this.resetPassword(payload);
                this.setResetDisable(false);  // Regresa a la vista de login
            } catch (error) {
                this.$refs.toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: this.getError ? this.$store.state.auth.error.errorMessage : 'No se pudo enviar el correo de restablecimiento.',
                    life: 5000
                });
            }
        }
    },

    /**
     * @description Propiedades computadas del componente.
     */
    computed: {
        /**
         * @getter getError
         * @memberof MyShared
         * @description Obtiene el error de autenticación desde Vuex.
         * @returns {string|null} El mensaje de error o null si no hay error.
         */
        ...mapGetters('auth', ['getError']),

        /**
         * @getter resetDisable
         * @memberof MyShared
         * @description Obtiene el estado de deshabilitación del restablecimiento de contraseña desde Vuex.
         * @returns {boolean} True si el restablecimiento está deshabilitado, de lo contrario False.
         */
        ...mapState('auth', ['resetDisable']),
    },

    /**
     * @description Eventos emitidos por el componente.
     * @event
     */
    emits: ["editPerson"],
};

export default MyShared;
