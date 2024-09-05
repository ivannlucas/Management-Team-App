<template>
    <div class="main-content" >
		<SidebarHome />
    	
		<!-- Main content -->
		<div class="main-info" >
			<div class="card col-6 flex-row my-5 border-0  rounded-3 overflow-hidden mx-auto d-block">
           
           <div class="card-body mb-2 p-2 p-sm-5">
             <h5 class="card-title text-center mb-4 fw-light fs-5">Cuenta verificada, inicie sesión en la plataforma</h5>
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