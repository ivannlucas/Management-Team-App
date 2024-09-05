import router from '@/router';
import AuthService from "../../services/auth/auth.service";
import EntrenadorService from "../../services/entrenadores/entrenadores.service";
import EquipoService from "../../services/equipo/equipo.service";
import JugadoresService from '../../services/jugadores/jugadores.service';

export default {
    namespaced: true,
    state: {
        usuario: {
            nombre: '',
            apellidos: '',
            email: '',
            telefono: '',
            edad: '',
            rol: '',
            photoURL: '',
            detalles: {  
                anios_experiencia: null,
                equipo_actual: '',
                equipo_id: '',
                altura: null,
                peso: null,
                numero_camiseta: null,
                posicion: ''
            }
        },
        error: '',
        resetDisable: false
    },
    mutations: {
        /**
         * Establece los datos del usuario en el estado.
         * @param {Object} state - El estado de Vuex.
         * @param {Object} payload - Los datos del usuario a establecer.
         */
        setUsuario(state, payload) {
            if (payload === null) {
                state.usuario = '';
            } else {
                state.usuario = { ...state.usuario, ...payload };
                if (payload.detalles) {
                    state.usuario.detalles = payload.detalles;
                }
            }
        },
        /**
         * Establece los detalles del usuario en el estado.
         * @param {Object} state - El estado de Vuex.
         * @param {Object} payload - Los detalles del usuario a establecer.
         */
        setDetalles(state, payload) {
            state.usuario.detalles = payload;
        },
        /**
         * Establece un mensaje de error en el estado.
         * @param {Object} state - El estado de Vuex.
         * @param {string} payload - El mensaje de error.
         */
        setError(state, payload) {
            state.error = payload;
        },
        /**
         * Establece el estado de `resetDisable`.
         * @param {Object} state - El estado de Vuex.
         * @param {boolean} value - El nuevo valor de `resetDisable`.
         */
        setResetDisable(state, value) {
            state.resetDisable = value;
        },
    },
    getters: {
        /**
         * Verifica si el usuario está logueado.
         * @param {Object} state - El estado de Vuex.
         * @returns {boolean} `true` si el usuario está logueado, `false` de lo contrario.
         */
        userLogin(state) {
            return (state.usuario === '') ? false : true;
        },
        /**
         * Obtiene la primera letra del nombre del usuario.
         * @param {Object} state - El estado de Vuex.
         * @returns {string} La primera letra del nombre del usuario.
         */
        getName(state) {
            return state.usuario.nombre.slice(0, 1);
        },
        /**
         * Obtiene la primera letra del apellido del usuario.
         * @param {Object} state - El estado de Vuex.
         * @returns {string} La primera letra del apellido del usuario.
         */
        getApellidos(state) {
            return state.usuario.apellidos.slice(0, 1);
        },
        /**
         * Verifica si hay un error almacenado en el estado.
         * @param {Object} state - El estado de Vuex.
         * @returns {boolean} `true` si hay un error, `false` de lo contrario.
         */
        getError(state) {
            return (state.error === '') ? false : true;
        }
    },
    actions: {
        /**
         * Crea un nuevo usuario y lo registra en la aplicación.
         * @param {Object} context - El contexto de Vuex.
         * @param {Object} usuario - Los datos del usuario a registrar.
         */
        async createUser({ commit }, usuario) {
            const isverified = false;
            const imagen = '';
            
            const userData = {
                nombre: usuario.name,
                apellidos: usuario.apellidos,
                email: usuario.email,
                password: usuario.password,
                rol: usuario.rol,
                imagen: imagen
            };
        
            try {
                const data = await AuthService.register(usuario.name, usuario.apellidos, usuario.email, usuario.password, usuario.rol, imagen, isverified);
                console.log('Usuario registrado con éxito:', data);
                if (data && data.newUser) {
                    commit('setUsuario', data.newUser);
                    localStorage.setItem('userToken', data.token);
                    
                    if (data.newUser.rol === 'entrenador') {
                        const equipoData = {
                            nombre_equipo: usuario.nombre_equipo
                        };
                        const equipoResponse = await EquipoService.createEquipo(equipoData);
                        console.log('Equipo registrado con éxito:', equipoResponse);

                        if (equipoResponse && equipoResponse.id) {
                            const entrenadorData = {
                                usuario_id: data.newUser.id,
                                equipo_id: equipoResponse.id,
                                nombre_entrenador: usuario.name,
                                edad: usuario.edad,
                                anios_experiencia: usuario.anios_experiencia,
                                equipo_actual: usuario.nombre_equipo
                            };
                            
                            const entrenadorResponse = await EntrenadorService.createEntrenador(entrenadorData);
                            console.log('Entrenador registrado con éxito:', entrenadorResponse);

                            commit('setDetalles', entrenadorData);
                            router.push('/login');
                        }
                    } else if (data.newUser.rol === 'jugador') {
                        const jugadorData = {
                            usuario_id: data.newUser.id,
                            equipo_id: usuario.equipo_id,
                            nombre_jugador: usuario.name,
                            numero_camiseta: usuario.num_camiseta,
                            edad: usuario.edad,
                            altura: usuario.altura,
                            peso: usuario.peso,
                            posicion: usuario.posicion.pname
                        };

                        const jugadorResponse = await JugadoresService.createJugador(jugadorData);
                        console.log('Jugador registrado con éxito:', jugadorResponse);
                        
                        commit('setDetalles', jugadorData);
                        router.push('/login');
                    }
                } else {
                    console.log('Respuesta inesperada del servidor:', data);
                    commit('setError', {
                        errorCode: data.status,
                        errorMessage: "Respuesta inesperada del servidor"
                    });
                    throw error;
                }
            } catch (error) {
                console.error('Error al registrar el usuario:', error);
                if (error.response) {
                    commit('setError', {
                        errorCode: error.response.status,
                        errorMessage: error.response.data.message
                    });
                    throw error;
                } else {
                    commit('setError', {
                        errorCode: 0,
                        errorMessage: "Error de red o no hay respuesta del servidor"
                    });
                }
            }
        },

        /**
         * Inicia sesión de un usuario.
         * @param {Object} context - El contexto de Vuex.
         * @param {Object} usuario - Los datos del usuario que intenta iniciar sesión.
         */
        async signUser({ commit }, usuario) {
            try {
                const data = await AuthService.login(usuario.email, usuario.password);
                
                if (data) {
                    if (data.user.isverified) {
                        console.log("Email verificado");
                    } else {
                        console.log("Email no verificado");
                    }

                    localStorage.setItem('userToken', data.token);
                    commit('setUsuario', data.user);

                    if (data.user.detalles) {
                        commit('setDetalles', data.user.detalles);
                    }

                    router.push('/dashboard');
                } else {
                    throw new Error('No data received');
                }
            } catch (error) {
                console.error("Error en el login:", error);
                commit('setError', {
                    errorCode: error.response.status,
                    errorMessage: error.response ? error.response.data.message : 'Error de red o no hay respuesta del servidor'
                });
                throw error;
            }
        },

        /**
         * Cierra la sesión del usuario actual.
         * @param {Object} context - El contexto de Vuex.
         */
        async signOut({ commit }) {
            try {
                localStorage.removeItem('userToken');
                commit('setUsuario', null);
                router.push('/login');
                console.log("Cierre de sesión exitoso.");
            } catch (error) {
                console.error("Error al cerrar sesión:", error.message);
            }
        },

        /**
         * Envía una solicitud para restablecer la contraseña de un usuario.
         * @param {Object} context - El contexto de Vuex.
         * @param {Object} usuario - Los datos del usuario para el restablecimiento de la contraseña.
         */
        async resetPassword({ commit }, usuario) {
            try {
                const data = await AuthService.resetPassword(usuario.email);
                
            } catch (error) {
                console.error("Error al intentar recuperar la contraseña:", error.response.data.message);
                commit('setError', {
                    errorCode: error.response.status,
                    errorMessage: error.response.data.message
                });
                throw error;
            }
        },

        /**
         * Cambia la contraseña de un usuario.
         * @param {Object} context - El contexto de Vuex.
         * @param {Object} usuario - Los datos del usuario para cambiar la contraseña.
         */
        async ChangePassword({ commit }, usuario) {
            try {
                const data = await AuthService.changePassword(usuario.email, usuario.newPassword);
                commit('setResetDisable', false);
            } catch (error) {
                console.error("Error al intentar cambiar la contraseña:", error.response.data.message);
                commit('setError', {
                    errorCode: error.response.status,
                    errorMessage: error.response.data.message
                });
                throw error;
            }
        },

        /**
         * Limpia el estado de error.
         * @param {Object} commit - El método `commit` de Vuex.
         */
        clearError({ commit }) {
            commit('setError', '');
        },
    }
}
