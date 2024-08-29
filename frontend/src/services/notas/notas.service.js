import axiosInstance from "../api"

/**
 * Servicio para la gestión de notas del calendario.
 */
class NotasCalendarioService {
    /**
     * Crea una nueva nota en el calendario.
     * @param {Object} notaData - Los datos de la nota a crear.
     * @returns {Promise<Object>} - Los datos de la nota creada.
     */
    async createNotaCalendario(notaData) {
        const response = await axiosInstance.post("/api/notas-calendario", notaData);
        return response.data;
    }

    /**
     * Obtiene todas las notas del calendario.
     * @returns {Promise<Object[]>} - Una lista de todas las notas del calendario.
     */
    async getAllNotasCalendario() {
        const response = await axiosInstance.get("/api/notas-calendario");
        return response.data;
    }

    /**
     * Obtiene una nota del calendario por su ID.
     * @param {string|number} id - El ID de la nota del calendario.
     * @returns {Promise<Object>} - Los datos de la nota del calendario.
     */
    async getNotaCalendarioById(id) {
        const response = await axiosInstance.get(`/api/notas-calendario/${id}`);
        return response.data;
    }

    /**
     * Actualiza una nota del calendario existente.
     * @param {string|number} id - El ID de la nota del calendario.
     * @param {Object} notaData - Los nuevos datos de la nota del calendario.
     * @returns {Promise<Object>} - Los datos de la nota del calendario actualizada.
     */
    async updateNotaCalendario(id, notaData) {
        const response = await axiosInstance.put(`/api/notas-calendario/${id}`, notaData);
        return response.data;
    }

    /**
     * Elimina una nota del calendario por su ID.
     * @param {string|number} id - El ID de la nota del calendario.
     * @returns {Promise<Object>} - La respuesta del servidor sobre la eliminación.
     */
    async deleteNotaCalendario(id) {
        const response = await axiosInstance.delete(`/api/notas-calendario/${id}`);
        return response.data;
    }
}

export default new NotasCalendarioService();
