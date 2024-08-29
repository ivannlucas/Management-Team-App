<template>
  <div class="row" >
    <!-- Si el uid del que en envia el mensaje es distinto al userUID del que hace login, -->
    <div v-for="m in messagge" :key="m.id">
        <div class="col-3 message-other talk-bubble tri-right left-top" v-if="m.remitente_id != userUID">
            <div class="row mt-2 mx-1">
                <span>{{ m.contenido }}</span>
            </div>
            <div class="row date-format">
                <span>{{ formatDate(m.fecha_hora) }}</span>
            </div>
        </div>
        <div class="col-3 message talk-bubble tri-right left-top" v-else>
            <div class="row mt-2 mx-1">
                <span>{{ m.contenido }}</span>
            </div>
            <div class="row date-format">
                <span>{{ formatDate(m.fecha_hora) }}</span>
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
         * Lista de mensajes que se mostrarán.
         * @type {Array}
         */
        messagge: Array,

        /**
         * Identificador único del usuario.
         * @type {String}
         */
        userUID: String
    },
    methods: {
        /**
         * Formatea una fecha y hora en un formato legible.
         * 
         * @param {String} fecha_hora - La fecha y hora en formato de cadena.
         * @returns {String} - La fecha y hora formateada.
         */
        formatDate(fecha_hora) {
            const date = new Date(fecha_hora.replace(' ', 'T'));
            const options = {
                hour: 'numeric',
                minute: 'numeric',
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            };
            return date.toLocaleDateString('es-ES', options);
        }
    }
};
</script>


<style scoped>
.message-other{
    background-color: aqua;
    border-radius: 15px;

}

.message{
    background-color: rgb(124, 202, 124);
    float: right;
    border-radius: 15px;
}

.date-format{
    float: right;
    margin-right: 1em;
    font-size: 10px;
}
/* CSS talk bubble */
.talk-bubble {
	margin: 10px;
    display: inline-block;
    position: relative;
	width: 200px;
	height: auto;
	background-color:rgb(124, 202, 124);
}

/* Right triangle placed top left flush. */
.tri-right.left-top:after{
	content: ' ';
	position: absolute;
	width: 0;
	height: 0;
    left: -20px;
	right: auto;
    top: 0px;
	bottom: auto;
	border: 22px solid;
	border-color: rgb(124, 202, 124) transparent transparent transparent;
}
</style>