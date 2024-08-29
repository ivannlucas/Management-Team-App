import Modal from "../../components/Partials/Modal";
import 'tui-calendar/dist/tui-calendar.css';
import Calendar from 'tui-calendar';
import VueCalendar from 'primevue/calendar';
import RadioButton from 'primevue/radiobutton';
import NotasCalendarioService from "../../services/notas/notas.service";
import { mapState } from 'vuex';

/**
 * @component CalendarComponent
 * @description Componente de calendario que permite la gestión de eventos con soporte para creación, edición y eliminación.
 */
var MyShared = {
    /** 
     * @name CalendarComponent
     * @type {string}
     * @description Nombre del componente.
     */
    name: "CalendarComponent",

    /** 
     * @description Componentes hijos utilizados en este componente.
     */
    components: {
        Modal,
        VueCalendar,
        RadioButton
        // Calendar
    },

    /**
     * @description Propiedades reactivas del componente.
     * @returns {object} Estado inicial del componente.
     */
    data() {
        return {
            calendar: null,
            selectedStartDate: null,
            selectedEndDate: null,
            title: null,
            date: null,
            selectedOption: null,
            mode: 'create', // puede ser 'create' o 'edit'
            eventClick: null,
            nameCalendar: new Date(),
            monthName: '',
            currentYear: new Date().getFullYear(),
        }
    },

    /**
     * @description Computed properties para el componente.
     */
    computed: {
        ...mapState('auth', ['usuario']),

        /**
         * @description Obtiene el nombre del mes actual visible en el calendario.
         * @returns {string} Nombre del mes actual.
         */
        currentMonthName() {
            const date = this.nameCalendar.getDate();
            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            return monthNames[date.getMonth()];
        },

        /**
         * @description Verifica si el usuario es un entrenador.
         * @returns {boolean} True si el usuario es entrenador, de lo contrario false.
         */
        isUserEntrenador() {
            return this.$store.state.auth.usuario && this.$store.state.auth.usuario.rol === 'entrenador';
        }
    },

    /**
     * @description Métodos disponibles en el componente.
     */
    methods: {

        /**
         * @description Navega al mes anterior en el calendario.
         */
        prevMonth() {
            this.calendar.prev();
            this.updateMonthName();
            this.updateYear();
        },

        /**
         * @description Navega al siguiente mes en el calendario.
         */
        nextMonth() {
            this.calendar.next();
            this.updateMonthName();
            this.updateYear();
        },

        /**
         * @description Actualiza el nombre del mes actual.
         */
        updateMonthName() {
            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            const date = this.calendar.getDate();
            this.monthName = monthNames[date.getMonth()];
        },

        /**
         * @description Actualiza el año actual visible en el calendario.
         */
        updateYear() {
            const date = this.calendar.getDate();
            this.currentYear = date.getFullYear();
        },

        /**
         * @description Añade un nuevo evento al calendario.
         * @param {string} title - El título del evento.
         */
        addEvent(title) {
            const isSingleDayEvent = this.selectedStartDate === this.selectedEndDate;
            const eventTypeMap = {
                '#FF0000': 'partido',
                '#00FF00': 'vacaciones',
                '#FF00FF': 'entrenamiento'
            };
            const eventColorMap = {
                'partido': {
                    bgColor: '#FF0000', // Rojo
                    borderColor: '#FF0000',
                    dragBgColor: '#FF0000'
                },
                'vacaciones': {
                    bgColor: '#00FF00', // Verde
                    borderColor: '#00FF00',
                    dragBgColor: '#00FF00'
                },
                'entrenamiento': {
                    bgColor: '#FF00FF', // Magenta
                    borderColor: '#FF00FF',
                    dragBgColor: '#FF00FF'
                }
            };
            const eventType = eventTypeMap[this.selectedOption]; // Determina el tipo de evento
            const eventColors = eventColorMap[eventType]; // Obtén los colores correspondientes

            var event = {
                calendarId: '1',
                equipo_id: this.$store.state.auth.usuario.detalles.equipo_id,
                titulo: title,
                type: eventType,
                start: this.selectedStartDate,
                end: this.selectedEndDate,
                bgColor: eventColors.bgColor,
                borderColor: eventColors.borderColor,
                color: '#ffffff',
                dragBgColor: eventColors.dragBgColor,
                dueDateClass: '',
            };
            this.createEvent(event);
        },

        /**
         * @description Maneja la selección de una fecha en el calendario.
         * @param {Object} scheduleData - Información sobre la fecha seleccionada.
         */
        handleDateClick(scheduleData) {
            this.selectedStartDate = scheduleData.start._date;
            this.selectedEndDate = scheduleData.end._date;
            this.title = '';
            this.selectedOption = null;
            this.mode = 'create';  // Establece el modo a 'create'
            this.$refs.addEvent.openModal();
        },

        /**
         * @description Maneja el evento de hacer clic en un evento del calendario.
         * @param {Object} e - Evento que contiene los datos del evento seleccionado.
         */
        async handleEventClick(e) {
            try {
                const eventDetails = await NotasCalendarioService.getNotaCalendarioById(e.schedule.id);
                this.selectedStartDate = eventDetails.start;
                this.selectedEndDate = eventDetails.end_time;
                this.title = eventDetails.titulo;

                const eventTypeMap = {
                    'partido': '#FF0000',
                    'vacaciones': '#00FF00',
                    'entrenamiento': '#FF00FF'
                };
                this.selectedOption = eventTypeMap[eventDetails.type];

                this.mode = 'edit';
                this.eventClick = e.schedule;
                this.$refs.addEvent.openModal();
            } catch (error) {
                console.error("Error al obtener los detalles del evento:", error);
                // Manejo de errores aquí, podrías mostrar un mensaje de error
            }
        },

        /**
         * @description Crea un nuevo evento en el calendario.
         * @param {Object} event - Objeto con los detalles del evento a crear.
         */
        async createEvent(event) {
            try {
                const createdEvent = await NotasCalendarioService.createNotaCalendario(event);
                event.id = createdEvent.id;
                event.calendarId = '1';
                event.category = 'time';
                event.title = event.titulo;
                this.calendar.createSchedules([event]);
            } catch (e) {
                console.error("Error al agregar el evento: ", e);
            }
        },

        /**
         * @description Actualiza un evento existente en el calendario.
         * @param {Object} e - Evento que contiene los datos del evento a actualizar.
         */
        async updateEvent(e) {
            var schedule = this.calendar.getSchedule(this.eventClick.id, this.eventClick.calendarId);
            schedule.titulo = this.title;
            schedule.start = this.selectedStartDate;
            schedule.end = this.selectedEndDate;
            
            const eventTypeMap = {
                '#FF0000': 'partido',
                '#00FF00': 'vacaciones',
                '#FF00FF': 'entrenamiento'
            };
            const eventColorMap = {
                'partido': {
                    bgColor: '#FF0000',
                    borderColor: '#FF0000',
                    dragBgColor: '#FF0000'
                },
                'vacaciones': {
                    bgColor: '#00FF00',
                    borderColor: '#00FF00',
                    dragBgColor: '#00FF00'
                },
                'entrenamiento': {
                    bgColor: '#FF00FF',
                    borderColor: '#FF00FF',
                    dragBgColor: '#FF00FF'
                }
            };
            const eventType = eventTypeMap[this.selectedOption];
            const eventColors = eventColorMap[eventType];
            
            schedule.bgColor = eventColors.bgColor;
            schedule.borderColor = eventColors.borderColor;
            schedule.dragBgColor = eventColors.dragBgColor;

            try {
                await NotasCalendarioService.updateNotaCalendario(this.eventClick.id, {
                    titulo: schedule.titulo,
                    start: schedule.start,
                    end: schedule.end,
                    type: eventType,
                    bgColor: schedule.bgColor,
                    borderColor: schedule.borderColor,
                    dragBgColor: schedule.dragBgColor,
                });
                this.calendar.updateSchedule(schedule.id, schedule.calendarId, schedule);
                console.log("Documento actualizado");
            } catch (e) {
                console.error("Error al actualizar el evento: ", e);
            }
            this.$refs.addEvent.closeModal();
        },

        /**
         * @description Elimina un evento existente del calendario.
         * @param {Object} e - Evento que contiene los datos del evento a eliminar.
         */
        async deleteEvent(e) {
            try {
                await NotasCalendarioService.deleteNotaCalendario(this.eventClick.id);
                this.calendar.deleteSchedule(this.eventClick.id, this.eventClick.calendarId);
                console.log("Documento eliminado");
            } catch (e) {
                console.error("Error al eliminar el evento: ", e);
            }
            this.$refs.addEvent.closeModal();
        },

        /**
         * @description Carga los eventos desde el servicio y los muestra en el calendario.
         */
        async loadEvents() {
            try {
                const events = await NotasCalendarioService.getAllNotasCalendario();
                const filteredEvents = events.filter(event => event.equipo_id === this.$store.state.auth.usuario.detalles.equipo_id);

                filteredEvents.forEach(event => {
                    event.calendarId = '1';
                    event.category = 'time';
                    event.title = event.titulo;
                    if (event.start) {
                        event.start = new Date(event.start);
                    }
                    if (event.end_time) {
                        event.end = new Date(event.end_time);
                    }
                });
                this.calendar.createSchedules(filteredEvents);
            } catch (error) {
                console.error("Error al obtener los eventos: ", error);
            }
        }
    },

    /**
     * @description Lifecycle hook que se ejecuta cuando el componente ha sido montado.
     */
    mounted() {
        this.calendar = new Calendar('#calendar', {
            defaultView: 'month',
            taskView: true,
            scheduleView: false,
            useCreationPopup: false,
            useDetailPopup: false,
        });
        this.calendar.on('beforeCreateSchedule', this.handleDateClick);
        this.calendar.on('clickSchedule', this.handleEventClick);
        this.loadEvents();

        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const date = new Date();
        this.monthName = monthNames[date.getMonth()];
        this.currentYear = date.getFullYear();
    },

    /**
     * @description Eventos emitidos por el componente.
     */
    emits: ["Calendar"],
};

export default MyShared;
