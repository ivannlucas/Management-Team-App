import axiosInstance from "../api"

/**
 * Servicio para la gestión de jugadores.
 */
class JugadoresService {
    /**
     * Crea un nuevo jugador.
     * @param {Object} jugadorData - Los datos del jugador a crear.
     * @returns {Promise<Object>} - Los datos del jugador creado.
     */
    async createJugador(jugadorData) {
        const response = await axiosInstance.post("/api/jugadores", jugadorData);
        return response.data;
    }

    /**
     * Obtiene todos los jugadores.
     * @returns {Promise<Object[]>} - Una lista de todos los jugadores.
     */
    async getAllJugadores() {
        const response = await axiosInstance.get("/api/jugadores");
        return response.data;
    }

    /**
     * Obtiene todos los jugadores por el ID del equipo.
     * @param {string|number} equipoId - El ID del equipo.
     * @returns {Promise<Object[]>} - Una lista de todos los jugadores del equipo.
     */
    async getAllJugadoresByEquipoId(equipoId) {
        const response = await axiosInstance.get(`/api/jugadores/equipo/${equipoId}`);
        return response.data;
    }

    /**
     * Obtiene un jugador por su ID.
     * @param {string|number} id - El ID del jugador.
     * @returns {Promise<Object>} - Los datos del jugador.
     */
    async getJugadorById(id) {
        const response = await axiosInstance.get(`/api/jugadores/${id}`);
        return response.data;
    }

    /**
     * Actualiza un jugador existente.
     * @param {string|number} id - El ID del jugador.
     * @param {Object} jugadorData - Los nuevos datos del jugador.
     * @returns {Promise<Object>} - Los datos del jugador actualizado.
     */
    async updateJugador(id, jugadorData) {
        const response = await axiosInstance.put(`/api/jugadores/${id}`, jugadorData);
        return response.data;
    }

    /**
     * Actualiza los detalles de un jugador existente.
     * @param {string|number} id - El ID del jugador.
     * @param {Object} detalles - Los nuevos detalles del jugador.
     * @returns {Promise<Object>} - Los datos de los detalles del jugador actualizados.
     */
    async updateJugadorDetalles(id, detalles) {
        const response = await axiosInstance.put(`/api/jugadores/${id}/detalles`, detalles);
        return response.data;
    }

    /**
     * Elimina un jugador por su ID.
     * @param {string|number} id - El ID del jugador.
     * @returns {Promise<Object>} - La respuesta del servidor sobre la eliminación.
     */
    async deleteJugador(id) {
        const response = await axiosInstance.delete(`/api/jugadores/${id}`);
        return response.data;
    }
}

export default new JugadoresService();
