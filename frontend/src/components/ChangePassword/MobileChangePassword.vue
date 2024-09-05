<template>
    <div class="row my-row">
      <div class="col-lg-6 col-xl-6 d-none d-md-block   my-image">
      </div>

      <div class="col-lg-4 col-xl-4 mx-auto">
        <div class="card flex-row my-5 border-0  rounded-3 overflow-hidden">

          <div class="card-body p-2 p-sm-5">
            <h5 class="card-title text-center mb-4 fw-light fs-5">Actualizar contraseña</h5>
            <form @submit.prevent="ChangePassword({email: email, newPassword: newPassword1})">

              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInputEmail" placeholder="name@example.com" v-model="email">
                <label for="floatingInputEmail">Email</label>
              </div>

              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Contraseña" v-model="newPassword1">
                <label for="floatingPassword">Constraseña nueva</label>
              </div>

              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPasswordConfirm" placeholder="Confirmar Contraseña" v-model="newPassword2">
                <label for="floatingPasswordConfirm">Confirmar nueva contraseña</label>
              </div>

              <div class="d-grid mb-2">
                <button class="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit" :disabled='!desactivar'>Actualizar contraseña</button>
              </div>

              
            </form>

            
            <b-alert :show="getError" variant="danger">Error: {{this.$store.state.auth.error.errorMessage}}</b-alert>

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
.my-row{
  padding: 0px;
  margin: 0px;
}

.my-image{
  margin: 0px !important;
  padding: 0px !important;
  background: #1e293b;
  min-height: 100vh;
  background-size: cover;
  background-image: url("../../assets/Foto_Login.jpeg");
}

.btn-google {
  color: white !important;
  background-color: #ea4335;
  margin-top: 1rem;
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
