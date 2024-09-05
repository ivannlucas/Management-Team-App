<template>
    <div class="grid">
        <div class="display: flex; row " style="margin:1rem;">
            <div class="col-4">
                <h5 class="m-0">
                    Plantilla
                </h5>
            </div>
        </div>
        <div class="col-12">
            <div class="card">
                <Accordion :activeIndex="0">
                    <AccordionTab header="Porteros">
                        <div class="row ml-0">
                            <div v-if="arrayPorteros.length > 0">
                                <Card class="col-3 m-2 card-container" 
                                    v-for="user in arrayPorteros" 
                                    :key="user.id" 
                                    @click="verDetalles(user.id)"
                                >
                                    <template #content>
                                        <div class="image-card-container">
                                            <img :src="user.usuario.image_id || require('@/assets/cara1.png')" class="image-card-image" alt="Image" />
                                        </div>
                                    </template>
                                    <template #footer>
                                        <div class="card-footer">
                                            <div class="text-2xl font-bold">{{user.usuario.nombre}} {{user.usuario.apellidos}}</div>
                                            <div class="mb-3">{{user.posicion}} Nº{{user.numero_camiseta}}</div>
                                            <Button class="button-styled" label="Ver detalles " @click="verDetalles(user.id)" />
                                        </div>
                                    </template>
                                </Card>
                            </div>    
                            <!-- Mensaje si no hay jugadores en la lista -->
                            <div v-else>
                                <p>No hay jugadores en la plantilla para esta posición.</p>
                            </div>
                        </div>
                    </AccordionTab>
                    <!-- Defensas -->
                    <AccordionTab header="Defensas">
                        <div class="row ml-0">
                            <div v-if="arrayDefensas.length > 0">
                                <Card class="col-3 m-2 card-container" 
                                    v-for="user in arrayDefensas" 
                                    :key="user.id" 
                                    @click="verDetalles(user.id)"
                                >
                                    <template #content>
                                        <div class="image-card-container">
                                            <img :src="user.usuario.image_id || require('@/assets/cara1.png')" class="image-card-image" alt="Image" />
                                        </div>
                                    </template>
                                    <template #footer>
                                        <div class="card-footer">
                                            <div class="text-2xl font-bold">{{user.usuario.nombre}} {{user.usuario.apellidos}}</div>
                                            <div class="mb-3">{{user.posicion}} Nº{{user.numero_camiseta}}</div>
                                            <Button class="button-styled" label="Ver detalles " @click="verDetalles(user.id)" />
                                        </div>
                                    </template>
                                </Card>
                            </div>    
                            <!-- Mensaje si no hay jugadores en la lista -->
                            <div v-else>
                                <p>No hay jugadores en la plantilla para esta posición.</p>
                            </div>
                        </div>
                    </AccordionTab>
                    <!-- Mediocentros -->
                    <AccordionTab header="Mediocentros">
                        <div class="row ml-0">
                            <div v-if="arrayMedios.length > 0">
                                <Card class="col-3 m-2 card-container" 
                                    v-for="user in arrayMedios" 
                                    :key="user.id" 
                                    @click="verDetalles(user.id)"
                                >
                                    <template #content>
                                        <div class="image-card-container">
                                            <img :src="user.usuario.image_id || require('@/assets/cara1.png')" class="image-card-image" alt="Image" />
                                        </div>
                                    </template>
                                    <template #footer>
                                        <div class="card-footer">
                                            <div class="text-2xl font-bold">{{user.usuario.nombre}} {{user.usuario.apellidos}}</div>
                                            <div class="mb-3">{{user.posicion}} Nº{{user.numero_camiseta}}</div>
                                            <Button class="button-styled" label="Ver detalles " @click="verDetalles(user.id)" />
                                        </div>
                                    </template>
                                </Card>
                            </div>    
                            <!-- Mensaje si no hay jugadores en la lista -->
                            <div v-else>
                                <p>No hay jugadores en la plantilla para esta posición.</p>
                            </div>
                        </div>
                    </AccordionTab>
                    <!-- Delanteros -->
                    <AccordionTab header="Delanteros">
                        <div class="row ml-0">
                            <div v-if="arrayDelanteros.length > 0">
                                <Card class="col-3 m-2 card-container" 
                                    v-for="user in arrayDelanteros" 
                                    :key="user.id" 
                                    @click="verDetalles(user.id)"
                                >
                                    <template #content>
                                        <div class="image-card-container">
                                            <img :src="user.usuario.image_id || require('@/assets/cara1.png')" class="image-card-image" alt="Image" />
                                        </div>
                                    </template>
                                    <template #footer>
                                        <div class="card-footer">
                                            <div class="text-2xl font-bold">{{user.usuario.nombre}} {{user.usuario.apellidos}}</div>
                                            <div class="mb-3">{{user.posicion}} Nº{{user.numero_camiseta}}</div>
                                            <Button class="button-styled" label="Ver detalles " @click="verDetalles(user.id)" />
                                        </div>
                                    </template>
                                </Card>
                            </div>    
                            <!-- Mensaje si no hay jugadores en la lista -->
                            <div v-else>
                                <p>No hay jugadores en la plantilla para esta posición.</p>
                            </div>
                        </div>
                    </AccordionTab>
                </Accordion>
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
.title-style{
    background-color: aliceblue;
    padding: 1rem;
}

.image-card {
  max-width: 125px;
  margin: auto;
  }
  .image-card-container {
    height: 150px;  /* Altura fija del contenedor */
    display: flex;  /* Utiliza flexbox para centrar la imagen */
    justify-content: center;  /* Centra la imagen horizontalmente */
    align-items: center;  /* Centra la imagen verticalmente */
    flex-grow: 1;
    overflow: hidden;  /* Oculta cualquier parte de la imagen que se salga del contenedor */
}

.image-card-image {
  max-width: 100%; /* Ajusta el tamaño máximo de la imagen para que se ajuste al contenedor */
  max-height: 100%; /* Ajusta el tamaño máximo de la imagen para que se ajuste al contenedor */
  object-fit: cover;  /* Hace que la imagen mantenga su aspecto y llene el contenedor */
  border-radius: 15px; /* Aquí es donde se redondean los bordes */
}
  
.p-card{
    display: inline-block !important;
}
.card-container {
  height: 450px;  /* altura fija */
  display: flex;
  flex-direction: column;
}
.text-2xl {
  font-size: 22px;
  flex-grow: 0;
  flex-shrink: 0;
}
.mb-3 {
  flex-grow: 0;
  flex-shrink: 0;
}

.font-bold {
  font-weight: bold;
}

.card-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  background-color: #f5f5f5;
  height: 200px;
}

.button-styled {
    background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
  flex-grow: 0;
  flex-shrink: 0;
}

.button-styled:hover {
    background-color: #0056b3
}
</style>