<template>
    <div class="row" v-if="!isLoading">
       
      <h3>Detalles del jugador</h3>
            <div class="col-12">
                
                <div class="p-datatable pb-2" style="border: 1px solid #e9ecef">
                    <div class="p-datatable-header">
                        Perfil
                       
                    </div>
                    <div class="pl-2 mt-2">
                        <div class="row">
                            <div class="col-4 text-center" >
                                <img
                                :src="user.usuario.image_id || require('@/assets/cara1.png')"
                                alt="Avatar"
                                class="rounded-circle mt-2 mb-2"
                                height="200"
                                width="200"
                                />
                            </div>
                            <div class="col-8">
                                <div class="row">
                                    <div class="col-6 pt-0 mt-2 mb-2">
                                        <label class="profile-label" for="name"> Nombre </label>
                                        <InputText
                                        class="profile-input"
                                        id="name"
                                        type="text"
                                        v-model="user.usuario.nombre"
                                        :value="user.usuario.nombre"
                                        :disabled="isDisabled"
                                        />
                                    </div>
                                    <div class="col-6 pt-0 mt-2 mb-2">
                                        <label class="profile-label" for="name">
                                        Apellidos
                                        </label>
                                        <InputText
                                        class="profile-input"
                                        id="name"
                                        type="text"
                                        v-model="user.usuario.apellidos"
                                        :value="user.usuario.apellidos"
                                        :disabled="isDisabled"
                                        />
                                    </div>
                                    <div class="col-6 pt-0 mt-2 mb-2">
                                        <label class="profile-label" for="name"> Email </label>
                                        <InputText
                                        class="profile-input"
                                        id="name"
                                        type="text"
                                        v-model="user.usuario.email"
                                        :value="user.usuario.email"
                                        :disabled="isDisabled"
                                        />
                                    </div>
                                    <div class="col-6 pt-0 mt-2 mb-2">
                                        <label class="profile-label" for="name"> Rol </label>
                                        <InputText
                                        class="profile-input"
                                        id="name"
                                        type="text"
                                        v-model="user.usuario.rol"
                                        :value="user.usuario.rol"
                                        :disabled="true"
                                        />
                                    </div>
                                    <div class="col-6 pt-0 mt-2 mb-2">
                                        <label class="profile-label" for="edad"> Edad </label>
                                        <InputNumber 
                                            class=" profile-input " 
                                            id="edad" 
                                            v-model="user.edad"
                                            :value="user.edad" 
                                            mode="decimal" 
                                            :min="16" 
                                            :max="100" 
                                            :disabled="isDisabled"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row my-row">
                            <div class="col-3 pt-0 mt-2 mb-2" v-if="user && user.detalles">
                                <label class="profile-label" for="peso">
                                Peso
                                </label>
                                <InputNumber 
                                    class=" profile-input " 
                                    id="peso" 
                                    v-model="user.peso"
                                    :value="user.peso" 
                                    :minFractionDigits="2" 
                                    :maxFractionDigits="3" 
                                    suffix=" kg"
                                    :disabled="isDisabled"/>
                            </div>
                            <div class="col-3 pt-0 mt-2 mb-2">
                                <label class="profile-label" for="altura">
                                Altura
                                </label>
                                <InputNumber 
                                    class=" profile-input " 
                                    id="altura" 
                                    v-model="user.altura"
                                    :value="user.altura" 
                                    mode="decimal" 
                                    suffix=" cm"
                                    :disabled="isDisabled"/>
                            </div>
                            <div class="col-3 pt-0 mt-2 mb-2">
                                <label class="profile-label" for="num_camiseta">
                                Número de camiseta
                                </label>
                                <InputNumber 
                                    class=" profile-input " 
                                    id="num_camiseta" 
                                    v-model="user.num_camiseta"
                                    :value="user.num_camiseta" 
                                    mode="decimal" 
                                    :min="0" 
                                    :max="99"
                                    :disabled="isDisabled"/>
                            </div>
                            <div class="col-3 pt-0 mt-2 mb-2">
                                <label class="profile-label" for="posicion">
                                Posicion
                                </label>
                                <InputText
                                    class="profile-input"
                                    id="posicion"
                                    type="text"
                                    v-model="user.posicion"
                                    :value="user.posicion"
                                    :disabled="true"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-2">
                <div class="p-datatable pb-2" style="border: 1px solid #e9ecef">
                    <div class="p-datatable-header">
                        Estadisticas
                        <Button
                        type="button"
                        :icon="isDisabledStatistics ? 'pi pi-pencil' : 'pi pi-save'"
                        iconPos="right"
                        class="p-button-secondary ml-2 edit-profile"
                        @click="handleClick"
                        ></Button>
                    </div>
                    <div class="pl-2 mt-2">
                        <div class="row">
                            <!--  PARTIDO JUGADOS -->
                            <div class="col-4 text-center col-4-centered">
                                <div class="ball-ico">
                                    <div class="img-ico event-44"></div>
                                </div>
                                <div>
                                    <label for="games" class="profile-label"> Partidos jugados </label>
                                    <InputNumber v-model="statistics.partidos_jugados" 
                                    id="games" :disabled="isDisabledStatistics"/>
                                </div>       
                            </div>
                            <!--  Minutos JUGADOS -->
                            <div class="col-4 text-center col-4-centered">
                                <div class="ball-ico">
                                    <div class="img-ico event-38"></div>
                                </div>
                                <div>
                                    <label for="minutes" class="profile-label"> Minutos jugados </label>
                                    <InputNumber v-model="statistics.minutos_jugados" 
                                    id="minutes" :disabled="isDisabledStatistics"/>
                                </div>       
                            </div>
                            <!--  Goles -->
                            <div class="col-4 text-center col-4-centered">
                                <div class="ball-ico">
                                    <div class="img-ico event-1"></div>
                                </div>
                                <div>
                                    <label for="goals" class="profile-label">Número de Goles </label>
                                    <InputNumber v-model="statistics.goles_anotados" 
                                    id="goals" :disabled="isDisabledStatistics"/>
                                </div>       
                            </div>
                            <!--  Asistencias -->
                            <div class="col-4 text-center col-4-centered mt-2">
                                <div class="ball-ico">
                                    <div class="img-ico event-22"></div>
                                </div>
                                <div>
                                    <label for="asistencias" class="profile-label">Número de Asistencias </label>
                                    <InputNumber v-model="statistics.asistencias" 
                                    id="asistencias" :disabled="isDisabledStatistics"/>
                                </div>       
                            </div>
                            <!--  Tarjetas Amarillas -->
                            <div class="col-4 text-center col-4-centered mt-2">
                                <div class="ball-ico">
                                    <div class="img-ico event-5"></div>
                                </div>
                                <div>
                                    <label for="tarj_amarillas" class="profile-label "> Tarjetas Amarillas </label>
                                    <InputNumber v-model="statistics.tarjetas_amarillas" 
                                    id="tarj_amarillas" :disabled="isDisabledStatistics"/>
                                </div>       
                            </div>
                            <!--  Tarjetas Rojas -->
                            <div class="col-4 text-center col-4-centered mt-2">
                                <div class="ball-ico">
                                    <div class="img-ico event-3"></div>
                                </div>
                                <div>
                                    <label for="tarj_rojas" class="profile-label mr-4" style="margin-right: 1.5rem;"> Tarjetas Rojas </label>
                                    <InputNumber v-model="statistics.tarjetas_rojas" 
                                    inputId="tarj_rojas" :disabled="isDisabledStatistics"/>
                                </div>       
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <Dialog :visible="true" :closable="false">
                <template #header>
                    <h3>Recopilando datos</h3>
                </template>
                <div class="flex-center">
                    <ProgressSpinner />
                </div>
            </Dialog>
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
#app{
      text-align: left !important;
  }
  .profile-label {
  color: #114687;
  font-weight: bold;
  text-align: left;
}
.flex-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;  /* Asegúrate de darle una altura, o usar otro contenedor para determinar la altura. */
}

