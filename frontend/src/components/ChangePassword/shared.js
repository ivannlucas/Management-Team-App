import { mapActions, mapGetters } from 'vuex';

/**
 * @mixin MyShared
 * @description Mixin que proporciona la funcionalidad para cambiar la contraseña de un usuario.
 */
var MyShared = {
    /**
     * @name ChangePassword
     * @type {string}
     * @description Nombre del componente que utiliza este mixin.
     */
    name: "ChangePassword",

    /**
     * @description Datos reactivas del componente.
     * @returns {object} El estado inicial de los datos.
     */
    data() {
        return {
            /** @property {string} email - Correo electrónico del usuario. */
            email: '',
            /** @property {string} newPassword1 - Primera entrada para la nueva contraseña. */
            newPassword1: '',
            /** @property {string} newPassword2 - Segunda entrada para la nueva contraseña, debe coincidir con newPassword1. */
            newPassword2: ''
        }
    },

    /**
     * @description Métodos del componente.
     */
    methods: {
        /**
         * @method ChangePassword
         * @memberof MyShared
         * @description Acción de Vuex para cambiar la contraseña del usuario.
         * @action auth/ChangePassword
         */
        ...mapActions('auth', ['ChangePassword'])
    },

    /**
     * @description Propiedades computadas del componente.
     */
    computed: {
        /**
         * @getter getError
         * @memberof MyShared
         * @description Getter de Vuex que devuelve cualquier error relacionado con la autenticación.
         * @returns {string|null} El mensaje de error o null si no hay error.
         */
        ...mapGetters('auth', ['getError']),

        /**
         * @description Propiedad computada que determina si el botón para cambiar la contraseña debe estar activado o desactivado.
         * @returns {boolean} True si las contraseñas coinciden y no están vacías, de lo contrario False.
         */
        desactivar() {
            return this.newPassword1 === this.newPassword2 && this.newPassword1.trim() !== '';
        }
    },

    /**
     * @description Eventos emitidos por el componente.
     * @event editPerson
     */
    emits: ["editPerson"],
};

export default MyShared;
