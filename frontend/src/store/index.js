import Vue from 'vue';
import Vuex from 'vuex';

// Modulos
import plantilla from './modules/plantilla';
import authentication from './modules/authentication';

import ConversacionesService from '@/services/conversaciones/conversaciones.service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    plantillas: [],
    partido: null,
    conversaciones: []
  },
  getters: {
  },
  mutations: {
    /**
     * Agrega una nueva plantilla al estado.
     * @param {Object} state - El estado de Vuex.
     * @param {Object} payload - La plantilla que se va a agregar.
     * @param {number|string} payload.id - El ID de la plantilla.
     * @param {Object} payload.obj - El objeto plantilla a agregar.
     */
    setPlantillas(state, payload) {
      state.plantillas.push({ id: payload.id, ...payload.obj });
    },

    /**
     * Establece el partido actual en el estado.
     * @param {Object} state - El estado de Vuex.
     * @param {Object} partido - El partido que se va a establecer.
     */
    setPartido(state, partido) {
      state.partido = partido;
    },

    /**
     * Agrega una nueva conversación al estado.
     * @param {Object} state - El estado de Vuex.
     * @param {Object} conversation - La conversación que se va a agregar.
     */
    add_conversation(state, conversation) {
      state.conversaciones.push(conversation);
    },

    /**
     * Establece las conversaciones en el estado.
     * Si la conversación ya existe, se actualiza; de lo contrario, se agrega.
     * @param {Object} state - El estado de Vuex.
     * @param {Array|Object} conversaciones - Las conversaciones que se van a establecer.
     */
    setConversation(state, conversaciones) {
      const nuevasConversaciones = Array.isArray(conversaciones) ? conversaciones : [conversaciones];
      
      nuevasConversaciones.forEach(conversacion => {
        const index = state.conversaciones.findIndex(c => c.id_conversacion === conversacion.id_conversacion);
        if (index === -1) {
          state.conversaciones.push(conversacion);
        } else {
          state.conversaciones[index] = conversacion;
        }
      });
    }
  },
  actions: {
    /**
     * Añade una nueva conversación mediante un servicio y la devuelve.
     * @param {Function} commit - La función commit de Vuex para mutaciones.
     * @param {Object} conversationInfo - La información de la conversación a crear.
     * @returns {Promise<Object>} La conversación creada.
     * @throws {Error} Si hay un error al crear la conversación.
     */
    async addConversation({ commit }, conversationInfo) {
      try {
        const newConversation = await ConversacionesService.createConversacion(conversationInfo);
        return newConversation;
      } catch (error) {
        console.error("Error al añadir conversación:", error);
        throw error;
      }
    },
  },
  modules: {
    plantilla,
    auth: authentication
  }
});
