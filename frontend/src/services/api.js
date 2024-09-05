import axios from 'axios';

/**
 * Crea una instancia de Axios configurada para interactuar con la API.
 * La URL base se configura a partir de la variable de entorno `VUE_APP_API_URL`.
 * Si no está disponible, se utiliza `http://localhost:80` como predeterminado.
 */
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:80',
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
