import axiosInstance from "../api"

/**
 * Servicio para la gestión de equipos.
 */
class EquipoService {
    /**
     * Crea un nuevo equipo.
     * @param {Object} equipoData - Los datos del equipo a crear.
     * @returns {Promise<Object>} - Los datos del equipo creado.
     */
    async createEquipo(equipoData) {
        const response = await axiosInstance.post("/api/equipos", equipoData);
        return response.data;
    }

    /**
     * Obtiene todos los equipos.
     * @returns {Promise<Object[]>} - Una lista de todos los equipos.
     */
    async getAllEquipos() {
        const response = await axiosInstance.get("/api/equipos");
        return response.data;
    }

    /**
     * Obtiene un equipo por su ID.
     * @param {string|number} id - El ID del equipo.
     * @returns {Promise<Object>} - Los datos del equipo.
     */
    async getEquipoById(id) {
        const response = await axiosInstance.get(`/api/equipos/${id}`);
        return response.data;
    }

    /**
     * Obtiene un equipo por su token.
     * @param {string} token - El token del equipo.
     * @returns {Promise<Object>} - Los datos del equipo asociado al token.
     */
    async getEquipoByToken(token) {
        console.log(`Token enviado: '${token}'`);
        const response = await axiosInstance.get(`/api/equipos/token/${token}`);
        return response.data;
    }

    /**
     * Actualiza un equipo existente.
     * @param {string|number} id - El ID del equipo.
     * @param {Object} equipoData - Los nuevos datos del equipo.
     * @returns {Promise<Object>} - Los datos del equipo actualizado.
     */
    async updateEquipo(id, equipoData) {
        const response = await axiosInstance.put(`/api/equipos/${id}`, equipoData);
        return response.data;
    }

    /**
     * Elimina un equipo por su ID.
     * @param {string|number} id - El ID del equipo.
     * @returns {Promise<Object>} - La respuesta del servidor sobre la eliminación.
     */
    async deleteEquipo(id) {
        const response = await axiosInstance.delete(`/api/equipos/${id}`);
        return response.data;
    }
}

export default new EquipoService();
