import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import FileUpload from 'primevue/fileupload';
import Dropdown from 'primevue/dropdown';
import Button from "primevue/button";
import MultiSelect from 'primevue/multiselect';
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';
import Modal from "../../components/Partials/Modal";

import UsuariosService from '@/services/usuarios/usuarios.service';
import EntrenadorService from "@/services/entrenadores/entrenadores.service";
import JugadoresService from "@/services/jugadores/jugadores.service";

/**
 * @mixin MyShared
 * @description Mixin que proporciona la funcionalidad para la gestión del perfil de usuario.
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
             * @property {boolean} isDisabled - Indica si los campos de edición están deshabilitados.
             */
            isDisabled: true,

            /** 
             * @property {object} user - Objeto que contiene la información del usuario.
             */
            user: {},
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
    props: {},

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
         * @method setUsuario
         * @memberof MyShared
         * @description Mutación de Vuex para establecer el usuario autenticado en el estado.
         * @mutation auth/setUsuario
         */
        ...mapMutations('auth', ['setUsuario']),

        /**
         * @description Guarda el perfil del usuario actualizando sus datos en el backend.
         * @async
         */
        async saveProfile() {
            this.updatedData(this.user.id, this.user);
        },

        /**
         * @description Sube una imagen y actualiza los datos del perfil del usuario en el backend.
         * @param {Event} event - El evento de carga de archivos.
         * @async
         */
        async uploadToBackend(event) {
            const file = event.files[0];
            const formData = new FormData();

            formData.append('imagen', file);
            formData.append('nombre', this.user.nombre);
            formData.append('apellidos', this.user.apellidos);
            formData.append('email', this.user.email);
            formData.append('password', this.user.password);
            formData.append('rol', this.user.rol);
            formData.append('isverified', this.user.isverified);

            this.updatedData(this.user.id, formData);
        },

        /**
         * @description Actualiza los datos del usuario y sus detalles específicos en el backend.
         * @param {number} id - ID del usuario.
         * @param {object} data - Datos actualizados del usuario.
         * @async
         */
        async updatedData(id, data) {
            try {
                if (data.rol === 'entrenador') {
                    const detallesEntrenador = {
                        edad: data.detalles.edad,
                        anios_experiencia: data.detalles.anios_experiencia
                    };
                    await EntrenadorService.updateEntrenadorDetalles(id, detallesEntrenador);
                    console.log("Detalles del entrenador actualizados con éxito.");
                } else if (data.rol === 'jugador') {
                    const detallesJugador = {
                        edad: data.detalles.edad,
                        peso: data.detalles.peso,
                        altura: data.detalles.altura,
                        num_camiseta: data.detalles.num_camiseta,
                        posicion: data.detalles.posicion
                    };
                    await JugadoresService.updateJugadorDetalles(id, detallesJugador);
                    console.log("Detalles del jugador actualizados con éxito.");
                }

                const userResponse = await UsuariosService.updateUsuario(id, data);
                this.updateUserDetails(userResponse, data.detalles);

                this.setUsuario(this.user);

            } catch (error) {
                console.error("Error al subir la imagen y actualizar el perfil: ", error);
            }
        },

        /**
         * @description Actualiza los detalles del usuario en el estado local.
         * @param {object} userResponse - Respuesta del servidor con los datos actualizados del usuario.
         * @param {object} detalles - Detalles específicos del usuario.
         */
        updateUserDetails(userResponse, detalles) {
            this.user.nombre = userResponse.nombre;
            this.user.apellidos = userResponse.apellidos;
            this.user.email = userResponse.email;
            this.user.rol = userResponse.rol;
            this.user.isverified = userResponse.isverified;
            this.user.image_id = userResponse.image_id;
            this.user.password = userResponse.password;

            Object.assign(this.user.detalles, detalles);
        }
    },

    /**
     * @description Hook de ciclo de vida que se ejecuta cuando el componente ha sido creado.
     * @async
     */
    async created() {
        this.user = this.$store.state.auth.usuario;
    },

    /**
     * @description Eventos emitidos por el componente.
     * @event
     */
    emits: [],
};

export default MyShared;
