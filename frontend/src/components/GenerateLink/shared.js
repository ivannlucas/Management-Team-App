import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import FileUpload from 'primevue/fileupload';
import Dropdown from 'primevue/dropdown';
import Button from "primevue/button";
import MultiSelect from 'primevue/multiselect';

import Modal from "../../components/Partials/Modal";

import EquipoService from "../../services/equipo/equipo.service";

/**
 * @mixin MyShared
 * @description Mixin que proporciona la funcionalidad para la gestión del perfil del usuario y del equipo.
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
             * @property {string} tokenInvitacion - Token de invitación para unirse al equipo.
             */
            tokenInvitacion: '',

            /** 
             * @property {string} enlaceInvitacion - Enlace de invitación generado con el token.
             */
            enlaceInvitacion: '',

            /** 
             * @property {string} nombreEquipo - Nombre del equipo.
             */
            nombreEquipo: 'NavegaCF'
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
     * @description Métodos del componente.
     */
    methods: {
        /**
         * @description Copia el enlace de invitación al portapapeles.
         * @async
         */
        async copiarAlPortapapeles() {
            try {
                await navigator.clipboard.writeText(this.enlaceInvitacion);
                this.$refs.toast.add({
                    severity: 'success',
                    summary: 'Copiado',
                    detail: 'El enlace ha sido copiado al portapapeles',
                    life: 3000 // Tiempo en milisegundos antes de que el mensaje desaparezca automáticamente.
                });
            } catch (err) {
                console.error('Error al copiar el enlace: ', err);
            }
        }
    },

    /**
     * @description Hook de ciclo de vida que se ejecuta cuando el componente ha sido montado.
     * @async
     */
    async mounted() {
        try {
            const equipo_id = this.$store.state.auth.usuario.detalles.equipo_id;
            const equipoResponse = await EquipoService.getEquipoById(equipo_id);
            this.tokenInvitacion = equipoResponse.token;
            this.enlaceInvitacion = `http://localhost:8080/registerplayers?token=${this.tokenInvitacion}`;
            console.log("enlace: ", this.enlaceInvitacion);
        } catch (error) {
            console.error('Error al obtener los datos del equipo: ', error);
        }
    },

    /**
     * @description Eventos emitidos por el componente.
     * @event
     */
    emits: [],
};

export default MyShared;
