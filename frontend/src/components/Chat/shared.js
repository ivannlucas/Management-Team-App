import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import FileUpload from 'primevue/fileupload';
import Dropdown from 'primevue/dropdown';
import Button from "primevue/button"
import MultiSelect from 'primevue/multiselect';

import UserCard from '../Partials/ChatComponents/UserCard.vue'
import MessageCard from '../Partials/ChatComponents/MessageCard.vue'

import { io } from 'socket.io-client';

import Modal from "../../components/Partials/Modal";
import { mapActions, mapGetters, mapState } from 'vuex';

import ConversacionesService from '@/services/conversaciones/conversaciones.service';
import UsuariosService from '@/services/usuarios/usuarios.service';
import MensajesService from '@/services/mensajes/mensajes.service';

/**
 * @mixin MyShared
 * @description Mixin que proporciona la funcionalidad para la gestión de conversaciones y mensajes en el chat.
 */
var MyShared = {
    /**
     * @name Chat
     * @type {string}
     * @description Nombre del componente que utiliza este mixin.
     */
    name: "Chat",

    /**
     * @description Datos reactivos del componente.
     * @returns {object} El estado inicial de los datos.
     */
    data() {
        return {
            /** @property {string} urlTemporal - URL temporal de la foto de perfil. */
            urlTemporal: require("../../assets/fotoPerfil.jpg"),
            /** @property {object} pp - Información del perfil de usuario. */
            pp: {},
            /** @property {string} menssage - Mensaje actual que se está escribiendo. */
            menssage: "",
            /** @property {Array} users - Lista de usuarios en la conversación. */
            users: [],
            /** @property {Array} mensajes - Lista de mensajes en la conversación actual. */
            mensajes: [],
            /** @property {string} id_conversacion - ID de la conversación seleccionada. */
            id_conversacion: "",
            /** @property {boolean} showDialog - Controla la visibilidad del diálogo/modal. */
            showDialog: false,
            /** @property {boolean} loading - Indica si la aplicación está en proceso de carga. */
            loading: false,
            /** @property {number|null} selectedId - ID de la conversación seleccionada. */
            selectedId: null,
            /** @property {object|null} socket - Instancia del socket de comunicación. */
            socket: null,
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
        UserCard,
        MessageCard,
    },

    /**
     * @description Propiedades que se obtienen del estado de Vuex.
     */
    computed: {
        /**
         * @getter userLogin
         * @memberof MyShared
         * @description Obtiene el estado del usuario autenticado desde Vuex.
         * @returns {object} Objeto con los datos del usuario autenticado.
         */
        ...mapGetters(['userLogin']),

        /**
         * @getter usuario
         * @memberof MyShared
         * @description Obtiene el objeto usuario desde el módulo 'auth' en Vuex.
         * @returns {object} Objeto usuario con sus detalles.
         */
        ...mapState('auth', ['usuario']),

        /**
         * @description Devuelve el ID del usuario autenticado.
         * @returns {number} ID del usuario autenticado.
         */
        userId() {
            return this.$store.state.auth.usuario.id;
        },

        /**
         * @description Obtiene la lista de usuarios en la conversación actual desde Vuex.
         * @returns {Array} Lista de usuarios en la conversación.
         */
        usuariosConversacion() {
            return this.$store.state.conversaciones;
        }
    },

    /**
     * @description Observadores de propiedades reactivas.
     */
    watch: {
        /**
         * @description Observa los cambios en la lista de usuarios de la conversación.
         * @param {Array} newVal - Nuevo valor de la lista de usuarios.
         * @param {Array} oldVal - Valor anterior de la lista de usuarios.
         */
        usuariosConversacion(newVal, oldVal) {
            console.log('usuariosConversacion ha cambiado:', newVal);
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
        ...mapActions('auth', ['createUser']),

        /**
         * @description Añade un emoji al mensaje actual.
         * @param {object} emoji - Objeto emoji seleccionado.
         */
        addEmoji(emoji) {
            this.menssage += emoji.data;
        },

        /**
         * @description Conecta el componente al servidor WebSocket.
         */
        connectSocket() {
            const apiUrl = process.env.VUE_APP_API_URL || 'http://backend-web:80';
            try {
                this.socket = io(apiUrl, { transports: ['websocket'] });

                // Escuchar eventos del socket
                this.socket.on('receiveMessage', (message) => {
                    this.mensajes.push(message);
                });

                this.socket.on('connect_error', (error) => {
                    console.error("Error de conexión:", error);
                });

                this.socket.on('disconnect', (reason) => {
                    console.log("Desconectado del servidor:", reason);
                });

                this.socket.on('error', (error) => {
                    console.error("Error del socket:", error);
                });
            } catch (error) {
                console.error("Excepción al configurar el socket:", error);
            }
        },

        /**
         * @description Obtiene las conversaciones del usuario y los detalles asociados.
         * @param {number|null} newConversationId - ID de la nueva conversación a seleccionar (opcional).
         */
        async fetchConversations(newConversationId = null) {
            try {
                const userId = this.userId;
                const equipoId = this.$store.state.auth.usuario.detalles.equipo_id;

                const conversaciones = await ConversacionesService.getConversacionesByUsuario(userId);
                
                let users = await UsuariosService.getUsuariosByEquipo(equipoId);

                this.users = users.filter(user => user.id !== userId);
                
                if (conversaciones.length === 0) {
                    this.loading = false;
                    return;
                }

                const detallesConversaciones = await this.obtenerDetallesConversaciones(conversaciones, userId);

                this.$store.commit('setConversation', detallesConversaciones);

            } catch (error) {
                console.error("Error al obtener las conversaciones:", error);
            }
            this.loading = false;
        },

        /**
         * @description Obtiene los detalles de las conversaciones, incluyendo el último mensaje y los detalles del usuario.
         * @param {Array} conversaciones - Lista de conversaciones.
         * @param {number} userId - ID del usuario autenticado.
         * @returns {Promise<Array>} Promesa que resuelve con los detalles de las conversaciones.
         */
        async obtenerDetallesConversaciones(conversaciones, userId) {
            return Promise.all(conversaciones.map(async conversacion => {
                const otherUserId = conversacion.usuario_id === userId ? conversacion.destinatario_id : conversacion.usuario_id;
                const userDetails = await UsuariosService.getUsuarioById(otherUserId);
                const lastMessage = await MensajesService.getUltimoMensajeByConversacion(conversacion.id);
                const imagen = (userDetails.image_id !== null && userDetails.image_id !== undefined) ? userDetails.image_id : require("../../assets/fotoPerfil.jpg");

                return {
                    id: otherUserId,
                    name: userDetails.nombre,
                    apellidos: userDetails.apellidos,
                    imagen: imagen,
                    id_conversacion: conversacion.id,
                    last_message: lastMessage ? lastMessage.contenido : ''
                };
            }));
        },

        /**
         * @description Selecciona un ID de usuario y carga los mensajes asociados.
         * @param {number} id - ID de la conversación seleccionada.
         */
        async IdUserSelect(id) {
            if (!id) {
                console.error("ID de conversación no definido");
                return;
            }
            const conversacionId = parseInt(id);
            this.id_conversacion = conversacionId;
            this.selectedId = conversacionId;

            try {
                const mensajes = await MensajesService.getMensajesByConversacion(conversacionId);
                this.mensajes = mensajes;
            } catch (error) {
                console.error("Error al recuperar mensajes:", error);
                this.mensajes = [];
            }
        },

        /**
         * @description Envía un mensaje a través del WebSocket.
         * @param {Event} event - El evento del formulario de envío de mensaje.
         */
        async sendMensagge(event) {
            const now = new Date();
            const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);
            const messageInfo = {
                'contenido': this.menssage,
                'conversacion_id': this.id_conversacion,
                'fecha_hora': formattedDate,
                'remitente_id': this.$store.state.auth.usuario.id,
            };

            this.socket.emit('sendMessage', messageInfo);
            this.menssage = "";
        },

        /**
         * @description Inicia una nueva conversación con un usuario.
         * @param {object} user - Objeto usuario con el que se iniciará la conversación.
         */
        async startConversation(user) {
            try {
                const existingConversations = await ConversacionesService.getConversacionesByUsuario(this.$store.state.auth.usuario.id);
                const existingConversation = existingConversations.find(c =>
                    (c.usuario_id === this.$store.state.auth.usuario.id && c.destinatario_id === user.id) ||
                    (c.destinatario_id === this.$store.state.auth.usuario.id && c.usuario_id === user.id)
                );

                if (existingConversation) {
                    this.$refs.toast.add({
                        severity: 'warn',
                        summary: 'Aviso',
                        detail: 'Ya existe una conversación entre estos usuarios.',
                        life: 5000
                    });
                    return;
                }

                const conversacionInfo = {
                    usuario_id: this.$store.state.auth.usuario.id,
                    destinatario_id: user.id
                };

                const newConversation = await this.$store.dispatch('addConversation', conversacionInfo);

                const userDetails = await UsuariosService.getUsuarioById(user.id);

                const detallesConversaciones = {
                    id: user.id,
                    name: userDetails.nombre,
                    apellidos: userDetails.apellidos,
                    imagen: userDetails.image_id ? userDetails.image_id : require("../../assets/fotoPerfil.jpg"),
                    id_conversacion: newConversation.id,
                    last_message: ''
                };

                this.$store.commit('setConversation', detallesConversaciones);

                this.id_conversacion = newConversation.id;
                this.showDialog = false;

            } catch (error) {
                console.error("Error al iniciar conversación:", error);
                this.$refs.toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo iniciar la conversación. Intente nuevamente.',
                    life: 5000
                });
            }
        }
    },

    /**
     * @description Hook de ciclo de vida que se ejecuta cuando el componente ha sido creado.
     */
    async created() {
        this.loading = true;
        this.connectSocket();
        this.fetchConversations();
    },

    /**
     * @description Eventos emitidos por el componente.
     * @event
     */
    emits: [],
};

export default MyShared;
