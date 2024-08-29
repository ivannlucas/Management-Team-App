import axiosInstance from "../api"

/**
 * Servicio para la gestión de conversaciones.
 */
class ConversacionesService {
    /**
     * Crea una nueva conversación.
     * @param {Object} conversacionData - Los datos de la conversación a crear.
     * @returns {Promise<Object>} - Los datos de la conversación creada.
     */
    async createConversacion(conversacionData) {
        const response = await axiosInstance.post("/api/conversaciones", conversacionData);
        return response.data;
    }

    /**
     * Obtiene todas las conversaciones.
     * @returns {Promise<Object[]>} - Una lista de todas las conversaciones.
     */
    async getAllConversaciones() {
        const response = await axiosInstance.get("/api/conversaciones");
        return response.data;
    }

    /**
     * Obtiene las conversaciones de un usuario por su ID.
     * @param {string|number} userId - El ID del usuario.
     * @returns {Promise<Object[]>} - Una lista de conversaciones del usuario.
     */
    async getConversacionesByUsuario(userId) {
        const response = await axiosInstance.get(`/api/conversaciones/usuario/${userId}`);
        return response.data;
    }

    /**
     * Obtiene una conversación por su ID.
     * @param {string|number} id - El ID de la conversación.
     * @returns {Promise<Object>} - Los datos de la conversación.
     */
    async getConversacionById(id) {
        const response = await axiosInstance.get(`/api/conversaciones/${id}`);
        return response.data;
    }

    /**
     * Actualiza una conversación existente.
     * @param {string|number} id - El ID de la conversación.
     * @param {Object} conversacionData - Los nuevos datos de la conversación.
     * @returns {Promise<Object>} - Los datos de la conversación actualizada.
     */
    async updateConversacion(id, conversacionData) {
        const response = await axiosInstance.put(`/api/conversaciones/${id}`, conversacionData);
        return response.data;
    }

    /**
     * Elimina una conversación por su ID.
     * @param {string|number} id - El ID de la conversación.
     * @returns {Promise<Object>} - La respuesta del servidor sobre la eliminación.
     */
    async deleteConversacion(id) {
        const response = await axiosInstance.delete(`/api/conversaciones/${id}`);
        return response.data;
    }
}

export default new ConversacionesService();
