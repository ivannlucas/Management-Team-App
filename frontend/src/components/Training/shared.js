import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import FileUpload from 'primevue/fileupload';
import Dropdown from 'primevue/dropdown';
import Button from "primevue/button";
import MultiSelect from 'primevue/multiselect';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import Modal from "../../components/Partials/Modal";
import { mapState } from 'vuex';

// PDF generation libraries
import { jsPDF } from "jspdf";
import moment from 'moment';

import EntrenamientosService from '@/services/entrenamientos/entrenamientos.service';

/**
 * @mixin MyShared
 * @description Mixin que proporciona la funcionalidad para la gestión de entrenamientos, incluyendo la creación, actualización, eliminación y generación de informes en PDF de los entrenamientos.
 */
var MyShared = {
    /**
     * @name TrainingTable
     * @type {string}
     * @description Nombre del componente que utiliza este mixin.
     */
    name: "TrainingTable",

    /**
     * @description Datos reactivos del componente.
     * @returns {object} El estado inicial de los datos.
     */
    data() {
        return {
            /** 
             * @property {string} name - Nombre del entrenamiento.
             */
            name: '',

            /** 
             * @property {Date|null} fecha - Fecha del entrenamiento.
             */
            fecha: null,

            /** 
             * @property {Date|null} horaInicio - Hora de inicio del entrenamiento.
             */
            horaInicio: null,

            /** 
             * @property {Date|null} horaFin - Hora de fin del entrenamiento.
             */
            horaFin: null,

            /** 
             * @property {number} numExercises - Número de ejercicios especificados por el usuario.
             */
            numExercises: 0,

            /** 
             * @property {Array<object>} exercises - Array que contiene los objetos de ejercicio.
             */
            exercises: [],

            /** 
             * @property {File|null} selectedFile - Archivo seleccionado para subir.
             */
            selectedFile: null,

            /** 
             * @property {Array<object>} everyTraining - Lista de todos los entrenamientos del equipo.
             */
            everyTraining: [],

            /** 
             * @property {string|null} trainingId - ID del entrenamiento actual, si está en modo de edición.
             */
            trainingId: null,

            /** 
             * @property {object} filters - Filtros utilizados en la tabla de entrenamientos.
             */
            filters: {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
        };
    },

    /**
     * @description Componentes utilizados en este componente.
     */
    components: {
        DataTable,
        Column,
        Button,
        InputText,
        FileUpload,
        InputNumber,
        Modal,
        Dropdown,
        MultiSelect
    },

    /**
     * @description Props recibidas por el componente.
     */
    props: {},

    /**
     * @description Propiedades computadas del componente.
     */
    computed: {
        /**
         * @getter usuario
         * @memberof MyShared
         * @description Obtiene el objeto usuario desde el módulo 'auth' en Vuex.
         * @returns {object} Objeto usuario con sus detalles.
         */
        ...mapState('auth', ['usuario']),

        /**
         * @description Verifica si el usuario actual es un entrenador.
         * @returns {boolean} True si el usuario es entrenador, de lo contrario False.
         */
        isUserEntrenador() {
            return this.$store.state.auth.usuario && this.$store.state.auth.usuario.rol === 'entrenador';
        }
    },

    /**
     * @description Métodos del componente.
     */
    methods: {
        /**
         * @description Añade o actualiza un entrenamiento en función de si se proporciona un ID.
         * @param {string|null} trainingId - ID del entrenamiento si está en modo de edición, de lo contrario null para crear un nuevo entrenamiento.
         * @async
         */
        async addOrUpdateTraining(trainingId = null) {
            const entrenamiento = {
                name: this.name,
                fecha: this.fecha,
                hora_inicio: this.horaInicio,
                hora_fin: this.horaFin,
                numexercises: this.numExercises,
                exercises: this.exercises,
                equipo_id: this.$store.state.auth.usuario.detalles.equipo_id,
            };

            try {
                if (trainingId) {
                    // Actualizar el entrenamiento existente
                    await EntrenamientosService.updateEntrenamiento(trainingId, entrenamiento);
                    console.log(`Document with ID ${trainingId} updated.`);
                    
                    const index = this.everyTraining.findIndex(t => t.id === trainingId);
                    if (index !== -1) {
                        entrenamiento.id = trainingId;
                        this.$set(this.everyTraining, index, entrenamiento);
                    }
                    
                    this.trainingId = null;
                } else {
                    // Crear un nuevo entrenamiento
                    const response = await EntrenamientosService.createEntrenamiento(entrenamiento);
                    entrenamiento.id = response.id;
                    this.everyTraining.push(entrenamiento);
                    console.log("Document written with ID: ", entrenamiento);
                }
                
                // Limpiar los campos después de la operación exitosa
                this.resetFields();
            } catch (e) {
                console.error("Error adding or updating document: ", e);
            }
        },

        /**
         * @description Resetea los campos del formulario a sus valores predeterminados.
         */
        resetFields() {
            this.name = '';
            this.fecha = null;
            this.horaInicio = null;
            this.horaFin = null;
            this.numExercises = 0;
            this.exercises = [];
            this.selectedFile = null;
        },

        /**
         * @description Obtiene los detalles de un entrenamiento específico por su ID.
         * @param {string} id - ID del entrenamiento.
         * @async
         */
        async getTraining(id) {
            try {
                const response = await EntrenamientosService.getEntrenamientoById(id);
                if (response) {
                    this.trainingId = response.id;
                    this.name = response.name;
                    this.numExercises = response.numexercises;
                    this.exercises = response.exercises;
                    this.fecha = new Date(response.fecha);
                    this.horaInicio = new Date(response.hora_inicio);
                    this.horaFin = new Date(response.hora_fin);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching training: ", error);
            }
        },

        /**
         * @description Elimina la imagen de un ejercicio específico.
         * @param {number} index - Índice del ejercicio en el array exercises.
         * @async
         */
        async deleteImage(index) {
            try {
                const exercise = this.exercises[index];
                const id = this.trainingId;

                await EntrenamientosService.deleteExerciseImage(id, index);

                this.exercises[index].image_id = null;
                this.exercises[index].image_id = "";

                console.log('Imagen eliminada con éxito');
            } catch (error) {
                console.error('Ocurrió un error al eliminar la imagen: ', error);
            }
        },

        /**
         * @description Elimina un entrenamiento específico por su ID.
         * @param {string} id - ID del entrenamiento a eliminar.
         * @async
         */
        async deleteTraining(id) {
            try {
                await EntrenamientosService.deleteEntrenamiento(id);
                console.log(`Document with ID ${id} has been deleted`);
                this.everyTraining = this.everyTraining.filter(training => training.id !== id);
            } catch (error) {
                console.error(`Error deleting document with ID ${id}: `, error);
            }
        },

        /**
         * @description Ajusta el número de ejercicios en el array exercises para igualar el número especificado por el usuario.
         */
        setNumExercises() {
            while (this.exercises.length < this.numExercises) {
                this.exercises.push({ title: '', description: '', material: '', photo: null });
            }
            while (this.exercises.length > this.numExercises) {
                this.exercises.pop();
            }
        },

        /**
         * @description Maneja la subida de archivos para un ejercicio específico.
         * @param {Event} event - Evento que contiene los archivos seleccionados.
         * @param {number} index - Índice del ejercicio en el array exercises.
         * @async
         */
        async handleFileChange(event, index) {
            const file = event.files[0];
            this.exercises[index].selectedFile = file;

            try {
                const response = await EntrenamientosService.uploadExerciseImage(file);
                this.exercises[index].image_id = response.imageUrl;

                this.$refs.toast.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Imagen subida correctamente.',
                    life: 5000
                });
            } catch (error) {
                console.error('Error al subir la imagen: ', error);
                this.$refs.toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Hubo un problema al subir la imagen.',
                    life: 5000
                });
            }
        },

        /**
         * @description Formatea una fecha en un string legible.
         * @param {Date|object|string} fecha - La fecha a formatear.
         * @returns {string} La fecha formateada o "Invalid Date" si la fecha no es válida.
         */
        formatFecha(fecha) {
            let date;
            if (fecha && fecha.seconds) {
                date = new Date(fecha.seconds * 1000);
            } else if (fecha instanceof Date) {
                date = fecha;
            } else if (typeof fecha === 'string') {
                date = new Date(fecha.split(' ')[0]);
            }
            return date ? date.toLocaleDateString() : "Invalid Date";
        },

        /**
         * @description Formatea una hora en un string legible.
         * @param {Date|object|string|number} hora - La hora a formatear.
         * @returns {string} La hora formateada o "Invalid Date" si la hora no es válida.
         */
        formatHora(hora) {
            let date;
            console.log(`HORA: ${hora}`);
            if (hora && hora.seconds) {
                date = new Date(hora.seconds * 1000);
            } else if (hora instanceof Date) {
                date = hora;
            } else if (typeof hora === 'string') {
                date = new Date(hora);
                if (isNaN(date)) {
                    const timePart = hora.split(' ')[1];
                    date = new Date(`1970-01-01T${timePart}`);
                }
            } else if (typeof hora === 'number') {
                date = new Date(hora);
            }

            return date && !isNaN(date.getTime()) ? date.toLocaleTimeString() : "Invalid Date";
        },

        /**
         * @description Genera un PDF con los detalles del entrenamiento.
         * @param {object} data - Datos del entrenamiento para incluir en el PDF.
         * @async
         */
        async generatePDF(data) {
            const doc = new jsPDF();
            let imagePath = require('@/assets/mft_sinfondo.png');
            let img = new Image();
            img.src = imagePath;

            img.onload = function() {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                let dataURL = canvas.toDataURL('image/png');
                let base64Data = dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
                doc.addImage(base64Data, 'PNG', 10, 1, 17, 17);
                doc.setFont("helvetica", "bold");
                doc.text("Management Football Team", 30, 11);
            };

            const formattedDate = moment(data.fecha).format('DD/MM/YYYY');
            const formattedHoraInicio = moment(data.hora_inicio).format('HH:mm');
            const formattedHoraFin = moment(data.hora_fin).format('HH:mm');

            doc.text(`${data.name}`, 10, 25);
            doc.line(10, 30, 200, 30);

            doc.text(`Fecha: ${formattedDate}`, 15, 40);
            doc.text(`Hora inicio: ${formattedHoraInicio}`, 70, 40);
            doc.text(`Hora fin: ${formattedHoraFin}`, 130, 40);
            doc.line(10, 30, 10, 45);
            doc.line(200, 30, 200, 45);
            doc.line(65, 30, 65, 45);
            doc.line(120, 30, 120, 45);
            doc.line(10, 45, 200, 45);

            doc.text(`Ejercicios totales de la sesión: ${data.numexercises}`, 10, 55);

            let y = 65;
            let lineHeight = 10;
            let heightImage = 50;

            for (const [index, exercise] of data.exercises.entries()) {
                if (y >= 270) {
                    doc.addPage();
                    y = 20;
                }

                doc.setFont("courier", "bold");
                doc.text(`Ejercicio ${index + 1}`, 10, y);
                y += lineHeight;

                doc.setFont("times", "normal");
                doc.text(`Título: ${exercise.title}`, 20, y);
                y += lineHeight;

                doc.text(`Material: ${exercise.material}`, 20, y);
                y += lineHeight;

                const description = exercise.description;
                const splitDescription = doc.splitTextToSize(`Descripción: ${description}`, 160);

                for (let i = 0; i < splitDescription.length; i++) {
                    doc.text(splitDescription[i], 20, y);
                    y += lineHeight;
                }

                if (y + heightImage >= 270) {
                    doc.addPage();
                    y = 20;
                }
                if (exercise.image_id) {
                    const imageData = await this.downloadImage(exercise.image_id);
                    doc.addImage(imageData, 'PNG', 20, y, 150, heightImage);
                    y += heightImage;
                }

                y += 10;
                doc.line(10, y, 200, y);
                y += 10;
            }
            doc.save(`${data.name}.pdf`);
        },

        /**
         * @description Descarga una imagen desde una URL y la convierte a base64.
         * @param {string} imageUrl - URL de la imagen a descargar.
         * @returns {Promise<string>} Promesa que resuelve en los datos de la imagen en base64.
         * @async
         */
        async downloadImage(imageUrl) {
            try {
                const response = await fetch(imageUrl);
                const blob = await response.blob();

                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = function() {
                        const base64data = reader.result;
                        resolve(base64data);
                    };
                    reader.onerror = function(error) {
                        reject(error);
                    };
                });
            } catch (error) {
                console.error('Error al descargar la imagen de S3: ', error);
                throw error;
            }
        }
    },

    /**
     * @description Hook de ciclo de vida que se ejecuta cuando el componente ha sido creado.
     * @async
     */
    async created() {
        try {
            const equipoId = this.$store.state.auth.usuario.detalles.equipo_id;
            const entrenamientos = await EntrenamientosService.getAllEntrenamientosByEquipoId(equipoId);
            this.everyTraining = entrenamientos;
        } catch (error) {
            console.error("Error fetching trainings for the team: ", error);
        }
    },

    /**
     * @description Eventos emitidos por el componente.
     * @event
     */
    emits: ["TrainingTable"],
};

export default MyShared;