.profile-input {
  /* border-bottom: 2px solid rgb(201, 201, 201); */
  border-radius: 0;
  width: 100%;
}
.edit-profile {
  float: right;
  margin-top: -0.5rem !important;
}
.rounded-circle:hover {
  cursor: pointer;
  filter: brightness(1.25);
}
  .my-title{
      text-align: left;
      margin: 2rem;
  }
  .container{
      background-color: red;
  }
  .my-form1{
      /*background-color: aqua;*/
      padding: 1rem;
      /*height: 100vh;*/
      margin-left: 2rem;
      margin-right: 1rem;
  }
  
  .my-form2{
      /*background-color: blueviolet;*/
      padding: 1rem;
      /*height: 100vh;*/
      margin-right: 2rem;
      /*border: 0.25px solid rgb(108, 106, 106);*/
  }
  
  .my-img{
      /*position: absolute;*/
      display: flex;
      
      
  }
  
  .my-name{
      display: flex !important;
      margin-top: 1rem;
  }
  .my-classFoto{
      background-color: #edf0f3;
      width: 44px;
      height: 44px;
      border: 5px solid #fff;
      position: absolute;
      align-content: center;
      border-radius: 50px;
      display: flex;
      justify-content: center;
  }
  
  .list-group-item {
      border: 0px !important;
  }
  
  .my-item{
      background-color: transparent !important;
  }
  .my-input{
       margin-top: 9rem;
  }
  .col-4-centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
  .ball-ico {
    background-color: #ececec; /* fondo gris claro */
    border-radius: 100%; /* redondea las esquinas para hacerlo un círculo */
    width: 34px; /* ancho del contenedor */
    height: 34px; /* altura del contenedor */
    position: relative; /* posición relativa para el posicionamiento absoluto de elementos secundarios */
    display: flex; /* usa flexbox para centrar el contenido */
    flex-direction: column; /* orientación de los elementos flex: de arriba hacia abajo */
    justify-content: center; /* centra elementos verticalmente */
    align-items: center; /* centra elementos horizontalmente */
}
.event-43.aft-ico:after, .event-43.bef-ico:before, .event-43.img-ico {
    background-position: -58px -203px; /* posición del fondo para mostrar la parte correcta de la imagen en sprite */
}
.event-44.aft-ico:after, .event-44.bef-ico:before, .event-44.img-ico {
    background-position: -87px -203px;
}

.event-1.aft-ico:after, .event-1.bef-ico:before, .event-1.img-ico {
    background-position: 0px 0px;
}

.event-38.aft-ico:after, .event-38.bef-ico:before, .event-38.img-ico {
    background-position: -58px -174px;
}
.event-22.aft-ico:after, .event-22.bef-ico:before, .event-22.img-ico {
    background-position: -29px -58px;
}
.event-5.aft-ico:after, .event-5.bef-ico:before, .event-5.img-ico {
    background-position: 0 -29px;
}
.event-3.aft-ico:after, .event-3.bef-ico:before, .event-3.img-ico {
    background-position: -29px -29px;
}
.img-ico {
    background: url("~@/assets/sprite_events_new.png") no-repeat; /* imagen en sprite que contiene todos los iconos */
    background-size: 145px; /* ajusta el tamaño del fondo */
    content: ''; /* contenido vacío, ya que se usa un fondo para la imagen */
    display: inline-block; /* hace que el div sea un bloque en línea */
    position: relative; /* posición relativa para posicionamiento adicional */
    width: 29px; /* ancho del icono */
    height: 29px; /* altura del icono */
}

</style>