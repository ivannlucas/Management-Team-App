<template>
    
    <div class="row justify-content-center">
        <Toast :position="'top-right'" ref="toast"></Toast>
        <div class="col-6 align-self-center text-center">
            <div class=" card card-style">
                <h3 class="class-title">Comparte este enlace a los jugadores de la plantilla </h3>
                <span class="p-input-icon-right span-style text-center">
                    <i class="pi pi-clone copy-cursor" @click="copiarAlPortapapeles"/>
                    <InputText class="full-width-input" :value="enlaceInvitacion" readonly />
                </span>
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
.span-style{
    margin: 1rem;
    width: 95%;
}

.class-title{
    margin-top: 1.5rem;
    margin-left: 1rem;
    margin-left: 1rem;
    text-align: center !important;

}

.full-width-input {
    width: 100%;
}
.card-style{
    margin-top: 20%;
}
.copy-cursor {
    cursor: grab;
}
</style>