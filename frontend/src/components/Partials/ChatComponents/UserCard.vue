<template>
  <div>
    <div class="row p-2 card-user" :class="{ 'selected': id_conversacion === selectedId }" @click="sendIdUserToPartent">
        <div class="col-3">
            <img style='height: 100%; width: 100%; object-fit: contain; display: block; 
            margin: 0 auto;' class="rounded-circle my-img" :src="imagen" alt="fotoPerfil" >
        </div>
        <div class="col-9">
            <div class=" name-user">
                <span>{{ name }} {{ apellidos }}</span>
            </div>
            <div class="message-user">
                <span>{{ lastMessage }}</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // Espacio reservado para datos futuros
        };
    },
    props: {
        /**
         * Identificador único del usuario o conversación.
         * @type {String|Number}
         */
        id: [String, Number],

        /**
         * Nombre del usuario.
         * @type {String}
         */
        name: String,

        /**
         * Apellidos del usuario.
         * @type {String}
         */
        apellidos: String,

        /**
         * URL de la imagen del usuario.
         * @type {String}
         */
        imagen: String,

        /**
         * Identificador único de la conversación.
         * @type {String|Number}
         */
        id_conversacion: [String, Number],

        /**
         * Último mensaje de la conversación.
         * @type {String}
         */
        lastMessage: String,

        /**
         * Identificador del usuario seleccionado.
         * @type {String|Number}
         */
        selectedId: [String, Number]
    },
    methods: {
        /**
         * Emite un evento al componente padre con el ID de la conversación seleccionada.
         * 
         * @emits select-user
         */
        sendIdUserToPartent() {
            if (!this.id_conversacion) {
                console.error("ID de conversación no definido en UserCard ", this.id_conversacion);
                return;
            }
            this.$emit("select-user", this.id_conversacion);
        }
    },
    
    mounted() {
        // Se ejecuta cuando el componente es montado en el DOM
    }
};
</script>


<style scoped >
.selected {
  background-color: rgb(154, 223, 175); 
}
.card-user:hover{
    background-color: aliceblue;
}
.card-user:active{
    background-color: rgb(154, 223, 175);
}
.col-6 {
  display: flex;
  justify-content: center; /* alinea horizontalmente en el centro */
  align-items: center; /* alinea verticalmente en el centro */
}
.name-user{
    font-weight: bold;
    width: 100%;  /* Ocupa todo el ancho */
    box-sizing: border-box;  /* Asegura que el padding y el border no añadan al ancho total */
    margin: 0;  /* Elimina márgenes */
    padding: 0;  /* Elimina relleno */
    /* display: flex;
    justify-content: center; 
    align-items: center;  */
}
.message-user{
    opacity: 0.5;
    width: 100%;  /* Ocupa todo el ancho */
    box-sizing: border-box;  /* Asegura que el padding y el border no añadan al ancho total */
    margin: 0;  /* Elimina márgenes */
    padding: 0;  /* Elimina relleno */
}
.time-user{
    opacity: 0.5;
    text-align: right;
}
</style>