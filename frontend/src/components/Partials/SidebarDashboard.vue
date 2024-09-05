<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light custom-nav">
   
    
    <div >
        <img src="../../assets/mft_sinfondo.png" alt="Vue">
          
    </div> 
    <a class="my-a navbar-brand" href="/statistics">Management Futbol Team</a>
    

    <div id="botones" class="text-end row custom-nav" >
        <b-nav-form cols="2">
                
                <b-avatar :src="userPhoto" to="/perfil" class="align-baseline">
                  <template v-if="!userPhoto">
                    MFT
                  </template>
                </b-avatar>

                <a>{{text}}</a>
                <b-dropdown id="dropdown-1" right  class="m-md-2">
                    <b-dropdown-item @click="signOut">Cerrar Sesión</b-dropdown-item>
                    <b-dropdown-item v-if="isUserEntrenador" @click="generarEnlaceInvitacion()">Generar enlace invitacion</b-dropdown-item>
                    
                </b-dropdown>
                
        </b-nav-form> 
    </div>
    
   
</nav>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
    data() {
        return {
            /**
             * Texto que se mostrará en algún lugar de la interfaz.
             * @type {String}
             */
            text: ''
        };
    },
    methods: {
        ...mapActions('auth', ['signOut']),
        /**
         * Redirige al usuario a la página de generación de enlace de invitación.
         */
        generarEnlaceInvitacion() {
            this.$router.push({
                name: 'GenerateLink',
            });
        }
    },
    computed: {
        ...mapState('auth', ['usuario']),
        /**
         * Devuelve la URL de la foto del usuario.
         * @returns {String} URL de la imagen del usuario.
         */
        userPhoto() {
            return this.$store.state.auth.usuario.image_id;
        },
        /**
         * Verifica si el usuario tiene el rol de entrenador.
         * @returns {Boolean} Verdadero si el usuario es entrenador.
         */
        isUserEntrenador() {
            return this.$store.state.auth.usuario && this.$store.state.auth.usuario.rol === 'entrenador';
        }
    },
    mounted() {
        // Obtiene y muestra información sobre el usuario al montar el componente.
        const user = this.$store.state.auth.usuario;
        console.log(user);
    }
};
</script>


<style scoped>
.custom-nav {
  display: flex;
  align-items: center;
}

a {
    text-align: center; 
     padding-left: 0px !important; 
}

.b-avatar{
  background-color: rgba(62, 62, 230, 0.345) !important;
}
.align-baseline {
    vertical-align: middle !important; 
}
/*a {
    display: inline !important;
}

#botones .menu {
   background-color: blueviolet;
    display: inline !important;
}
b-nav-item-dropdown{
  background-color: rgb(70, 226, 43);
}
.dropdown-toggle {
    display: inline !important;
    width: 3rem !important;
    
}*/

li::marker {
  content: none !important;
}

/*li a.nav-link{
    display: inline !important;
    text-align: -webkit-match-parent !important;
    background-color: rgb(70, 226, 43) !important;
}*/
li {
  position: relative !important;
}
.form-control{
    display: inline !important;
    width: 30% !important;
    margin: 1rem !important;
}

.logo{
        
    margin-bottom: 1rem;

        
}

.logo img{
            
    width: 1.5rem;
    text-align: center;
}

.my-a{
  text-align: left;
  padding-left: 10px !important;
}

.btn-primary{
    margin: 5px !important;
}
#botones{
  width: 100%;
  
}

.nav{
    min-width: 100%;
}

nav a.router-link-exact-active{
  color: white;
}

@media (min-width: 768px) {
  .animate {
    animation-duration: 0.3s;
    -webkit-animation-duration: 0.3s;
    animation-fill-mode: both;
    -webkit-animation-fill-mode: both;
  }
}

@keyframes slideIn {
  0% {
    transform: translateY(1rem);
    opacity: 0;
  }

  100% {
    transform: translateY(0rem);
    opacity: 1;
  }

  0% {
    transform: translateY(1rem);
    opacity: 0;
  }
}

@-webkit-keyframes slideIn {
  0% {
    -webkit-transform: transform;
    -webkit-opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0);
    -webkit-opacity: 1;
  }

  0% {
    -webkit-transform: translateY(1rem);
    -webkit-opacity: 0;
  }
}

.slideIn {
  -webkit-animation-name: slideIn;
  animation-name: slideIn;
}

.navbar-brand {

    background-color: transparent !important;
    box-shadow: none !important;
}



</style>