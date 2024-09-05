import axiosInstance from "../api"

/**
 * Servicio para la gestión de estadísticas de partidos.
 */
class EstadisticasPartidosService {
    /**
     * Crea una nueva estadística de partido.
     * @param {Object} estadisticasPartidoData - Los datos de la estadística de partido a crear.
     * @returns {Promise<Object>} - Los datos de la estadística de partido creada.
     */
    async createEstadisticasPartido(estadisticasPartidoData) {
        const response = await axiosInstance.post("/api/estadisticas-partidos", estadisticasPartidoData);
        return response.data;
    }

    /**
     * Obtiene todas las estadísticas de partidos.
     * @returns {Promise<Object[]>} - Una lista de todas las estadísticas de partidos.
     */
    async getAllEstadisticasPartidos() {
        const response = await axiosInstance.get("/api/estadisticas-partidos");
        return response.data;
    }

    /**
     * Obtiene una estadística de partido por su ID.
     * @param {string|number} id - El ID de la estadística de partido.
     * @returns {Promise<Object>} - Los datos de la estadística de partido.
     */
    async getEstadisticasPartidoById(id) {
        const response = await axiosInstance.get(`/api/estadisticas-partidos/${id}`);
        return response.data;
    }

    /**
     * Actualiza una estadística de partido existente.
     * @param {string|number} id - El ID de la estadística de partido.
     * @param {Object} estadisticasPartidoData - Los nuevos datos de la estadística de partido.
     * @returns {Promise<Object>} - Los datos de la estadística de partido actualizada.
     */
    async updateEstadisticasPartido(id, estadisticasPartidoData) {
        const response = await axiosInstance.put(`/api/estadisticas-partidos/${id}`, estadisticasPartidoData);
        return response.data;
    }

    /**
     * Elimina una estadística de partido por su ID.
     * @param {string|number} id - El ID de la estadística de partido.
     * @returns {Promise<Object>} - La respuesta del servidor sobre la eliminación.
     */
    async deleteEstadisticasPartido(id) {
        const response = await axiosInstance.delete(`/api/estadisticas-partidos/${id}`);
        return response.data;
    }
}

export default new EstadisticasPartidosService();
