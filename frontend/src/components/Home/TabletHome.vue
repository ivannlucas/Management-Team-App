<template>
    <div class="main-content" >
		<SidebarHome />
		<!-- Main content -->
		<div class="main-info" >
			<div class="row project-name-div text-center justify-content-center">
				<h1 class="project-title">
				{{title}}
				</h1>
				<h3 class="project-subtitle">
				{{subtitle}}
				</h3>
				
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

:root {
	--primary: #4ade80;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}
.app {
	display: flex;
}

.app main {
		flex: 1 1 0;
		padding: 2rem;
		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
}
.main-content {
  /* font-family: var(--bs-body-font-family); */
  height: 100vh;
  width: 100vw;
  margin: 0;
}
.main-info{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  background-image: url("../../assets/home_image.jpg");
  background-size: cover;
  background-position: center; /* Agregado para centrar la imagen */
}

.project-name-div{
  width: 100%;
  transform: translateY(-100%);
}
.project-logo{
  z-index: 999;
  width: 15em;
  filter:  brightness(0) invert(1);
}
.project-title{
  font-weight: 100;
  z-index: 999;
  color: white;
  font-size: 4em;
}
.project-subtitle{
  color: white;
  z-index: 999;
  font-size: 2em;
}

</style>
