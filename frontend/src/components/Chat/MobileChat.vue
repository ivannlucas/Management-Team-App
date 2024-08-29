<template>
  <div class="row">
    <Toast :position="'top-center'" ref="toast"></Toast>
    <!-- Modal con ProgressSpinner -->
    <Dialog v-if="loading" :visible="true" :closable="false">
      <template #header>
        <h3>Recopilando datos</h3>
      </template>
      <div class="flex-center">
        <ProgressSpinner />
        <p>Cargando mensajes...</p>
      </div>
    </Dialog>
    <div class="col-4 container-chats">
      <div class="row m-2" style="height: 0% !important">
        <div class="col-9" style="text-align:center">
          <h3>Chats</h3>
        </div>
        <div class="col-3" style="text-align:right">
          <Button class="p-button-raised p-button-rounded" icon="pi pi-user-plus" @click="showDialog = true"/>
        </div>
        <Dialog :visible.sync="showDialog">
            <template #header>
              <h4 class="mr-2">Selecciona un jugador para iniciar una conversación</h4>       
            </template>
            <ScrollPanel style="width:100%;height:400px">
                <div v-for="user in users" :key="user.id" @click="startConversation(user)" class="p-m-2">
                    <Card class="card-style" style="cursor: pointer;">
                        <template #title>
                            <div style="display: flex; align-items: center;">
                                <Avatar :image="user.image_id" size="large" shape="circle" />
                                <div class="name-class">{{ user.nombre }} {{ user.apellidos }}</div>
                            </div>
                        </template>
                        <template #content>
                          <div style="display: flex; justify-content: right;">
                            <Badge v-if="user.rol === 'jugador'" :value="user.rol" severity="success" /> <!-- O "Offline" y severity="danger" según el estado del usuario -->
                            <Badge v-if="user.rol === 'entrenador'" :value="user.rol" />
                          </div>    
                        </template>
                    </Card>
                </div>
            </ScrollPanel>
        </Dialog>

      </div>
      
      <div class="usercard-area">
       
          <UserCard v-for="user in usuariosConversacion" :key="user.id" :id="user.id" 
            :id_conversacion="user.id_convesacion" 
            :name="user.name" 
            :apellidos="user.apellidos" 
            :lastMessage="user.last_message" 
            :imagen="user.imagen"  
            :selectedId="selectedId"
            @select-user="IdUserSelect">
          </UserCard>
      </div>
    </div>
    <div class="col-8 container-mensagges">
      <div class="title-overlay">
        <h3>Mensajes</h3>
      </div>
      
      <div class="message-area">
        <MessageCard :messagge="mensajes" :userUID="`${userId}`"></MessageCard>  
      </div>
      <div class="footer">
          <div class="row row-centered">
            <div class="col-12">
              <span class="p-input-icon-right span-centered">
                  <i class="pi pi-send" @click="sendMensagge"/>
                  <InputText class="col-8 input-width" type="text" v-model="menssage" placeholder="Escribe un mensaje..." style="width: 100%">
                  </InputText>
              </span>       
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

<style scoped>
.row-centered {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(128, 128, 128, 0.3); /* Gris opaco */
}

.span-centered {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%; /* Ocupa casi todo el ancho de la fila */
  
}

.input-width {
  width: 100%;
  margin: 0.2rem;
  border-radius: 20px;
}
h4{
  margin-right: 1rem !important;
}
.p-card .p-card-content {
    padding: 0 !important;
}

.card-style{
  margin: 0.5rem 0.5rem;
}
.name-class{
  margin-left: 1.5rem;
}
.p-dialog .p-dialog-content {
    padding: 0;  /* Remueve el padding para que el ScrollPanel ocupe todo el espacio. */
}
/* Aumenta la opacidad del fondo de superposición del diálogo */
.p-dialog-mask {
    background-color: rgba(0, 0, 0, 0.7) !important; /* El valor 0.7 determina la opacidad, puedes ajustarlo a tus necesidades */
}
.flex-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;  /* Asegúrate de darle una altura, o usar otro contenedor para determinar la altura. */
}
body, html {
  height: 100%;
  margin: 0;
}
.row {
  height: 100%;
}

/* Para el área de los mensajes */
.message-area {
  flex-grow: 1;  /* Ocupa todo el espacio vertical disponible */
  overflow-y: auto;  /* Habilita el desplazamiento vertical cuando sea necesario */
  overflow-x: clip;

}

/* Para la lista de UserCard */
.usercard-area {
  flex-grow: 1;  /* Ocupa todo el espacio vertical disponible */
  overflow-y: auto;  /* Habilita el desplazamiento vertical cuando sea necesario */
  margin-top: 2rem;
  overflow-x: clip;
}

.container-chats, .container-mensagges {
  /* height: 100%; */
  min-height: 85vh;
  max-height: 85vh;
  display: flex;
  flex-direction: column; /* para que los hijos se alineen verticalmente */
  
}
.container-chats{
  border: 1px solid;

}
.container-mensagges{
  display: flex;           /* convierte el div en un contenedor flex */
  flex-direction: column;  /* ordena los hijos verticalmente */
  height: 100%;            /* ocupa toda la altura disponible. Esto puede necesitar ajustes según tu estructura HTML y CSS existente */
  position: relative;  
  border: 1px solid;
  background-image: url('../../assets/fondo_chat.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  
}
.container-mensagges::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);  /* Ajusta la opacidad según tus necesidades */
  z-index: -1;
}
.title-overlay {
  background-color: rgba(255, 255, 255, 0.8); /* Elige el color y la opacidad que mejor se adapte a tus necesidades */
  position: relative; /* o 'absolute' si lo necesitas */
  z-index: 1;
}

MessageCard {
    flex: 1;
}
/* .footer{
  position: relative; 
  bottom:0;
  left: 0;
  right: 0;
} */

.footer {
  position: relative;
  /* bottom: 0; */
  width: 100%;
  margin-top: auto;        /* empuja el footer hacia la parte inferior */    
}

</style>