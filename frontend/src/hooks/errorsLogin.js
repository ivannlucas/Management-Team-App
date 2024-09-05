/**
 * Módulo para gestionar errores de inicio de sesión.
 * @module errorsLogin
 */

export const errorsLogin = () => {

    /**
     * Función para determinar el mensaje de error basado en el código de error proporcionado.
     * @function
     * @param {Object} error - Objeto de error que contiene el código de error.
     * @param {string} error.code - El código de error devuelto por el sistema de autenticación.
     * @returns {string} El mensaje de error correspondiente al código de error.
     */
    const typeError = (error) => {
        switch (error.code) {
            case "auth/wrong-password":
                return "Contraseña incorrecta";
            case "auth/email-already-in-use":
                return "El correo ya está asociado a una cuenta";
            case "auth/email-already-exists":
                return "El correo ya está registrado, inicie sesión";
            case "auth/too-many-requests":
                return "El acceso a esta cuenta se ha inhabilitado temporalmente debido a muchos intentos fallidos de "
                    + "inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde";
            case "auth/user-not-found":
                return "Usuario no encontrado";
            default:
                return "Error en la base de datos";
        }
    }

    return { typeError };
}
