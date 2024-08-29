import axiosInstance from "../api"

/**
 * Servicio para la gestión de usuarios.
 */
class UsuariosService {
    /**
     * Crea un nuevo usuario.
     * @param {Object} usuarioData - Los datos del usuario a crear.
     * @returns {Promise<Object>} - Los datos del usuario creado.
     */
    async createUsuario(usuarioData) {
        const response = await axiosInstance.post("/api/users", usuarioData);
        return response.data;
    }

    /**
     * Obtiene todos los usuarios.
     * @returns {Promise<Object[]>} - Una lista de todos los usuarios.
     */
    async getAllUsuarios() {
        const response = await axiosInstance.get("/api/users");
        return response.data;
    }

    /**
     * Obtiene un usuario por su ID.
     * @param {string|number} id - El ID del usuario.
     * @returns {Promise<Object>} - Los datos del usuario.
     */
    async getUsuarioById(id) {
        const response = await axiosInstance.get(`/api/users/${id}`);
        return response.data;
    }
    
    /**
     * Obtiene una lista de usuarios por el ID del equipo.
     * @param {string|number} equipoId - El ID del equipo.
     * @returns {Promise<Object[]>} - Una lista de usuarios asociados con el equipo.
     */
    async getUsuariosByEquipo(equipoId) {
        const response = await axiosInstance.get(`/api/users/equipo/${equipoId}`);
        return response.data;
    }

    /**
     * Actualiza un usuario existente.
     * @param {string|number} id - El ID del usuario.
     * @param {Object} usuarioData - Los nuevos datos del usuario.
     * @returns {Promise<Object>} - Los datos del usuario actualizado.
     */
    async updateUsuario(id, usuarioData) {
        const response = await axiosInstance.put(`/api/users/${id}`, usuarioData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }

    /**
     * Elimina un usuario por su ID.
     * @param {string|number} id - El ID del usuario.
     * @returns {Promise<Object>} - La respuesta del servidor sobre la eliminación.
     */
    async deleteUsuario(id) {
        const response = await axiosInstance.delete(`/api/users/${id}`);
        return response.data;
    }
}

export default new UsuariosService();
