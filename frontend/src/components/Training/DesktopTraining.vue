<template> 
  <div>
    <Toast :position="'top-center'" ref="toast"></Toast>
    <div class="row justify-content-center" id="proyectos_div">
      <DataTable :value="everyTraining" responsiveLayout="scroll" :filters.sync="filters" filter-display="menu" :paginator="true" paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rows="7"
      current-page-report-template="Mostrando del {first} al {last} de {totalRecords} entradas"
      :global-filter-fields="['name','fecha', 'hora_inicio', 'hora_fin']" responsive-layout="scroll">
        <template #header>
          <div class="display: flex;" style="margin-bottom:10px;">
            <h5 class="m-0">
              <Button v-if="isUserEntrenador" type="button" icon="pi pi-plus" class="p-button-secondary ml-2" @click="resetFields();$refs.addTraining.openModal()" style="float:right;">
              </Button>
              Entrenamientos
              <span class="p-input-icon-left" style="float:right;">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Filtrar"
                  id="search-input"
                />
               
              </span>
            </h5>
          </div>
        </template>
        <template #empty> No hay entrenamientos en la base de datos. </template>
        <Column field="name" header="Nombre" sortable>
          <template #body="{data}">
            <span> 
              <strong>{{data.name}}</strong>
            </span>
        </template>
        </Column> 
        <Column field="fecha" header="Fecha" :filter-menu-style="{'width':'14rem'}" sortable>
          <template #body="{data}">
            <span class="state-stop"> 
              <strong>{{ formatFecha(data.fecha) }}</strong>
            </span>
          </template>
        </Column>
        <Column field="hora_inicio" header="Hora Inicio" sortable>
          <template #body="{data}">
            <span class="priority-normal" > 
              <strong>{{ formatHora(data.hora_inicio) }}</strong>
            </span>
          </template>
        </Column>
        <Column field="hora_fin" header="Hora Fin" sortable>
          <template #body="{data}">
            <span class="priority-normal" > 
              <strong>{{ formatHora(data.hora_fin) }}</strong>
            </span>
          </template>
        </Column>
        <Column
        headerStyle="min-width: 4rem; text-align: center"
        bodyStyle="text-align: center; overflow: visible"
        >
          <template #body="{data}">
            <Button
              v-if="isUserEntrenador"
              type="button"
              icon="pi pi-pencil"
              class="p-button-secondary m-1"
              @click="getTraining(data.id);$refs.editTraining.openModal()"
            ></Button>
            <Button
              v-if="isUserEntrenador"
              type="button"
              icon="pi pi-trash"
              class="p-button-secondary m-1"
              @click="deleteTraining(data.id)"
            ></Button>
            <Button
              type="button"
              icon="pi pi-file-pdf"
              class="p-button-secondary m-1"
              @click="generatePDF(data)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>

    <!---------------------------- Add Training --------------------------------------> 
  <Modal ref="addTraining">
    <template v-slot:header>
      <h1>Añadir nuevo entrenamiento</h1>
    </template>
    <template v-slot:body>
      <div class="form-group row">
        <div class="col-6">
          <label>Nombre del entreno</label>
          <input
            type="text"
            class="form-control"
            placeholder=""
            v-model="name"
          />
        </div>
        <div class="col-6">
          <label class="calendar-label">Fecha</label>
          <el-date-picker
            v-model="fecha"
            type="date"
            placeholder="Seleccione un dia">
          </el-date-picker>
        </div>    
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label class="calendar-label" >Hora de inicio</label>
          <el-time-picker
            v-model="horaInicio"
            placeholder="Seleccione hora de inicio"
            :picker-options="{ start: '00:00', step: '00:30', end: '23:30' }">
          </el-time-picker>
        </div>
        <div class="col-6">
          <label class="calendar-label">Hora de fin</label>
          <el-time-picker
            v-model="horaFin"
            placeholder="Seleccione hora de fin"
            :picker-options="{ start: '00:00', step: '00:30', end: '23:30' }">
          </el-time-picker>
        </div>
      </div>
      <!-- Campo para especificar el número de ejercicios -->
      <div class="form-number row">
        <div class="col-6">
          <label class="calendar-label">Número de Ejercicios</label>
          <InputNumber v-model="numExercises" @input="setNumExercises" />
        </div>
        
      </div>
      <!-- Lista de ejercicios -->
      <div class="mt-2" v-for="(exercise, index) in exercises" :key="index">
        <h5><strong> Ejercicio {{ index + 1 }} </strong> </h5>
        <div class="row">
          <div class="col-6">
            <!-- Título -->
          <InputText class="input-exercise" placeholder="Título" v-model="exercise.title" />
          </div>
          <div class="col-6">
            <!-- Material -->
          <InputText class="input-exercise" placeholder="Material" v-model="exercise.material" />
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <!-- Descripción -->
            <label class="textarea-label">Descripcion del ejercicio</label>
            <Textarea v-model="exercise.description" rows="5" cols="30" />
          </div> 
        </div>
        <!-- Foto -->
        <FileUpload name="demo[]" 
            :customUpload="true" 
            @uploader="event => handleFileChange(event, index)"
            chooseLabel="Elegir"
            uploadLabel="Subir"
            cancelLabel="Cancelar">
              <template #empty>
                  <p>Arrastre y suelte archivos aquí para cargarlos.</p>
              </template>
          </FileUpload>
      </div>
    </template>
        
    <template v-slot:footer>
      <div>
        <button class="btn" @click="$refs.addTraining.closeModal()">
          Cancelar
        </button>
        <button
          class="btn"
          @click="
            $refs.addTraining.closeModal();
            addOrUpdateTraining();
          "
          style="background-color: #00627c; color: white"
        >
          Guardar
        </button>
      </div>
    </template>
  </Modal>
  <!---------------------------- Edit Training --------------------------------------> 
  <Modal ref="editTraining">
    <template v-slot:header>
      <h1>Editar entrenamiento</h1>
    </template>
    <template v-slot:body>
      <div class="form-group row">
        <div class="col-6">
          <label>Nombre del entreno</label>
          <input
            type="text"
            class="form-control"
            placeholder=""
            v-model="name"
          />
        </div>
        <div class="col-6">
          <label class="calendar-label">Fecha</label>
          <el-date-picker
            v-model="fecha"
            type="date"
            placeholder="Seleccione un dia">
          </el-date-picker>
        </div>    
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label class="calendar-label" >Hora de inicio</label>
          <el-time-picker
            v-model="horaInicio"
            placeholder="Seleccione hora de inicio"
            :picker-options="{ start: '00:00', step: '00:30', end: '23:30' }">
          </el-time-picker>
        </div>
        <div class="col-6">
          <label class="calendar-label">Hora de fin</label>
          <el-time-picker
            v-model="horaFin"
            placeholder="Seleccione hora de fin"
            :picker-options="{ start: '00:00', step: '00:30', end: '23:30' }">
          </el-time-picker>
        </div>
      </div>
      <!-- Campo para especificar el número de ejercicios -->
      <div class="form-number row">
        <div class="col-6">
          <label class="calendar-label">Número de Ejercicios</label>
          <InputNumber v-model="numExercises" @input="setNumExercises" />
        </div>
        
      </div>
      <!-- Lista de ejercicios -->
      <div class="mt-2" v-for="(exercise, index) in exercises" :key="index">
        <h5><strong> Ejercicio {{ index + 1 }} </strong> </h5>
        <div class="row">
          <div class="col-6">
            <!-- Título -->
          <InputText class="input-exercise" placeholder="Título" v-model="exercise.title" />
          </div>
          <div class="col-6">
            <!-- Material -->
          <InputText class="input-exercise" placeholder="Material" v-model="exercise.material" />
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <!-- Descripción -->
            <label class="textarea-label">Descripcion del ejercicio</label>
            <Textarea v-model="exercise.description" rows="5" cols="30" />
          </div> 
        </div>
        <!-- Foto -->
        <div class="file-upload-wrapper p-d-flex p-ai-start">
          <!-- FileUpload Component -->
          <div class="p-mr-2">
            <FileUpload :name="exercise.image_id" 
            :customUpload="true" 
            @uploader="event => handleFileChange(event, index)"
            chooseLabel="Elegir"
            uploadLabel="Subir"
            cancelLabel="Cancelar">
              <template #empty>
                  <p>Arrastre y suelte archivos aquí para cargarlos.</p>
              </template>
            </FileUpload>
          </div>
          
          <!-- Preview Image -->
          <div v-if="exercise.image_id" class="p-mr-2">
            <img :src="exercise.image_id" alt="Imagen previa del ejercicio" class="p-mr-2" style="max-width: 100px;" v-tooltip="exercise.image_id"/>
          </div>
          
          <!-- Delete Button -->
          <Button v-if="exercise.image_id" label="Eliminar" icon="pi pi-times" class="p-button-danger mt-2" @click="deleteImage(index)"/>
        </div>
      </div>
    </template>
        
    <template v-slot:footer>
      <div>
        <button class="btn" @click="$refs.editTraining.closeModal(); trainingId = null">
          Cancelar
        </button>
        <button
          class="btn"
          @click="
            $refs.editTraining.closeModal();
            addOrUpdateTraining(trainingId);
          "
          style="background-color: #00627c; color: white"
        >
          Actualizar
        </button>
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
.preview-image {
width: 100px; /* o el tamaño que prefieras */
height: auto;
margin-top: 10px;
}
.calendar-label {
margin-right: 10px; /* Añadir margen a la derecha del label */
}
/* Estilo para el textarea */
textarea {
width: 100%;  /* Llena el ancho del contenedor */
padding: 10px;
border: 1px solid #ccc;
border-radius: 4px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Estilo para la etiqueta */
.textarea-label {
display: inline-block;
margin-bottom: 8px;
font-weight: bold;
margin-top: 0.5rem;
}
.input-exercise{
width: 100%;
padding: 0.5rem;
}
.form-group.row {
  display: flex;
  justify-content: center;  /* Centrado horizontal */
  align-items: center;  /* Centrado vertical */
  margin: 1rem;
}
.form-control{
display: inline !important;
width: auto !important;
margin-left: 10px;
}

.form-number{
display: flex;
align-items: center;  /* Centrado vertical */
margin: 1rem;
}

.active {
border-bottom-color: #0e475e;
}

.state-stop{
align-items: center;
padding: 0.2rem;
color: rgb(64, 44, 27);
background: rgb(253, 236, 200);
border-radius: 3px;  
}
.state-progress{
align-items: center;
padding: 0.2rem;
color: rgb(24, 51, 71);
background: rgb(211, 229, 239);
border-radius: 3px;  
}
.state-casual-work{
align-items: center;
padding: 0.2rem;
color:rgb(65, 36, 84);
background: rgb(232, 222, 238);
border-radius: 3px;  
}
.priority-normal{
align-items: center;
padding: 0.2rem;
color:rgb(24, 51, 71);
background: rgb(211, 229, 239);
border-radius: 3px;
}
.priority-urgent{
align-items: center;
padding: 0.2rem;
color:rgb(93, 23, 21);
background: rgb(255, 226, 221);
border-radius: 3px;
}
.priority-necessary{
align-items: center;
padding: 0.2rem;
color:rgb(73, 41, 14);
background: rgb(250, 222, 201);
border-radius: 3px;
}
.priority-low{
align-items: center;
padding: 0.2rem;
color:rgb(28, 56, 41);
background: rgb(219, 237, 219);
border-radius: 3px;
}
.priority-none{
align-items: center;
padding: 0.2rem;
color:rgb(50, 48, 44);
background: rgba(227, 226, 224, 0.5);
border-radius: 3px;
}
</style>
