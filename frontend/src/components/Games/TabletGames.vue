<template> 
    <div>
      <Toast :position="'top-center'" ref="toast"></Toast>
      <DataView :value="games" :layout="layout" :paginator="true" :rows="3" :sortOrder="sortOrder" :sortField="sortField">
        <template #header>
            <div class=" row grid grid-nogutter">
                <div class="col-6" style="text-align: left">
                    <h5 class="mt-2">Partidos</h5>   
                </div>
                <div class="col-6" style="text-align: right">
                    <button v-if="isUserEntrenador" @click="$refs.addGame.openModal()" 
                    class="btn btn-secundary p-2"
                    style="color: #ffffff;background: #607D8B;" >
                      Añadir Partido
                    </button>
                </div>
            </div>
        </template>
        <template #grid="slotGames">
            <div class="col-12 md:col-4 ">
                <div class="product-grid-item card m-3" >
                    <div class="row ">
                       
                        <div class="col-5 text-center mt-5 mb-3">
                          Equipo Local: 
                          <div>
                            <strong>{{slotGames.data.equipo_local_nombre}}</strong>
                          </div>
                        </div>
                        <div class="col-2 text-center mt-5 mb-3">
                          RESULTADO
                          <div style="background-color: black; opacity: 0.7; color: white;">
                            {{slotGames.data.goles_equipo_local}} - {{ slotGames.data.goles_equipo_visitante }}
                          </div>
                          <div v-if="slotGames.data.estado === 'FINALIZADO'" class="mt-2" style="background-color: rgb(253, 0, 0); opacity: 0.9; color: rgb(0, 0, 0);">
                            {{slotGames.data.estado}} 
                          </div>
                          <div v-else class="mt-2" style="background-color: rgb(21, 253, 0); opacity: 0.7; color: rgb(0, 0, 0);">
                            {{slotGames.data.estado}} 
                          </div>
                        </div>
                        <div class="col-5 text-center  mt-5 mb-3">
                          Equipo Visitante: 
                          <div>
                            <strong>{{slotGames.data.equipo_visitante_nombre}}</strong>
                          </div>
                        </div>
                       
                    </div>
                    <div class="row">
                      <div class="col-12 text-center">
                        Lugar: {{ slotGames.data.lugar }} 

                      </div>
                      <div class="col-12 text-center">
                        Fecha: {{ formatDate(slotGames.data.fecha_hora) }} | {{ formatTime(slotGames.data.fecha_hora) }}
                      </div>

                    </div>
                    <!-- Botones alineados a la derecha -->
                    <div class="text-right footer">
                        <Button
                            type="button"
                            icon="pi pi-eye"
                            class="p-button-secondary m-1"
                            @click="checkStatistics(slotGames.data.id,slotGames.data)"
                        ></Button>
                        <Button
                            v-if="isUserEntrenador"
                            type="button"
                            icon="pi pi-trash"
                            class="p-button-secondary m-1"
                            @click="deleteGame(slotGames.data.id)"
                        ></Button>
                    </div>
                </div>
            </div>
        </template>
    </DataView>

      <!---------------------------- Add Game --------------------------------------> 
      <Modal ref="addGame">
        <template v-slot:header>
          <h1>Añadir nuevo partido</h1>
        </template>
        <template v-slot:body>
          <div class="row">
            <div class="form-group col-md-6">
              <label>Equipo Local</label>
              <input type="text" class="form-control" v-model="equipo_local" />
            </div>
            <div class="form-group col-md-6">
              <label>Equipo Visitante</label>
              <input type="text" class="form-control" v-model="equipo_visitante" />
            </div>
          </div>
          <div class="row mt-2">
            <div class="form-group col-md-6 align-center">
              <label>Fecha y Hora</label>
              <el-date-picker v-model="fecha_hora" type="datetime" placeholder="Seleccione la fecha y hora"></el-date-picker>
            </div>
            <div class="form-group col-md-6">
              <label>Lugar</label>
              <input type="text" class="form-control" v-model="lugar" />
            </div>
          </div>
          <div class="row mt-2">
            <div class="form-group col-md-6">
              <label>Goles Equipo Local</label>
              <input type="number" class="form-control" v-model="goles_equipo_local" :disabled="estado !== 'FINALIZADO'"/>
            </div>
            <div class="form-group col-md-6">
              <label>Goles Equipo Visitante</label>
              <input type="number" class="form-control" v-model="goles_equipo_visitante" :disabled="estado !== 'FINALIZADO'"/>
            </div>
          </div>
          
          <div class="form-group mt-2">
            <label>Estado del Partido</label>
            <select v-model="estado" class="form-control">
              <option value="PROGRAMADO">PROGRAMADO</option>
              <option value="FINALIZADO">FINALIZADO</option>
            </select>
          </div>
          <!-- Condicional para mostrar los campos de estadísticas del partido -->
          <div class="mt-3" v-if="estado === 'FINALIZADO'">
            <h3>Estadísticas del Partido</h3>
            <div class="row">
              <div class="form-group col-md-6">
                <label>Posesión de Balón Equipo Local (%)</label>
                <input type="number" min="10" max="100" class="form-control" v-model="posesion_balon_equipo_local" />
              </div>
              <div class="form-group col-md-6">
                <label>Posesión de Balón Equipo Posesión de Balón Equipo Visitante (%)</label>
                <input type="number" min="10" max="100" class="form-control" v-model="posesion_balon_equipo_visitante"/>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label>Tiros a Gol Equipo Local</label>
                <input type="number" class="form-control" v-model="tiros_gol_equipo_local" />
              </div>
              <div class="form-group col-md-6">
                <label>Tiros a Gol Equipo Visitante</label>
                <input type="number" class="form-control" v-model="tiros_gol_equipo_visitante" />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label>Tiros de Esquina Equipo Local</label>
                <input type="number" class="form-control" v-model="tiros_esquina_equipo_local" />
              </div>
              <div class="form-group col-md-6">
                <label>Tiros de Esquina Equipo Visitante</label>
                <input type="number" class="form-control" v-model="tiros_esquina_equipo_visitante" />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label>Faltas Equipo Local</label>
                <input type="number" class="form-control" v-model="faltas_equipo_local" />
              </div>
              <div class="form-group col-md-6">
                <label>Faltas Equipo Visitante</label>
                <input type="number" class="form-control" v-model="faltas_equipo_visitante" />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label>Tarjetas Amarillas Equipo Local</label>
                <input type="number" class="form-control" v-model="tarjetas_amarillas_equipo_local" />
              </div>
              <div class="form-group col-md-6">
                <label>Tarjetas Amarillas Equipo Visitante</label>
                <input type="number" class="form-control" v-model="tarjetas_amarillas_equipo_visitante" />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label>Tarjetas Rojas Equipo Local</label>
                <input type="number" class="form-control" v-model="tarjetas_rojas_equipo_local" />
              </div>
              <div class="form-group col-md-6">
                <label>Tarjetas Rojas Equipo Visitante</label>
                <input type="number" class="form-control" v-model="tarjetas_rojas_equipo_visitante" />
              </div>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <button class="btn" @click="$refs.addGame.closeModal()">Cancelar</button>
          <button class="btn btn-primary" @click="addGame()">Guardar</button>
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
.active {
  border-bottom-color: #0e475e;
}
.align-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
.footer{
  display: inline;
  text-align: end;
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
