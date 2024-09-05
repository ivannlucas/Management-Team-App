import axiosInstance from "../api"

/**
 * Servicio para la gestión de entrenamientos.
 */
class EntrenamientosService {
    /**
     * Crea un nuevo entrenamiento.
     * @param {Object} entrenamientoData - Los datos del entrenamiento a crear.
     * @returns {Promise<Object>} - Los datos del entrenamiento creado.
     */
    async createEntrenamiento(entrenamientoData) {
        const response = await axiosInstance.post("/api/entrenamientos", entrenamientoData);
        return response.data;
    }

    /**
     * Obtiene todos los entrenamientos.
     * @returns {Promise<Object[]>} - Una lista de todos los entrenamientos.
     */
    async getAllEntrenamientos() {
        const response = await axiosInstance.get("/api/entrenamientos");
        return response.data;
    }

    /**
     * Obtiene un entrenamiento por su ID.
     * @param {string|number} id - El ID del entrenamiento.
     * @returns {Promise<Object>} - Los datos del entrenamiento.
     */
    async getEntrenamientoById(id) {
        const response = await axiosInstance.get(`/api/entrenamientos/${id}`);
        return response.data;
    }

    /**
     * Obtiene todos los entrenamientos de un equipo por su ID.
     * @param {string|number} equipoId - El ID del equipo.
     * @returns {Promise<Object[]>} - Una lista de entrenamientos del equipo.
     */
    async getAllEntrenamientosByEquipoId(equipoId) {
        const response = await axiosInstance.get(`/api/entrenamientos/equipo/${equipoId}`);
        return response.data;
    }

    /**
     * Actualiza un entrenamiento existente.
     * @param {string|number} id - El ID del entrenamiento.
     * @param {Object} entrenamientoData - Los nuevos datos del entrenamiento.
     * @returns {Promise<Object>} - Los datos del entrenamiento actualizado.
     */
    async updateEntrenamiento(id, entrenamientoData) {
        const response = await axiosInstance.put(`/api/entrenamientos/${id}`, entrenamientoData);
        return response.data;
    }

    /**
     * Elimina un entrenamiento por su ID.
     * @param {string|number} id - El ID del entrenamiento.
     * @returns {Promise<Object>} - La respuesta del servidor sobre la eliminación.
     */
    async deleteEntrenamiento(id) {
        const response = await axiosInstance.delete(`/api/entrenamientos/${id}`);
        return response.data;
    }

    /**
     * Sube una imagen de un ejercicio.
     * @param {File} file - El archivo de imagen a subir.
     * @returns {Promise<Object>} - La respuesta del servidor con la URL de la imagen subida.
     */
    async uploadExerciseImage(file) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axiosInstance.post('/api/entrenamientos/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    }

    /**
     * Elimina una imagen de un ejercicio específico en un entrenamiento.
     * @param {string|number} id - El ID del entrenamiento.
     * @param {number} exerciseIndex - El índice del ejercicio cuya imagen se eliminará.
     * @returns {Promise<Object>} - La respuesta del servidor sobre la eliminación de la imagen.
     */
    async deleteExerciseImage(id, exerciseIndex) {
        const response = await axiosInstance.delete(`/api/entrenamientos/${id}/delete-image`, {
            data: { exerciseIndex }
        });
        return response.data;
    }
}

export default new EntrenamientosService();
