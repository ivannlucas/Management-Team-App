<template>
  <div>
    <div class="text-center section">
      <h2 class="h2">Calendar</h2>
    </div>
    
    <div id="calendar" class="my-calendar">
    <div class="calendar-navigation">
      <button @click="prevMonth">Anterior</button>
      <span class="current-month">{{ monthName }} de {{ currentYear }}</span>
      <button @click="nextMonth">Siguiente</button>
    </div>
    </div>
    <!---------------------------- Add Event --------------------------------------> 
    <Modal ref="addEvent">
      <template v-slot:header>
        <h1 v-if="mode === 'create'">Añadir nuevo evento</h1>
        <h1 v-else >Actualizar nuevo evento</h1>
      </template>
      <template v-slot:body>
        <div class="form-group">
          <label>Titulo</label>
          <input    
            type="text"
            class="form-control"
            placeholder="Proyecto"
            v-model="title"
          />
        </div>
        <div class="form-group">
          <div class="text-center row mt-3">
            <div class="col-6 ">
              <label class="calendar-label">Fecha Inicio</label>
              <el-date-picker
                v-model="selectedStartDate"
                type="date"
                placeholder="Seleccione un dia">
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="form-group">  
          <div class="text-center row mt-3">
            <div class="col-6 ">
                <label class="calendar-label">Fecha Fin </label>
                <el-date-picker
                  v-model="selectedEndDate"
                  type="date"
                  placeholder="Seleccione un dia">
              </el-date-picker>
            </div>  
          </div>
        </div>     
        <div class="form-group">
          
          <div class="row mt-3">
            <label>Tipo de Evento:</label>
            <div class="col-4 ">
              <RadioButton id="option1" inputId="option1" name="option" value="#FF0000" v-model="selectedOption" />
              <label for="option1" class="label-radio">Partido</label>
            </div>
            <div class="col-4">
              <RadioButton id="option2" inputId="option2" name="option" value="#00FF00" v-model="selectedOption" />
              <label for="option2" class="label-radio">Vacaciones</label>
            </div>  
            <div class="col-4">
              <RadioButton id="option3" inputId="option3" name="option" value="#FF00FF" v-model="selectedOption" />
              <label for="option3" class="label-radio">Entrenamiento</label>
            </div>
          </div>
        </div>
      </template>
                
      <template v-slot:footer>
        <div class="footer-container">
          <button class="btn" v-if="mode === 'create'" @click="$refs.addEvent.closeModal()">
            Cancelar
          </button>
          <button
            class="btn"
            v-if="mode === 'create' && isUserEntrenador"
            @click="
            $refs.addEvent.closeModal();
            addEvent(
              title,
            );"
            style="background-color: #00627c; color: white"
            >
              Guardar
            </button>
            
            <div class="button-container">
                <button class="btn btn-start m-3" v-if="mode === 'edit' && isUserEntrenador" @click="updateEvent($event)" style="background-color: #00627c; color: white">
                  Actualizar
                </button>
                <button class="btn btn-start m-3" v-if="mode === 'edit' && isUserEntrenador" @click="deleteEvent($event)" style="background-color: #ff0000; color: white">
                    Eliminar
                </button>
                <button v-if="mode === 'edit'" class="btn btn-end" @click="$refs.addEvent.closeModal()">
                    Cancelar
                </button>
            </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<!----------------------------------------------->
<!--                    SCRIPT                 -->
<!----------------------------------------------->
<script>
/**
 * @mixin MyShared
 * Este mixin proporciona las funcionalidades compartidas relacionadas con el calendario.
 */

import MyShared from "./shared";

export default {
  components: {},
  mixins: [MyShared],
};
</script>

<style scoped>
#calendar {
  margin-left: 4rem !important;
  margin-right: 1rem !important;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden; /* Agregar barras de desplazamiento si es necesario */
}
button-container {
    display: flex;
    justify-content: flex-start; /* No es estrictamente necesario, ya que este es el valor por defecto */
    align-items: center; /* Si quieres que los botones estén centrados verticalmente, de lo contrario puedes omitirlo */
} 
.btn-end{
  margin-left: auto;

}

.example{
  position: inherit;
}
.my-calendar.tui-full-calendar-month-creation-guide {
    border: none !important;
    background-color: transparent !important;
}
.calendar-container {
  display: flex; /* Utilizar flexbox para alinear los elementos */
  align-items: center; /* Centrar verticalmente */
}

.calendar-label {
  margin-right: 10px; /* Añadir margen a la derecha del label */
}

.p-calendar{
  position: inherit;
}

.modal__footer{
  margin-top: inherit;
}
element.style.p-calendar .p-datepicker {
  left: 0% !important;
}

.p-datepicker {
  top: 0px !important; 
}
.label-radio{
  margin-left: 1rem;
}

.calendar-navigation {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.calendar-navigation button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    background-color: #00627c;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

.calendar-navigation button:hover {
    background-color: #004a60;
}
.calendar-navigation .current-month {
    margin: 0 1rem;
    font-weight: bold;
}

.modal1 {
       z-index: 20 !important;
  }
</style>