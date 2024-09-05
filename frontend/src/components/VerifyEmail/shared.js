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
import AuthService from "../../services/auth/auth.service";

/**
 * @mixin MyShared
 * @description Mixin que proporciona la funcionalidad para verificar el correo electrónico de un usuario utilizando un token de verificación recibido.
 */
var MyShared = {
    /**
     * @name VerifyEmail
     * @type {string}
     * @description Nombre del componente que utiliza este mixin.
     */
    name: "VerifyEmail",

    /**
     * @description Datos reactivos del componente.
     * @returns {object} El estado inicial de los datos.
     */
    data() {
        return {
            /** 
             * @property {string|null} token - Token de verificación obtenido de la URL.
             */
            token: null
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
         * @description Obtiene el error actual desde el módulo 'auth' en Vuex.
         * @returns {string|null} El mensaje de error, si existe.
         */
        ...mapGetters('auth', ['getError']),
    },

    /**
     * @description Métodos del componente.
     */
    methods: {
        /**
         * @method createUser
         * @description Acción Vuex para crear un nuevo usuario.
         */
        ...mapActions('auth', ['createUser', 'clearError']),
    },

    /**
     * @description Hook de ciclo de vida que se ejecuta cuando el componente ha sido creado.
     * @async
     */
    async created() {
        this.token = this.$route.query.token;

        if (!this.token) {
            // Manejar el caso en que el token no esté presente
            console.error("Token no proporcionado");
        } else {
            try {
                // Verificar el correo electrónico utilizando el token
                const verifyResponse = await AuthService.verifyEmail(this.token);
                console.log("Correo electrónico verificado con éxito");
            } catch (error) {
                console.error("Error al verificar el email", error);
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
