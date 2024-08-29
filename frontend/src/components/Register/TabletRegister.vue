<template>
    <div class="main-content">
      <SidebarHome />
      <Toast :position="'top-center'" ref="toast"></Toast>
      <!-- main -->
      <div class="row main-row">
        <!-- Left -->
        <div class="col-md-5 left"  @click="$router.push('/')">
          
          <div class="main-info " >
            <img src="@/assets/Foto_Login.jpeg" alt="logo" />
          </div>
        </div>
       <div class="col-md-7 right">
        <div class="card flex-row  border-0  rounded-3 overflow-hidden">
           
           <div class="card-body p-2 p-sm-5">
             <h5 class="card-title text-center mb-4 fw-light fs-5">Crear cuenta</h5>
             <form @submit.prevent="handleCreateUser({name: nombre, apellidos: apellidos, email: email, password: pass1, telefono: '', edad: '', rol: rol, nombre_equipo: nombre_equipo, edad: edad, anios_experiencia: anios_experiencia})">
 
               <div class="form-floating mb-3">
                 <input type="text" class="form-control" id="floatingInputUsername" placeholder="Nombre" v-model="nombre" required autofocus>
                 <label for="floatingInputUsername">Nombre</label>
               </div>
 
               <div class="form-floating mb-3">
                 <input type="text" class="form-control" id="floatingInputApellidos" placeholder="Apellidos" v-model="apellidos" required autofocus>
                 <label for="floatingInputApellidos">Apellidos</label>
               </div>
 
               <div class="form-floating mb-3">
                 <input type="email" class="form-control" id="floatingInputEmail" placeholder="name@example.com" v-model="email">
                 <label for="floatingInputEmail">Email</label>
               </div>
 
               <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInputUsername" placeholder="Nombre" v-model="nombre_equipo" required autofocus>
                <label for="floatingInputUsername">Nombre Del Equipo </label>
              </div>
               
              <!-- <div class="row"> -->
                <div class="col-12 mb-3">
                  <label class="my-label" for="edad">Edad</label>
                  <InputNumber id="edad" v-model="edad" mode="decimal" :min="16" :max="100" />
                </div>
              <!-- </div> -->
              <!-- <div class="row"> -->
                <div class="col-12 mb-3 mt-2">
                  <h6 >Años de Experiencia: {{anios_experiencia}}</h6>
                  <Slider v-model="anios_experiencia" :step="1" :max="50"/>
                </div>
              <!-- </div> -->
                
               <div class="form-floating mb-3">
                 <input type="password" class="form-control" id="floatingPassword" placeholder="Contraseña" v-model="pass1">
                 <label for="floatingPassword">Constraseña</label>
               </div>
 
               <div class="form-floating mb-3">
                 <input type="password" class="form-control" id="floatingPasswordConfirm" placeholder="Confirmar Contraseña" v-model="pass2">
                 <label for="floatingPasswordConfirm">Confirmar contraseña</label>
               </div>
 
               <div class="d-grid mb-2">
                 <button class="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit" :disabled='!desactivar'>Unirme</button>
               </div>
 
               <a class="d-block text-center mt-2 small" @click="$router.push({name:'Login'})">¿Ya tienes una cuenta? Iniciar sesión</a>
 
             </form>
           </div>
         </div>
       </div>
      </div>
        
   </div>
 </template>
 
 <script>
 import SidebarHome from '../../components/Partials/SidebarHome.vue'
 import { mapActions, mapGetters, mapState } from 'vuex'
 
 export default {
   data() {
     return {
       /**
        * Nombre del usuario.
        * @type {String}
        */
       nombre: '',
 
       /**
        * Nombre del equipo asociado al usuario.
        * @type {String}
        */
       nombre_equipo: '',
 
       /**
        * Apellidos del usuario.
        * @type {String}
        */
       apellidos: '',
 
       /**
        * Correo electrónico del usuario.
        * @type {String}
        */
       email: '',
 
       /**
        * Primera entrada de la contraseña del usuario.
        * @type {String}
        */
       pass1: '',
 
       /**
        * Segunda entrada de la contraseña para verificación.
        * @type {String}
        */
       pass2: '',
 
       /**
        * Rol del usuario, por defecto es 'entrenador'.
        * @type {String}
        */
       rol: 'entrenador',
 
       /**
        * Edad del usuario.
        * @type {Number|null}
        */
       edad: null,
 
       /**
        * Años de experiencia del usuario.
        * @type {Number|null}
        */
       anios_experiencia: null
     }
   },
   
   components: {
     SidebarHome
   },
   
   methods: {
     ...mapActions('auth', ['createUser', 'clearError']),
     
     /**
      * Maneja la creación de un nuevo usuario después de validar las contraseñas.
      * Si las contraseñas no coinciden o están vacías, muestra una advertencia.
      * Si el registro es exitoso, muestra un mensaje de éxito. De lo contrario, muestra un mensaje de error.
      * @async
      */
     async handleCreateUser() {
       if (!this.desactivar) {
         this.$refs.toast.add({
           severity: 'warn',
           summary: 'Advertencia',
           detail: 'Las contraseñas no coinciden o están vacías.',
           life: 5000
         });
         return;
       }
 
       try {
         await this.createUser({
           name: this.nombre,
           apellidos: this.apellidos,
           email: this.email,
           password: this.pass1,
           rol: this.rol,
           nombre_equipo: this.nombre_equipo,
           edad: this.edad,
           anios_experiencia: this.anios_experiencia
         });
 
         this.$refs.toast.add({
           severity: 'success',
           summary: 'Éxito',
           detail: 'Usuario registrado correctamente.',
           life: 5000
         });
       } catch (error) {
         this.$refs.toast.add({
           severity: 'error',
           summary: 'Error',
           detail: this.getError ? this.$store.state.auth.error.errorMessage : 'Error al registrar el usuario.',
           life: 5000
         });
       }
     }
   },
 
   computed: {
     ...mapGetters('auth', ['getError']),
     
     /**
      * Computed property que comprueba si las contraseñas coinciden y no están vacías.
      * @returns {Boolean} Verdadero si las contraseñas coinciden y no están vacías.
      */
     desactivar() {
       return this.pass1 === this.pass2 && this.pass1.trim() !== ''
     },
 
     /**
      * Computed property que verifica si hay un error en el estado de autenticación.
      * Si existe un error, devuelve true.
      */
     activarError() {
       if (store.state.auth.error !== '') {
         return true;
       }
       return false;
     }
   }
 }
 </script>
 
 
 <style scoped>

