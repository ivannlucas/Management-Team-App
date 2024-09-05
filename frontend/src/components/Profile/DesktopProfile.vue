<template>
    <div class="container-fluid">
        <div class="row">
            <h2 class="my-title ">Mi cuenta</h2>
        </div>

        <div class="row my-row">
            <div class="col-12">
                <div class="p-datatable pb-2" style="border: 1px solid #e9ecef">
                    <div class="p-datatable-header">
                        Perfil
                        <Button
                        type="button"
                        :icon="isDisabled ? 'pi pi-pencil' : 'pi pi-save'"
                        iconPos="right"
                        class="p-button-secondary ml-2 edit-profile"
                        @click="
                            isDisabled = !isDisabled;
                            !isDisabled ? null : saveProfile();
                        "
                        ></Button>
                    </div>
                    <div class="pl-2">
                        <div class="row">
                            <div class="col-4 text-center" >
                                <img
                                :src="user.image_id || require('@/assets/cara1.png') "
                                alt="Avatar"
                                class="rounded-circle mt-2 mb-2"
                                height="200"
                                width="200"
                                />
                                <FileUpload 
                                    name="demo[]" 
                                    mode="basic" 
                                    :customUpload="true" 
                                    @uploader="event => uploadToBackend(event)" 
                                    :disabled="isDisabled"
                                    chooseLabel="Elegir" 
                                />
                            </div>
                            <div class="col-8">
                                <div class="row">
                                    <div class="col-12 pt-0 mt-2 mb-2">
                                        <label class="profile-label" for="name"> Nombre </label>
                                        <InputText
                                        class="profile-input"
                                        id="name"
                                        type="text"
                                        v-model="user.nombre"
                                        :value="user.nombre"
                                        :disabled="isDisabled"
                                        />
                                    </div>
                                    <div class="col-12 pt-0 mt-2 mb-2">
                                        <label class="profile-label" for="name">
                                        Apellidos
                                        </label>
                                        <InputText
                                        class="profile-input"
                                        id="name"
                                        type="text"
                                        v-model="user.apellidos"
                                        :value="user.apellidos"
                                        :disabled="isDisabled"
                                        />
                                    </div>
                                    <div class="col-12 pt-0 mt-2 mb-2">
                                        <label class="profile-label" for="name"> Email </label>
                                        <InputText
                                        class="profile-input"
                                        id="name"
                                        type="text"
                                        v-model="user.email"
                                        :value="user.email"
                                        :disabled="isDisabled"
                                        />
                                    </div>
                                    <div class="col-12 pt-0 mt-2 mb-2">
                                        <label class="profile-label" for="name"> Rol </label>
                                        <InputText
                                        class="profile-input"
                                        id="name"
                                        type="text"
                                        v-model="user.rol"
                                        :value="user.rol"
                                        :disabled="true"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row my-row">
                            <div class="col-5 pt-0 mt-2 mb-2 ml-2">
                                <label class="profile-label" for="edad"> Edad </label>
                                <InputNumber 
                                    class=" profile-input " 
                                    id="edad" 
                                    v-model="user.detalles.edad"
                                    :value="user.detalles.edad" 
                                    mode="decimal" 
                                    :min="16" 
                                    :max="100" 
                                    :disabled="isDisabled"/>
                            </div>
                            <div class="col-5 pt-0 mt-2 mb-2" v-if="user.rol === 'entrenador'">
                                <label class="profile-label" for="anios">
                                Años de Experiencia
                                </label>
                                <InputNumber 
                                    class=" profile-input " 
                                    id="anios" 
                                    v-model="user.detalles.anios_experiencia"
                                    :value="user.detalles.anios_experiencia" 
                                    mode="decimal" 
                                    :min="16" 
                                    :max="100" 
                                    :disabled="isDisabled"/>
                            </div>
                            <div class="col-5 pt-0 mt-2 mb-2" v-if="user.rol === 'jugador'">
                                <label class="profile-label" for="peso">
                                Peso
                                </label>
                                <InputNumber 
                                    class=" profile-input " 
                                    id="peso" 
                                    v-model="user.detalles.peso"
                                    :value="user.detalles.peso" 
                                    :minFractionDigits="2" 
                                    :maxFractionDigits="3" 
                                    suffix=" kg"
                                    :disabled="isDisabled"/>
                            </div>
                            <div class="col-5 pt-0 mt-2 mb-2" v-if="user.rol === 'jugador'">
                                <label class="profile-label" for="altura">
                                Altura
                                </label>
                                <InputNumber 
                                    class=" profile-input " 
                                    id="altura" 
                                    v-model="user.detalles.altura"
                                    :value="user.detalles.altura" 
                                    mode="decimal" 
                                    suffix=" cm"
                                    :disabled="isDisabled"/>
                            </div>
                            <div class="col-5 pt-0 mt-2 mb-2" v-if="user.rol === 'jugador'">
                                <label class="profile-label" for="numero_camiseta">
                                Número de camiseta
                                </label>
                                <InputNumber 
                                    class=" profile-input " 
                                    id="numero_camiseta" 
                                    v-model="user.detalles.numero_camiseta"
                                    :value="user.detalles.numero_camiseta" 
                                    mode="decimal" 
                                    :min="0" 
                                    :max="99"
                                    :disabled="isDisabled"/>
                            </div>
                            <div class="col-5 pt-0 mt-2 mb-2" v-if="user.rol === 'jugador'">
                                <label class="profile-label" for="posicion">
                                Posicion
                                </label>
                                <InputText
                                    class="profile-input"
                                    id="posicion"
                                    type="text"
                                    v-model="user.detalles.posicion"
                                    :value="user.detalles.posicion"
                                    :disabled="true"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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

.my-row{
    display: flex;
    justify-content: center; /* Centrado horizontal */
    align-items: center;     /* Centrado vertical */
    height: 100%;            /* Asegúrate de que .row tenga una altura si no tiene contenido o establece una altura específica */
}

  #app{
      text-align: left !important;
  }
  .profile-label {
  color: #114687;
  font-weight: bold;
  text-align: left;
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
  </style>