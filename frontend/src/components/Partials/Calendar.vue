<template>
    <div id="calendar"></div>
  </template>
  
  <script>
  import 'tui-calendar/dist/tui-calendar.css';
  import Calendar from 'tui-calendar';
  
  export default {
      data() {
          return {
              /**
               * Instancia del calendario.
               * @type {Calendar|null}
               */
              calendar: null,
          };
      },
      mounted() {
          /**
           * Inicializa el calendario cuando el componente es montado.
           */
          this.calendar = new Calendar('#calendar', {
              defaultView: 'month',
              taskView: true,
              scheduleView: true,
              useCreationPopup: true,
              useDetailPopup: true,
          });
      },
      methods: {
          /**
           * Crea un nuevo evento en el calendario.
           * 
           * @param {Object} event - Objeto que representa el evento a crear.
           */
          createEvent(event) {
              this.calendar.createSchedules([event]);
          }
  
          // Puedes agregar otros métodos para gestionar eventos aquí
      },
  };
  </script>
  