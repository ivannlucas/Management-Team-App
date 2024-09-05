<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light custom-nav">
    <div>
        <img src="../../assets/mft_sinfondo.png" alt="Vue">  
    </div> 
    <a class="my-a navbar-brand" href="/">Management Futbol Team</a>

    <div id="botones" class="text-end" >
        <b-nav-form cols="2">
                <router-link to="/login" style="text-decoration: none;">
                    <a class="nav-link">Iniciar Sesion</a>
                </router-link>
        </b-nav-form> 
    </div>   
  </nav>
</template>
<script>
export default {
    data() {
        return {
            /**
             * Texto que se mostrará en algún lugar de la interfaz.
             * @type {String}
             */
            text: ''
        };
    }
};
</script>


<style scoped>

.custom-nav {
    display: flex;
    align-items: center;  /* Esto es para alinear verticalmente los items en el centro */
}
a {
    text-align: center; 
     padding-left: 0px !important; 
}

.b-avatar{
  background-color: rgba(62, 62, 230, 0.345) !important;
}

li::marker {
  content: none !important;
}

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
  /* width: 100%; */
  margin-left: auto;
  margin-right: 2rem ;
  
}

.nav{
    min-width: 100%;
}
.nav-link{
    display: contents !important;
}
nav a.router-link-exact-active{
  color: rgb(0, 0, 0);
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