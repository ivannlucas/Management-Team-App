<template>
  <div>
    <div class="card mt-2">
      <div class="col-12">
        <div class="p-datatable " style="border: 1px solid #e9ecef">
          <div class="p-datatable-header">
            Detalles del Partido
            <Button
              type="button"
              :icon="isDisabled ? 'pi pi-pencil' : 'pi pi-save'"
              iconPos="right"
              class="p-button-secondary ml-2 edit-profile"
              @click="toggleAndSave"
            ></Button>
          </div>
        </div>
      </div>
      
      
      <div class="row container-class">
        <div class="col-5 text-center mt-5 mb-3">
          Equipo Local: 
          <div>
            <InputText
              class="profile-input"
              type="text"
              v-model="partido.equipo_local_nombre"
              :disabled="isDisabled"
            />
          </div>
        </div>
        <div class="col-2 text-center mt-5 mb-3">
          RESULTADO
          <div style="background-color: black; opacity: 0.7; color: white;">
            <div v-if="isDisabled"> <!-- Si isDisabled es verdadero, muestra los goles -->
              {{partido.goles_equipo_local}} - {{ partido.goles_equipo_visitante }}
            </div>
            <div v-else> <!-- Si isDisabled es falso, muestra los inputs para editar -->
              <input type="number" v-model.number="partido.goles_equipo_local" style="width: 50px;">
              -
              <input type="number" v-model.number="partido.goles_equipo_visitante" style="width: 50px;">
            </div>
          </div>
          <div v-if="partido.estado === 'FINALIZADO'" class="mt-2" style="background-color: rgb(253, 0, 0); opacity: 0.9; color: rgb(0, 0, 0);">
            <select v-model="partido.estado" class="form-control" style="background-color: rgb(253, 0, 0); opacity: 0.9; color: rgb(0, 0, 0)" :disabled="isDisabled">
              <option value="PROGRAMADO">PROGRAMADO</option>
              <option value="FINALIZADO">FINALIZADO</option>
            </select>
          </div>
          <div v-else class="mt-2" style="background-color: rgb(21, 253, 0); opacity: 0.7; color: rgb(0, 0, 0);">
            <select v-model="partido.estado" class="form-control" style="background-color: rgb(21, 253, 0); opacity: 0.7; color: rgb(0, 0, 0);" :disabled="isDisabled">
              <option value="PROGRAMADO">PROGRAMADO</option>
              <option value="FINALIZADO">FINALIZADO</option> 
            </select>
          </div>
        </div>
        <div class="col-5 text-center  mt-5 mb-3">
          Equipo Visitante: 
          <div>
            <InputText
              class="profile-input"
              type="text"
              v-model="partido.equipo_visitante_nombre"
              :disabled="isDisabled"
            />
          </div>
        </div>
                       
      </div>
      <div class="row">
        <div class="col-12 text-center">
          Lugar: 
          <div>
            <InputText
              class="profile-input"
              type="text"
              v-model="partido.lugar"
              :disabled="isDisabled"
            />
          </div>
        </div>
        <div class="col-12 text-center">
          <div v-if="isDisabled"> <!-- Si isDisabled es verdadero, muestra la fecha -->
            Fecha: {{ formatDate(partido.fecha_hora) }} | {{ formatTime(partido.fecha_hora) }}
          </div>
          <div v-else> <!-- Si isDisabled es falso, muestra el input para editar -->
            <el-date-picker class="mt-2 mb-2" v-model="partido.fecha_hora" type="datetime" placeholder="Seleccione la fecha y hora"></el-date-picker>
          </div>
        </div>
      </div>
    </div>
    <div class="row statistics-class">
      <div class="col-6 pt-2" >
          <div class="card">
            <div class="col-12">
              <div class="p-datatable " style="border: 1px solid #e9ecef">
                <div class="p-datatable-header text-center">
                  Estadisticas Equipo Local
                  <Button
                    type="button"
                    :icon="isDisabledLocal ? 'pi pi-pencil' : 'pi pi-save'"
                    iconPos="right"
                    class="p-button-secondary ml-2 edit-profile"
                    @click="toggleAndSaveLocal"
                  ></Button>
                </div>
              </div>
            </div>
          <div class="col-12 input-class ">
            <label class="label-class" for="horizontal">Número de goles</label>
            <InputNumber id="horizontal" 
            v-model="partido.goles_equipo_local" 
            showButtons 
            :step="1"
            :disabled="isDisabledLocal"/>
          </div>
          <div class="row">
            <div class="col-12 input-class text-center">
              <h5 class="mt-3">Posesion </h5>
              <Knob v-model="partido.estadisticas_partido.posesion_balon_equipo_local" 
              valueTemplate="{value}%" 
              :disabled="isDisabledLocal"/>
            </div>
            <div class="col-12  input-class">
              
              <label class="label-class" for="horizontal2">Tiros a puerta:</label>
              
              <InputNumber id="horizontal2" 
              v-model="partido.estadisticas_partido.tiros_gol_equipo_local" 
              showButtons 
              :step="1" 
              :max="50"
              :disabled="isDisabledLocal"/>
            </div>
          </div>
          <div class="row">
            <div class="col-12 input-class ">
              <label class="label-class" for="minmax-buttons">Saques de esquina</label>
              <InputNumber id="minmax-buttons" 
              v-model="partido.estadisticas_partido.tiros_esquina_equipo_local" 
              mode="decimal" 
              showButtons 
              :min="0" 
              :max="20" 
              :disabled="isDisabledLocal"/>
            </div>
            <div class=" col-12 input-class ">
              <label class="label-class" for="minmax-buttons">Faltas cometidas</label>
              <InputNumber id="minmax-buttons" 
              v-model="partido.estadisticas_partido.faltas_equipo_local" 
              mode="decimal" 
              showButtons 
              :min="0" 
              :max="20" 
              :disabled="isDisabledLocal"/>
            </div>
          </div>
          <div class="row mb-2">
            <div class="field col-6 input-class text-center">
                <label for="vertical" style="display: block">Tarjetas Amarillas</label>
                <InputNumber id="vertical" 
                v-model="partido.estadisticas_partido.tarjetas_amarillas_equipo_local" 
                mode="decimal" 
                showButtons buttonLayout="vertical" 
                style="width:4rem"
                decrementButtonClass="p-button-secondary" 
                incrementButtonClass="p-button-secondary" 
                incrementButtonIcon="pi pi-plus" 
                decrementButtonIcon="pi pi-minus" 
                :disabled="isDisabledLocal"/>
            </div>
            <div class="field col-6 input-class text-center ">
                <label for="vertical" style="display: block">Tarjetas Rojas</label>
                <InputNumber id="vertical" 
                v-model="partido.estadisticas_partido.tarjetas_rojas_equipo_local" 
                mode="decimal" 
                showButtons buttonLayout="vertical" 
                style="width:4rem"
                decrementButtonClass="p-button-secondary" 
                incrementButtonClass="p-button-secondary" 
                incrementButtonIcon="pi pi-plus" 
                decrementButtonIcon="pi pi-minus" 
                :disabled="isDisabledLocal"/>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 pt-2" >
        <div class="card">
          <div class="col-12">
            <div class="p-datatable " style="border: 1px solid #e9ecef">
              <div class="p-datatable-header text-center">
                Estadisticas Equipo Visitante
                <Button
                  type="button"
                  :icon="isDisabledLocal ? 'pi pi-pencil' : 'pi pi-save'"
                  iconPos="right"
                  class="p-button-secondary ml-2 edit-profile"
                  @click="toggleAndSaveLocal"
                ></Button>
              </div>
            </div>
          </div>
          <div class="col-12 input-class ">
            <label class="label-class" for="horizontal">Número de goles</label>
            <InputNumber id="horizontal" 
            v-model="partido.goles_equipo_visitante" 
            showButtons 
            :step="1"
            :disabled="isDisabledLocal"/>
          </div>
          <div class="row">
            <div class="col-12 input-class text-center">
              <h5 class="mt-3">Posesion </h5>
              <Knob v-model="partido.estadisticas_partido.posesion_balon_equipo_visitante" 
              valueTemplate="{value}%" 
              :disabled="isDisabledLocal"/>
            </div>
            <div class="col-12  input-class">
              
              <label class="label-class" for="horizontal2">Tiros a puerta:</label>
              
              <InputNumber id="horizontal2" 
              v-model="partido.estadisticas_partido.tiros_gol_equipo_visitante" 
              showButtons 
              :step="1" 
              :max="50"
              :disabled="isDisabledLocal"/>
            </div>
          </div>
          <div class="row">
            <div class="col-12 input-class ">
              <label class="label-class" for="minmax-buttons">Saques de esquina</label>
              <InputNumber id="minmax-buttons" 
              v-model="partido.estadisticas_partido.tiros_esquina_equipo_visitante" 
              mode="decimal" 
              showButtons 
              :min="0" 
              :max="20" 
              :disabled="isDisabledLocal"/>
            </div>
            <div class=" col-12 input-class ">
              <label class="label-class" for="minmax-buttons">Faltas cometidas</label>
              <InputNumber id="minmax-buttons" 
              v-model="partido.estadisticas_partido.faltas_equipo_visitante" 
              mode="decimal" 
              showButtons 
              :min="0" 
              :max="20" 
              :disabled="isDisabledLocal"/>
            </div>
          </div>
          <div class="row mb-2">
            <div class="field col-6 input-class text-center">
                <label for="vertical" style="display: block">Tarjetas Amarillas</label>
                <InputNumber id="vertical" 
                v-model="partido.estadisticas_partido.tarjetas_amarillas_equipo_visitante" 
                mode="decimal" 
                showButtons buttonLayout="vertical" 
                style="width:4rem"
                decrementButtonClass="p-button-secondary" 
                incrementButtonClass="p-button-secondary" 
                incrementButtonIcon="pi pi-plus" 
                decrementButtonIcon="pi pi-minus" 
                :disabled="isDisabledLocal"/>
            </div>
            <div class="field col-6 input-class text-center ">
                <label for="vertical" style="display: block">Tarjetas Rojas</label>
                <InputNumber id="vertical" 
                v-model="partido.estadisticas_partido.tarjetas_rojas_equipo_visitante" 
                mode="decimal" 
                showButtons buttonLayout="vertical" 
                style="width:4rem"
                decrementButtonClass="p-button-secondary" 
                incrementButtonClass="p-button-secondary" 
                incrementButtonIcon="pi pi-plus" 
                decrementButtonIcon="pi pi-minus" 
                :disabled="isDisabledLocal"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
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
.statistics-class{
  margin-top: 1rem;
  /* border: 1px solid rgba(0, 0, 0, 0.5); */
}
.input-class{
  margin-top: 1rem;
}
.edit-profile {
  float: right;
  margin-top: -0.5rem !important;
}

.slider-class {
    display: flex;
    flex-direction: column; /* Alinea los hijos verticalmente */
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Centra verticalmente */
    height: 100%; /* Esto es importante para el centrado vertical */
}
.label-class{
  margin-right: 2rem;
  margin-left: 1rem;
}
.p-inputnumber-buttons-stacked .p-inputnumber-input {
  margin-left: 1rem !important;
}
</style>