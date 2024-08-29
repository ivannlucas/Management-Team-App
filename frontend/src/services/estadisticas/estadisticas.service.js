import axiosInstance from "../api"

/**
 * Servicio para la gestión de estadísticas generales.
 */
class EstadisticasService {
    /**
     * Crea una nueva estadística.
     * @param {Object} estadisticaData - Los datos de la estadística a crear.
     * @returns {Promise<Object>} - Los datos de la estadística creada.
     */
    async createEstadistica(estadisticaData) {
        const response = await axiosInstance.post("/api/estadisticas", estadisticaData);
        return response.data;
    }

    /**
     * Obtiene todas las estadísticas.
     * @returns {Promise<Object[]>} - Una lista de todas las estadísticas.
     */
    async getAllEstadisticas() {
        const response = await axiosInstance.get("/api/estadisticas");
        return response.data;
    }

    /**
     * Obtiene una estadística por su ID.
     * @param {string|number} id - El ID de la estadística.
     * @returns {Promise<Object>} - Los datos de la estadística.
     */
    async getEstadisticaById(id) {
        const response = await axiosInstance.get(`/api/estadisticas/${id}`);
        return response.data;
    }

    /**
     * Actualiza una estadística existente.
     * @param {string|number} id - El ID de la estadística.
     * @param {Object} estadisticaData - Los nuevos datos de la estadística.
     * @returns {Promise<Object>} - Los datos de la estadística actualizada.
     */
    async updateEstadistica(id, estadisticaData) {
        const response = await axiosInstance.put(`/api/estadisticas/${id}`, estadisticaData);
        return response.data;
    }

    /**
     * Elimina una estadística por su ID.
     * @param {string|number} id - El ID de la estadística.
     * @returns {Promise<Object>} - La respuesta del servidor sobre la eliminación.
     */
    async deleteEstadistica(id) {
        const response = await axiosInstance.delete(`/api/estadisticas/${id}`);
        return response.data;
    }
}

export default new EstadisticasService();
