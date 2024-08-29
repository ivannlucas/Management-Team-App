<template>
    <div class="main-content" >
		<SidebarHome />
    	
		<!-- Main content -->
		<div class="main-info" >
			<div class="card col-6 flex-row my-5 border-0  rounded-3 overflow-hidden mx-auto d-block">
           
           <div class="card-body mb-2 p-2 p-sm-5">
             <h5 class="card-title text-center mb-4 fw-light fs-5">Crear cuenta jugador</h5>
             <form @submit.prevent="handleCreateUser({name: nombre, apellidos: apellidos, email: email, password: pass1, rol: rol, equipo_id: equipo_id, edad: edad,altura: altura, peso: peso, num_camiseta: num_camiseta, posicion: selectedPos})">
				<div v-if="currentStep === 1">
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
						<input type="password" class="form-control" id="floatingPassword" placeholder="Contraseña" v-model="pass1">
						<label for="floatingPassword">Constraseña</label>
					</div>
		
					<div class="form-floating mb-3">
						<input type="password" class="form-control" id="floatingPasswordConfirm" placeholder="Confirmar Contraseña" v-model="pass2">
						<label for="floatingPasswordConfirm">Confirmar contraseña</label>
					</div>
					<div class="centered-content">
						<Button label="Siguiente" icon="pi pi-arrow-right" @click.prevent="nextStep"/>
					</div>
					
				</div>
				<div v-if="currentStep === 2">
					<div class="row">
						<div class="col-12 mb-3 field ">
							<label class="label-class" for="edad">Edad</label>
							<InputNumber id="edad" v-model="edad" mode="decimal" :min="16" :max="100" />
						</div>
					</div>

					<div class="col-12 mb-3 field ">
						<label class="label-class" for="num_camisera">Número camiseta</label>
						<InputNumber id="num_camisera" v-model="num_camiseta" mode="decimal" :min="0" :max="99" />
					</div>

					<div class="col-12 mb-3 field ">
						<label class="label-class" for="altura">Altura</label>
						<InputNumber id="altura" v-model="altura" mode="decimal" suffix=" cm"/>
					</div>

					<div class="col-12 mb-3 field ">
						<label class="label-class" for="peso">Peso</label>
						<InputNumber id="peso" v-model="peso" :minFractionDigits="2" :maxFractionDigits="3" suffix=" kg"/>
					</div>

					<div class="col-12 mb-3 field ">
						<div class="row">
							<div class="col-12">
								<label class="label-class" for="peso">Seleccione la posición en la que juega:</label>
							</div>
							<div class="col-12">
								<CascadeSelect v-model="selectedPos" :options="cascadePos" optionLabel="pname" optionGroupLabel="name"
            					:optionGroupChildren="['posiciones']" placeholder="Eliga posición" class="p-invalid" />
							</div>
						</div>
					</div>

					<div class="centered-content">
						<Button label="Anterior" class="p-button-secondary button-class" icon="pi pi-arrow-left" @click.prevent="prevStep"/>
                    	<button class="btn btn-lg btn-primary btn-login fw-bold text-uppercase ml-2" type="submit" :disabled='!desactivar'>Unirme</button>
					</div>
					
				</div>
               
               <a class="d-block text-center mt-2 small" @click="$router.push({name:'Login'})">¿Ya tienes una cuenta? Iniciar sesión</a>
 
 
             </form>
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
.main-content{
	background-color: rgba(169, 169, 169, 0.315) !important;
	width: 100vw;  /* Anchura del viewport */
    height: 100vh; /* Altura del viewport */
}
.centered-content {
	margin-top: 3rem;
    display: flex;
    justify-content: center; /* Centrado horizontal */
    align-items: center;     /* Centrado vertical */
    height: 100%;            /* Asume la altura total de su contenedor. Si su contenedor no tiene altura definida, esto podría no tener efecto */
}

.button-class{
	margin-right: 1rem;
}
.label-class{
	margin-right: 1rem;
}
.p-cascadeselect.p-invalid.p-component {
	 border-color: #ced4da !important;
}
</style>