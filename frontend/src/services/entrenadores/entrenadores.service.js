import axiosInstance from "../api"

/**
 * Servicio para la gestión de entrenadores.
 */
class EntrenadorService {
    /**
     * Crea un nuevo entrenador.
     * @param {Object} entrenadorData - Los datos del entrenador a crear.
     * @returns {Promise<Object>} - Los datos del entrenador creado.
     */
    async createEntrenador(entrenadorData) {
        const response = await axiosInstance.post("/api/entrenadores", entrenadorData);
        return response.data;
    }

    /**
     * Obtiene todos los entrenadores.
     * @returns {Promise<Object[]>} - Una lista de todos los entrenadores.
     */
    async getAllEntrenadores() {
        const response = await axiosInstance.get("/api/entrenadores");
        return response.data;
    }

    /**
     * Obtiene un entrenador por su ID.
     * @param {string|number} id - El ID del entrenador.
     * @returns {Promise<Object>} - Los datos del entrenador.
     */
    async getEntrenadorById(id) {
        const response = await axiosInstance.get(`/api/entrenadores/${id}`);
        return response.data;
    }

    /**
     * Actualiza un entrenador existente.
     * @param {string|number} id - El ID del entrenador.
     * @param {Object} entrenadorData - Los nuevos datos del entrenador.
     * @returns {Promise<Object>} - Los datos del entrenador actualizado.
     */
    async updateEntrenador(id, entrenadorData) {
        const response = await axiosInstance.put(`/api/entrenadores/${id}`, entrenadorData);
        return response.data;
    }

    /**
     * Actualiza los detalles específicos de un entrenador.
     * @param {string|number} id - El ID del entrenador.
     * @param {Object} detalles - Los nuevos detalles del entrenador.
     * @returns {Promise<Object>} - Los datos del entrenador con los detalles actualizados.
     */
    async updateEntrenadorDetalles(id, detalles) {
        const response = await axiosInstance.put(`/api/entrenadores/${id}/detalles`, detalles);
        return response.data;
    }

    /**
     * Elimina un entrenador por su ID.
     * @param {string|number} id - El ID del entrenador.
     * @returns {Promise<Object>} - La respuesta del servidor sobre la eliminación.
     */
    async deleteEntrenador(id) {
        const response = await axiosInstance.delete(`/api/entrenadores/${id}`);
        return response.data;
    }
}

export default new EntrenadorService();
