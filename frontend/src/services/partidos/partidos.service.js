import axiosInstance from "../api"

/**
 * Servicio para la gestión de partidos.
 */
class PartidosService {
    /**
     * Crea un nuevo partido.
     * @param {Object} partidoData - Los datos del partido a crear.
     * @returns {Promise<Object>} - Los datos del partido creado.
     */
    async createPartido(partidoData) {
        const response = await axiosInstance.post("/api/partidos", partidoData);
        return response.data;
    }

    /**
     * Obtiene todos los partidos.
     * @returns {Promise<Object[]>} - Una lista de todos los partidos.
     */
    async getAllPartidos() {
        const response = await axiosInstance.get("/api/partidos");
        return response.data;
    }

    /**
     * Obtiene un partido por su ID.
     * @param {string|number} id - El ID del partido.
     * @returns {Promise<Object>} - Los datos del partido.
     */
    async getPartidoById(id) {
        const response = await axiosInstance.get(`/api/partidos/${id}`);
        return response.data;
    }

    /**
     * Actualiza un partido existente.
     * @param {string|number} id - El ID del partido.
     * @param {Object} partidoData - Los nuevos datos del partido.
     * @returns {Promise<Object>} - Los datos del partido actualizado.
     */
    async updatePartido(id, partidoData) {
        const response = await axiosInstance.put(`/api/partidos/${id}`, partidoData);
        return response.data;
    }

    /**
     * Elimina un partido por su ID.
     * @param {string|number} id - El ID del partido.
     * @returns {Promise<Object>} - La respuesta del servidor sobre la eliminación.
     */
    async deletePartido(id) {
        const response = await axiosInstance.delete(`/api/partidos/${id}`);
        return response.data;
    }
}

export default new PartidosService();
