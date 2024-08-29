import SidebarHome from '../../components/Partials/SidebarHome.vue';

/**
 * @mixin MyShared
 * @description Mixin que proporciona la funcionalidad para la vista principal del sistema de gestión de equipo de fútbol.
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
             * @property {string} title - Título principal de la vista.
             */
            title: "Management Futbol Team",

            /** 
             * @property {string} subtitle - Subtítulo descriptivo de la vista.
             */
            subtitle: "Comienza a gestionar tu plantilla"
        };
    },

    /**
     * @description Componentes utilizados en este componente.
     */
    components: {
        SidebarHome
    },

    /**
     * @description Eventos emitidos por el componente.
     * @event
     */
    emits: ["editPerson"],
};

export default MyShared;
