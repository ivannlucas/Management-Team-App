<template>
  <aside class="my-nav-bar" :class="`${is_expanded &&'is-expanded' }`" >
       <div class="logo">
          <!-- <img src="../assets/logo.png" alt="Vue"> -->
      </div>
      <div class="menu-toggle-wrap">
          <button class="menu-toggle" @click="ToggleMenu">
                <span class="material-icons ">
                    east
                    </span>
          </button>
      </div>


      <h3>Menu</h3>

      <div class="menu">
         
           <router-link class="button" to="/statistics">
             <span class="material-icons">
                analytics
            </span>
            <span class="text">Estadisticas</span>
          </router-link>

           <router-link class="button" to="/plantilla">
            <span class="material-icons">
                contact_page
            </span>
            <span class="text">Plantilla</span>
          </router-link>

          <router-link class="button" to="/training">
            <span class="material-icons">
                group
            </span>
            <span class="text">Entrenamientos</span>
          </router-link>

          <router-link class="button" to="/game">
            <span class="material-icons">
                stars
            </span>
            <span class="text">Partidos</span>
          </router-link>

          <router-link class="button" to="/calendar">
            <span class="material-icons">
                today
            </span>
            <span class="text">Calendario</span>
          </router-link>

          <router-link class="button" to="/chat">
            <span class="material-icons">
                mark_unread_chat_alt
            </span>
            <span class="text">Chat</span>
          </router-link>

          <router-link 
          v-if="isUserEntrenador" 
          class="button" to="/board">
            
            <span class="material-icons">
                content_paste
            </span>
            <span class="text">Pizarra</span>
          </router-link>

      </div>
  </aside>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            /**
             * Controla si el menú está expandido o contraído.
             * @type {Boolean}
             */
            is_expanded: false
        };
    },
    computed: {
        ...mapState('auth', ['usuario']),
        /**
         * Verifica si el usuario tiene el rol de entrenador.
         * @returns {Boolean} Verdadero si el usuario es entrenador.
         */
        isUserEntrenador() {
            return this.$store.state.auth.usuario && this.$store.state.auth.usuario.rol === 'entrenador';
        }
    },
    methods: {
        /**
         * Alterna la expansión del menú.
         */
        ToggleMenu() {
            this.is_expanded = !this.is_expanded;
        }
    }
};
</script>

<style scoped>


.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}


.my-nav-bar{
  float: left;
}
aside{
    position: sticky;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: calc(2rem + 32px);
    min-width: 2rem;
    overflow: hidden;
    min-height: 100vh;
    padding: 1rem;
    background-color: var(--dark);
    color: var(--light);
    transition: 0.2 ease-out;
    

}

aside .logo{

    margin-bottom: 1rem;


}

aside .logo img{

    width: 2rem;
}

.is-expanded{
    width: var(--sidebar-width);
}

.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;
		position: relative;
		top: 0;
		transition: 0.2s ease-in-out;
}

.menu-toggle {
	transition: 0.2s ease-in-out;

}
.menu-toggle .material-icons {

    font-size: 2rem;
    color: var(--light);
	transition: 0.2s ease-out;
}


.menu-toggle:hover .material-icons{

    color: var(--primary);
    transform: translateX(0.5rem);
}

h3, .button .text{
    opacity: 0;
    transition: 0.3s ease-out;
}

.is-expanded{
    width: var(--sidebar-width);
}

.is-expanded .menu-toggle-wrap{
    top: -2rem;
}

.is-expanded .menu-toggle-wrap .menu-toggle{
    transform: rotate(-180deg);
}

.is-expanded h3, .button .text{
    opacity: 1;

}

.is-expanded .button .material-icons{
    margin-right: 1rem;

}
.menu{
    margin: 0 -1rem;
}

.menu .button{
    display: flex;
    align-items: center;
    text-decoration: none;

    padding: 0.5rem 1rem;
    transition: 0.2s ease-out;
}

.menu .button .material-icons{

    font-size: 2rem;
    color: var(--light);
    margin-right: 1rem;
    transition: 0.2s ease-out;

}

.menu .button .text{


    color: var(--light);
    transition: 0.2s ease-out;

}

.menu .button:hover {
    background-color: var(--dark-alt)
}

.menu .button:hover .material-icons .text{
    color: var(--primary)
}

/*@media (max-width: 768px) {
    position: relative;
    z-index: 99;
}*/
</style>
