import axiosInstance from "../api"

/**
 * Servicio para la gestión de mensajes.
 */
class MensajesService {
    /**
     * Crea un nuevo mensaje.
     * @param {Object} mensajeData - Los datos del mensaje a crear.
     * @returns {Promise<Object>} - Los datos del mensaje creado.
     */
    async createMensaje(mensajeData) {
        const response = await axiosInstance.post("/api/mensajes", mensajeData);
        return response.data;
    }

    /**
     * Obtiene todos los mensajes.
     * @returns {Promise<Object[]>} - Una lista de todos los mensajes.
     */
    async getAllMensajes() {
        const response = await axiosInstance.get("/api/mensajes");
        return response.data;
    }

    /**
     * Obtiene los mensajes de una conversación específica.
     * @param {string|number} conversacionId - El ID de la conversación.
     * @returns {Promise<Object[]>} - Una lista de mensajes de la conversación.
     */
    async getMensajesByConversacion(conversacionId) {
        const response = await axiosInstance.get(`/api/mensajes/conversacion/${conversacionId}`);
        return response.data;
    }

    /**
     * Obtiene un mensaje por su ID.
     * @param {string|number} id - El ID del mensaje.
     * @returns {Promise<Object>} - Los datos del mensaje.
     */
    async getMensajeById(id) {
        const response = await axiosInstance.get(`/api/mensajes/${id}`);
        return response.data;
    }

    /**
     * Obtiene el último mensaje de una conversación específica.
     * @param {string|number} conversacionId - El ID de la conversación.
     * @returns {Promise<Object>} - Los datos del último mensaje.
     */
    async getUltimoMensajeByConversacion(conversacionId) {
        const response = await axiosInstance.get(`/api/mensajes/ultimo/${conversacionId}`);
        return response.data;
    }

    /**
     * Actualiza un mensaje existente.
     * @param {string|number} id - El ID del mensaje.
     * @param {Object} mensajeData - Los nuevos datos del mensaje.
     * @returns {Promise<Object>} - Los datos del mensaje actualizado.
     */
    async updateMensaje(id, mensajeData) {
        const response = await axiosInstance.put(`/api/mensajes/${id}`, mensajeData);
        return response.data;
    }

    /**
     * Elimina un mensaje por su ID.
     * @param {string|number} id - El ID del mensaje.
     * @returns {Promise<Object>} - La respuesta del servidor sobre la eliminación.
     */
    async deleteMensaje(id) {
        const response = await axiosInstance.delete(`/api/mensajes/${id}`);
        return response.data;
    }
}

export default new MensajesService();