.my-label {
    display: inline-block;
    margin-right: 1rem;
}
.main-content {
    height: 100%;
    width: 100%;
    margin: 0;
    /* font-family: var(--my-font-var); */
  }
  .left{
    z-index: 2;
    height: 100%; /* O cualquier otra altura que desees establecer */
  }
   .col-md-5.left {
    height: calc(100vh - 76px);
}
   .main-info img {
  width: 100%;
  height: 100vh;
  object-fit: fill; /* Esto asegura que la imagen se ajuste al contenedor sin deformarse */
  display: block; /* Elimina el espacio adicional debajo de la imagen */
}
.main-info{
    /* padding-top: 10em; */
    background-size: contain;
    /* height: 100%; */
    width: 100%;   /* Asegúrate de que este contenedor ocupe todo el ancho de su contenedor padre */
    height: 100%;  /* Y todo el alto. Puede que necesites ajustar este valor si no obtienes el resultado esperado. */
    position: relative; /* Si tienes problemas con otros elementos, esto puede ayudar */
  }
 .my-row{
   padding: 0px;
   margin: 0px;
   height: 100%;
   width: 100%;
   background-size: contain;
    z-index: 10;
 }
 
 .my-image{
   margin: 0px !important;
   padding: 0px !important;
   background: #1e293b;
   min-height: 100vh;
   background-size: cover;
   background-image: url("../../assets/Foto_Login.jpeg");
 }
 
 .container-fluid{
   padding-left: 0 !important;
   padding-right: 0 !important;
   min-height: 100vh !important;
 
 }
 
 /* .row > div {
   width: 50% !important;
 } */
 .row{
    margin-left: 0 !important;
    
  }
  .row > * {
    padding-right: 0 !important; 
    padding-left: 0 !important;
  }
 
 /* .row > div.bg-primary {
   width: 30% !important;
 } */
 
/*  
 #sidebar-container{
   min-height: 100vh;
   min-width: 20vh;
   background-size: cover;
   background-image: url("../../assets/fondo.jpg");
 }
  */
 a{
   text-decoration:none;
   cursor: pointer;
 }  
 .main-row {
    height: 100%;
    width: 100%;
    /* background-image: url("../../assets/Foto_Login.jpeg"); */
    background-size: contain;
    z-index: 10;
  }
  .right {
    background-color: #ffffff;
    z-index: 2;
  }
  .card-body {
    border: 1px solid rgba(0, 0, 0, 0.2); /* Un borde ligero para hacer los bordes un poco visibles */
    border-radius: 10px; /* Bordes redondeados */
    margin: 1rem;
  }
  /* .main-row:after {
    position: absolute;
    content: "";
    height: 97%;
    width: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 0, 0, 0) 0%,
    );
    z-index: 1;
  } */
 </style>
 