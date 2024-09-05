import axiosInstance from "../api"

/**
 * Servicio de autenticación para gestionar el inicio de sesión, registro y otras operaciones relacionadas con el usuario.
 */
class AuthService {
  /**
   * Inicia sesión con las credenciales proporcionadas.
   * 
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Promise<Object>} - Los datos de la respuesta del servidor que incluyen el token de autenticación y la información del usuario.
   */
  async login(email, password) {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  }

  /**
   * Registra un nuevo usuario con la información proporcionada.
   * 
   * @param {string} nombre - El nombre del usuario.
   * @param {string} apellidos - Los apellidos del usuario.
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} password - La contraseña del usuario.
   * @param {string} rol - El rol del usuario (e.g., entrenador, jugador).
   * @param {string} imagen - URL de la imagen del usuario.
   * @param {boolean} isverified - Indica si el usuario ha verificado su correo electrónico.
   * @returns {Promise<Object>} - Los datos de la respuesta del servidor que incluyen la información del usuario registrado.
   */
  async register(nombre, apellidos, email, password, rol, imagen, isverified) {
    const response = await axiosInstance.post("/api/auth/register", {
      nombre,
      apellidos,
      email,
      password,
      rol,
      imagen,
      isverified
    });
    return response.data;
  }

  /**
   * Verifica la autenticación del usuario comprobando si el token es válido.
   * 
   * @returns {Promise<Object>} - Los datos de la respuesta del servidor que indican si el usuario está autenticado.
   */
  async checkAuth() {
    const response = await axiosInstance.get("/api/auth/verify-email", {
      headers: { "x-access-token": getToken() },
    });
    return response.data;
  }

  /**
   * Cambia la contraseña del usuario.
   * 
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} newPassword - La nueva contraseña del usuario.
   * @returns {Promise<Object>} - Los datos de la respuesta del servidor que confirman el cambio de contraseña.
   */
  async changePassword(email, newPassword) {
    const response = await axiosInstance.post("/api/auth/change-password", {
      email,
      newPassword,
    });
    return response.data;
  }

  /**
   * Envía un correo electrónico para restablecer la contraseña del usuario.
   * 
   * @param {string} email - El correo electrónico del usuario.
   * @returns {Promise<Object>} - Los datos de la respuesta del servidor que confirman el envío del correo de restablecimiento.
   */
  async resetPassword(email) {
    const response = await axiosInstance.post("/api/auth/reset-password", {
      email
    });
    return response.data;
  }

  /**
   * Verifica el correo electrónico del usuario utilizando un token.
   * 
   * @param {string} token - El token de verificación de correo electrónico.
   * @returns {Promise<Object>} - Los datos de la respuesta del servidor que confirman la verificación del correo electrónico.
   */
  async verifyEmail(token) {
    const response = await axiosInstance.get(`/api/auth/verify-email?token=${token}`);
    return response.data;
  }
}

export default new AuthService();
