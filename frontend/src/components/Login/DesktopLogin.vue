<template>
    <div class="main-content">
      <SidebarHome />
      <Toast :position="'top-center'" ref="toast"></Toast>
       <!-- main -->
       <div class="row main-row">
      <!-- Left -->
        <div class="col-md-5 left"  @click="$router.push('/')">
          <div class="main-info animation ">
            <img src="@/assets/Foto_Login.jpeg" alt="logo" />
          </div>
        </div>
        <!-- right -->
        <div class="col-md-7 right animation a3 "  v-if="!resetDisable">
          <div class="card flex-row my-5 border-0  rounded-3 overflow-hidden">
  
            <div class="card-body p-2 p-sm-5">
              <h5 class="card-title text-center mb-4 fw-light fs-5">Iniciar Sesión</h5>
              <form @submit.prevent="handleSignUser({email: email, password: pass})">
                <div class="form-floating mb-3">
                  <input type="email" class="form-control" id="floatingInputEmail" placeholder="name@example.com" v-model="email">
                  <label for="floatingInputEmail">Email</label>
                </div>
  
                <div class="form-floating mb-3">
                  <input type="password" class="form-control" id="floatingPassword" placeholder="Contraseña" v-model="pass">
                  <label for="floatingPassword">Contraseña</label>
                </div>
  
                <div class="d-grid mb-2">
                  <button class="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Acceder</button>
                </div>
  
                <a class="d-block text-center mt-2 small" @click="setResetDisable(true)">¿Has olvidado la contraseña?</a>
                <a class="d-block text-center mt-2 small" @click="$router.push({name:'Register'})">Registrarse</a>
  
              </form>
              
            </div>
          </div>
        </div>
        <!-- Reset  -->
        <div class="col-md-7 right animation a1 " v-else>
          <div class="card flex-row my-5 border-0  rounded-3 overflow-hidden">
  
            <div class="card-body p-2 p-sm-5">
              <h5 class="card-title text-center mb-4 fw-light fs-5">Restablecer contraseña</h5>
              <form @submit.prevent="handleResetPassword({email: emailReset})">
                <div class="form-floating mb-3">
                  <input type="email" class="form-control" id="floatingInputEmail" placeholder="name@example.com" v-model="emailReset">
                  <label for="floatingInputEmail">Introduce el email asociado a la cuenta</label>
                </div>

                <div class="d-grid mb-2">
                  <button class="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Enviar correo</button>
                </div>
  
                <div class="d-grid mb-2">
                  <button class="btn btn-lg btn-google btn-login fw-bold text-uppercase" type="submit" @click="setResetDisable(false)">
                    <i class="fab fa-google me-2"></i> Volver a iniciar sesión
                  </button>
                </div>
  
              </form>
  
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
  
  <!----------------------------------------------->
  <!--                    STYLES                 -->
  <!----------------------------------------------->
  <style scoped >

.col-md-5.left {
    height: calc(100vh - 71px);
}
.card-body {
    border: 1px solid rgba(0, 0, 0, 0.2); /* Un borde ligero para hacer los bordes un poco visibles */
    border-radius: 10px; /* Bordes redondeados */
    margin: 1rem;
  }
  .main-info img {
  width: 100%;
  height: 100%;
  object-fit:  fill; /* Esto asegura que la imagen se ajuste al contenedor sin deformarse */
  display: block; /* Elimina el espacio adicional debajo de la imagen */
}
.row{
    margin-left: 0 !important;
    
  }
  .row > * {
    padding-right: 0 !important; 
    padding-left: 0 !important;
  }
  .navbar {
    z-index: 999;
  }
  .nav-bar-logo {
    height: 2em;
  }
  .main-content {
    /* background-color: rgba(169, 169, 169, 0.315) !important; */
    height: 100%;
    width: 100%;
    margin: 0;
    /* font-family: var(--my-font-var); */
  }
  .main-row {
    height: 100%;
    width: 100%;
    /* background-image: url("../../assets/Foto_Login.jpeg"); */
    background-size: contain;
    z-index: 10;
  }
  .main-row:after {
    position: absolute;
    content: "";
    height: 97%;
    width: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 0, 0, 0) 0%,
      /* var(--my-color-var) 100% */
    );
    z-index: 1;
  }
  .right {
    background-color: #ffffff;
    z-index: 2;
  }
  .left{
    z-index: 2;
    height: 100%; /* O cualquier otra altura que desees establecer */
  }
  .animation {
    animation-name: move;
    animation-duration: 0.4s;
    animation-fill-mode: both;
    animation-delay: 0s;
  }
  .a0 {
    animation-delay: 0s;
  }
  .a1 {
    animation-delay: 0.5s;
  }
  
  .a2 {
    animation-delay: 0.6s;
  }
  
  .a3 {
    animation-delay: 0.7s;
  }
  
  .a4 {
    animation-delay: 0.8s;
  }
  
  .a5 {
    animation-delay: 0.9s;
  }
  
  .a6 {
    animation-delay: 1s;
  }
  
  .a7 {
    animation-delay: 1.1s;
  }
  
  @keyframes move {
    0% {
      opacity: 0;
      visibility: hidden;
      transform: translateX(100px);
    }
  
    100% {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
  
  @keyframes left {
    0% {
      opacity: 0;
      width: 0;
    }
  
    100% {
      opacity: 1;
      padding: 20px 40px;
      width: 440px;
    }
  }
  
  /* --------------- */
  .main-info{
    /* padding-top: 10em; */
    background-size: contain;
    height: 100%;
  }
  .project-name-div {
    width: 100%;
  }
  /* .project-logo {
    width: 15em;
    filter: brightness(0) invert(1);
  } */
  .project-title {
    font-weight: 100;
    color: white;
    font-size: 4em;
  }
  .project-subtitle {
    color: white;
    font-size: 2em;
  }
  .t1 {
    font-weight: 100;
    
  }
  .t2 {
    font-weight: 900;
  }
  .partners-row {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .brand-logo {
    filter: brightness(0) invert(1);
    width: 7em;
    margin-bottom: 6em;
  }
  
  .btn-google {
    color: white !important;
    background-color: #ea4335;
    margin-top: 0.5rem;
  }
  
  .btn-login {
    font-size: 0.9rem;
    letter-spacing: 0.05rem;
    padding: 0.75rem 1rem;
  }
  
  a{
    text-decoration:none;
    cursor: pointer;
  }
  </style>