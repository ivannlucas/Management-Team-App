<template>
    <div> 
      <h3 class="mt-2 mb-2">  Crea tus propios entrenamientos</h3>

      <MegaMenu :model="items" @item-select="navigate"></MegaMenu>
    
      <div class="row">
        <div class="col-12">
          <canvas id="myCanvas" width="800" height="653"></canvas>
        </div>
      </div>
    
    <!-- Add text -->
    <Modal ref="addText">
        <template v-slot:header>
            <h1>Añadir texto al tablero</h1>
        </template>
        <template v-slot:body>
          <div class="row">
            <div class="form-group col-md-6">
                <label>Texto para añadir</label>
              <input type="text" class="form-control" v-model="text" />
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <button class="btn" @click="$refs.addText.closeModal()">Cancelar</button>
          <button class="btn btn-primary" @click="addText()">Guardar</button>
        </template>
      </Modal> 
      <!-- Add text -->
    <Modal ref="addName">
        <template v-slot:header>
          <h1>Nombre de la imagen</h1>
        </template>
        <template v-slot:body>
          <div class="row">
            <div class="form-group col-md-6">
              <label>Texto</label>
              <input type="text" class="form-control" v-model="nameImage" />
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <button class="btn" @click="$refs.addName.closeModal()">Cancelar</button>
          <button class="btn btn-primary" @click="$refs.addName.closeModal()">Guardar</button>
        </template>
      </Modal> 
    </div>
  </template>
    
    <script>
    import { reduce, thresholdSturges } from 'd3-array';
    import Modal from "../../components/Partials/Modal";
    
    /**
     * @module CanvasEditor
     * @description Componente que permite la edición de un canvas interactivo, donde se pueden dibujar líneas, agregar imágenes, insertar texto, y manipular estos elementos.
     */
    export default {
        /**
         * @description Datos reactivos del componente.
         * @returns {object} El estado inicial de los datos.
         */
        data() {
            return {
                /** @property {CanvasRenderingContext2D|null} canvasCtx - Contexto del canvas para dibujar. */
                canvasCtx: null,
                /** @property {number|null} canvas_width - Ancho del canvas. */
                canvas_width: null,
                /** @property {number|null} canvas_height - Alto del canvas. */
                canvas_height: null,
                /** @property {Array} lines - Array que almacena las líneas dibujadas en el canvas. */
                lines: [],
                /** @property {Array} arrows - Array que almacena las flechas dibujadas en el canvas. */
                arrows: [],
                /** @property {boolean} isDrawing - Indicador de si se está dibujando en el canvas. */
                isDrawing: false,
                /** @property {number} x - Coordenada X del inicio de la línea. */
                x: 0,
                /** @property {number} y - Coordenada Y del inicio de la línea. */
                y: 0,
                /** @property {Array} images - Array que almacena las imágenes agregadas al canvas. */
                images: [],
                /** @property {number|null} startX - Coordenada X de inicio para la manipulación de imágenes. */
                startX: null,
                /** @property {number|null} startY - Coordenada Y de inicio para la manipulación de imágenes. */
                startY: null,
                /** @property {number|null} current_shape_index - Índice de la imagen actual que se está manipulando. */
                current_shape_index: null,
                /** @property {boolean} is_dragging - Indicador de si una imagen está siendo arrastrada. */
                is_dragging: false,
                /** @property {string|null} text - Texto que se va a insertar en el canvas. */
                text: null,
                /** @property {string} nameImage - Nombre predeterminado de la imagen cuando se descarga. */
                nameImage: 'training',
                /** @property {boolean} showTextDialog - Indicador de si se muestra el diálogo para insertar texto. */
                showTextDialog: true,
                /** @property {Array} textItems - Array que almacena las posiciones y el contenido de los textos agregados al canvas. */
                textItems: [],
                /** @property {boolean} isTextDragging - Indicador de si un texto está siendo arrastrado. */
                isTextDragging: false,
                /** @property {number|null} selectedTextIndex - Índice del texto seleccionado para arrastrar. */
                selectedTextIndex: null,
                x_inicio: null,
                y_inicio: null,
                /** @property {Array} items - Elementos del menú contextual para agregar imágenes, herramientas y texto al canvas. */
                items: [
                    {
                        label: 'Equipamiento',
                        items: [
                            [
                                {
                                    label: 'Elige el equipamiento que desea insertar',
                                    items: [
                                        { label: 'Cono', command: () => this.addEventImages('cono'), icon: require('@/assets/cono.png') },
                                        { label: 'Balón', command: () => this.addEventImages('balon'), icon: require('@/assets/balon.png') },
                                        { label: 'Aro', command: () => this.addEventImages('aro'), icon: require('@/assets/balon.png') },
                                        { label: 'Portería', command: () => this.addEventImages('porteria'), icon: require('@/assets/balon.png') },
                                        { label: 'Jugador Equipo Azul', command: () => this.addEventImages('jugador_azul'), icon: require('@/assets/balon.png') },
                                        { label: 'Jugador Equipo Rojo', command: () => this.addEventImages('jugador_rojo'), icon: require('@/assets/balon.png') }
                                    ]
                                }
                            ]
                        ]
                    },
                    {
                        label: 'Herramientas',
                        items: [
                            [
                                {
                                    label: 'Elige la acción que desea ejecutar',
                                    items: [
                                        { label: 'Dibujar', command: () => this.addEventDraw(), icon: "pi pi-pencil" },
                                        { label: 'Borrar', command: () => this.clearCanvas(), icon: "pi pi-trash" },
                                        { label: 'Descargar', command: () => this.downloadCanvas(), icon: "pi pi-download" }
                                    ]
                                }
                            ]
                        ]
                    },
                    {
                        label: 'Texto',
                        items: [
                            [
                                {
                                    label: 'Texto',
                                    items: [
                                        { label: 'Insertar texto', command: () => this.$refs.addText.openModal() },
                                        { label: 'Cambiar nombre de la imagen', command: () => this.$refs.addName.openModal() }
                                    ]
                                }
                            ]
                        ]
                    }
                ]
            };
        },
    
        /**
         * @description Componentes utilizados en este componente.
         */
        components: {
            Modal,
        },
    
        /**
         * @description Métodos del componente.
         */
        methods: {
            /**
             * @method navigate
             * @description Maneja la navegación cuando se selecciona un ítem del menú.
             * @param {Object} event - El evento de navegación.
             */
            navigate(event) {
                console.log("Item seleccionado:", event);
            },
    
            /********************************** IMÁGENES ************************************************/
    
            /**
             * @method addEventImages
             * @description Añade una imagen al canvas y establece los manejadores de eventos para manipularla.
             * @param {string} nameImg - Nombre de la imagen a agregar.
             */
            addEventImages(nameImg) {
                let canvas = document.getElementById("myCanvas");
                this.canvasCtx = canvas.getContext('2d');
                this.canvasCtx.globalCompositeOperation = "source-over";
    
                this.canvas_width = canvas.width;
                this.canvas_height = canvas.height;
    
                canvas.onmousedown = this.mouse_down;
                canvas.onmouseup = this.mouse_up;
                canvas.onmouseout = this.mouse_out;
                canvas.onmousemove = this.mouse_move;
    
                this.addImage(nameImg);
            },
    
            /**
             * @method is_mouse_in_shape
             * @description Verifica si el ratón está dentro de una forma (imagen) en el canvas.
             * @param {number} positionX - Posición X del ratón.
             * @param {number} positionY - Posición Y del ratón.
             * @param {Object} shape - Objeto que representa la forma (imagen).
             * @returns {boolean} - Verdadero si el ratón está dentro de la forma, falso en caso contrario.
             */
            is_mouse_in_shape(positionX, positionY, shape) {
                let canvas = document.getElementById("myCanvas");
    
                const rect = canvas.getBoundingClientRect();
                const x = parseInt(positionX - rect.left);
                const y = parseInt(positionY - rect.top);
    
                let shape_left = shape.x;
                let shape_right = shape.x + shape.width;
                let shape_top = shape.y;
                let shape_bottom = shape.y + shape.height;
    
                return (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom);
            },
    
            /**
             * @method mouse_down
             * @description Maneja el evento de mousedown para comenzar a arrastrar imágenes o texto en el canvas.
             * @param {Event} event - Evento del ratón.
             */
            mouse_down(event) {
                event.preventDefault();
                this.startX = parseInt(event.clientX);
                this.startY = parseInt(event.clientY);
    
                let index = 0;
                for (let textItem of this.textItems) {
                    if (this.isMouseInText(this.startX, this.startY, textItem)) {
                        this.selectedTextIndex = index;
                        this.isTextDragging = true;
                        
                        return;
                    }
                    index++;
                }
    
                index = 0;
                for (let shape of this.images) {
                    if (index !== 0 && this.is_mouse_in_shape(this.startX, this.startY, shape)) {
                        this.current_shape_index = index;
                        this.is_dragging = true;
                        return;
                    }
                    index++;
                }
            },
    
            /**
             * @method mouse_up
             * @description Maneja el evento de mouseup para detener el arrastre de imágenes o texto en el canvas.
             * @param {Event} event - Evento del ratón.
             */
            mouse_up(event) {
                if (this.isTextDragging) {
                    this.isTextDragging = false;
                } else if (!this.is_dragging) {
                    return;
                }
                event.preventDefault();
                this.is_dragging = false;
            },
    
            /**
             * @method mouse_out
             * @description Maneja el evento de mouseout para detener el arrastre de imágenes o texto cuando el ratón sale del canvas.
             * @param {Event} event - Evento del ratón.
             */
            mouse_out(event) {
                if (this.isTextDragging) {
                    this.isTextDragging = false;
                } else if (!this.is_dragging) {
                    return;
                }
                event.preventDefault();
                this.is_dragging = false;
            },
    
            /**
             * @method mouse_move
             * @description Maneja el evento de mousemove para arrastrar imágenes o texto en el canvas.
             * @param {Event} event - Evento del ratón.
             */
            mouse_move(event) {
                if (this.isTextDragging) {
                    event.preventDefault();
    
                    let mouseX = parseInt(event.clientX);
                    let mouseY = parseInt(event.clientY);
    
                    let dx = mouseX - this.startX;
                    let dy = mouseY - this.startY;
    
                    let currentText = this.textItems[this.selectedTextIndex];
                    currentText.x += dx;
                    currentText.y += dy;
    
                    console.log("Moviendo texto a nueva posición:", currentText);
    
                    this.drawALL();
    
                    this.startX = mouseX;
                    this.startY = mouseY;
                } else if (this.is_dragging) {
                    event.preventDefault();
    
                    let mouseX = parseInt(event.clientX);
                    let mouseY = parseInt(event.clientY);
    
                    let dx = mouseX - this.startX;
                    let dy = mouseY - this.startY;
    
                    let current_shape = this.images[this.current_shape_index];
                    current_shape.x += dx;
                    current_shape.y += dy;
    
                    this.drawALL();
    
                    this.startX = mouseX;
                    this.startY = mouseY;
                }
            },
    
            /**
             * @method addImage
             * @description Agrega una imagen al canvas.
             * @param {string} nameImg - Nombre de la imagen a agregar.
             */
            addImage(nameImg) {
                var image = new Image();
                image.src = require(`@/assets/${nameImg}.png`);
                this.images.push({ img: image, x: 0, y: 0, width: 50, height: 50 });
    
                image.addEventListener("load", () => {
                    this.canvasCtx.drawImage(image, 0, 0, 50, 50);
                });
            },
    
            /********************************** LÍNEAS ************************************************/
    
            /**
             * @method addEventDraw
             * @description Habilita el modo de dibujo en el canvas, permitiendo al usuario dibujar líneas.
             */
            addEventDraw() {
                let canvas = document.getElementById("myCanvas");
                this.canvasCtx = canvas.getContext('2d');
    
                canvas.onmousemove = this.draw;
                canvas.onmousedown = this.beginDrawing;
                canvas.onmouseup = this.stopDrawing;
                canvas.onmouseout = null;
            },
    
            /**
             * @method beginDrawing
             * @description Comienza a dibujar una línea en el canvas.
             * @param {Event} event - Evento del ratón.
             */
            beginDrawing(event) {
                this.x_inicio = event.offsetX;
                this.y_inicio = event.offsetY;
                this.x = event.offsetX;
                this.y = event.offsetY;
                this.isDrawing = true;
            },
    
            /**
             * @method stopDrawing
             * @description Finaliza el dibujo de una línea en el canvas.
             * @param {Event} event - Evento del ratón.
             */
            stopDrawing(event) {
                if (this.isDrawing) {
                    this.lines.push({ x1: this.x, y1: this.y, x2: event.offsetX, y2: event.offsetY });
                    this.drawLines(this.x, this.y, event.offsetX, event.offsetY);
                    
                    // Guarda las coordenadas de la flecha en el array
                    this.arrows.push({ x1: this.x_inicio, y1: this.y_inicio, x2: event.offsetX, y2: event.offsetY });

                    // Dibujar flecha en el punto final de la línea
                    this.drawArrowHead(this.x_inicio, this.y_inicio, event.offsetX, event.offsetY);
    
                    this.x = 0;
                    this.y = 0;
                    this.isDrawing = false;
                }
            },
    
            /**
             * @method drawArrowHead
             * @description Dibuja la cabeza de una flecha en el punto final de una línea.
             * @param {number} x1 - Coordenada X del punto inicial.
             * @param {number} y1 - Coordenada Y del punto inicial.
             * @param {number} x2 - Coordenada X del punto final.
             * @param {number} y2 - Coordenada Y del punto final.
             */
             drawArrowHead(x1, y1, x2, y2) {
                const angle = Math.atan2(y2 - y1, x2 - x1); // Calcula el ángulo de la línea
                const headLength = 10; // Longitud de la cabeza de la flecha
    
                // Calcula las coordenadas de los dos puntos que forman la cabeza de la flecha
                const arrowX1 = x2 - headLength * Math.cos(angle - Math.PI / 6);
                const arrowY1 = y2 - headLength * Math.sin(angle - Math.PI / 6);
                const arrowX2 = x2 - headLength * Math.cos(angle + Math.PI / 6);
                const arrowY2 = y2 - headLength * Math.sin(angle + Math.PI / 6);

                this.canvasCtx.beginPath();
                this.canvasCtx.moveTo(x2, y2);
                this.canvasCtx.lineTo(arrowX1, arrowY1); // Dibuja la primera línea de la cabeza de la flecha
                this.canvasCtx.moveTo(x2, y2);
                this.canvasCtx.lineTo(arrowX2, arrowY2); // Dibuja la segunda línea de la cabeza de la flecha
                this.canvasCtx.stroke();
                this.canvasCtx.closePath();
            },
    
            /**
             * @method draw
             * @description Continúa dibujando una línea en el canvas mientras el ratón se mueve.
             * @param {Event} event - Evento del ratón.
             */
            draw(event) {
                if (this.isDrawing) {
                    this.lines.push({ x1: this.x, y1: this.y, x2: event.offsetX, y2: event.offsetY });
                    this.drawLines(this.x, this.y, event.offsetX, event.offsetY);
                    this.x = event.offsetX;
                    this.y = event.offsetY;
                }
            },
    
            /**
             * @method drawLines
             * @description Dibuja una línea en el canvas entre dos puntos.
             * @param {number} x1 - Coordenada X del punto inicial.
             * @param {number} y1 - Coordenada Y del punto inicial.
             * @param {number} x2 - Coordenada X del punto final.
             * @param {number} y2 - Coordenada Y del punto final.
             */
            drawLines(x1, y1, x2, y2) {
                this.canvasCtx.beginPath();
                this.canvasCtx.strokeStyle = 'black';
                this.canvasCtx.lineWidth = 1;
                this.canvasCtx.moveTo(x1, y1);
                this.canvasCtx.lineTo(x2, y2);
                this.canvasCtx.stroke();
                this.canvasCtx.closePath();
            },
    
            /********************************** TEXTO ************************************************/
    
            /**
             * @method addText
             * @description Inserta un texto en el canvas y lo almacena como una imagen en el array de imágenes.
             */
             addText() {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
    
                ctx.font = "30px Calibri, Arial";
                const textWidth = ctx.measureText(this.text).width;
                const textHeight = 30;
                const margin = 5;
    
                canvas.width = textWidth + 2 * margin;
                canvas.height = textHeight + 2 * margin;
    
                ctx.font = "30px Calibri, Arial";
                ctx.fillStyle = "#000000";
                ctx.fillText(this.text, margin, textHeight + margin);
    
                const textImage = new Image();
                textImage.src = canvas.toDataURL("image/png");
    
                this.images.push({ img: textImage, x: 50, y: 50, width: textWidth + 2 * margin, height: textHeight + 2 * margin });
    
                // Esperar a que la imagen esté cargada para dibujarla en el canvas principal
                textImage.addEventListener("load", () => {
                    this.canvasCtx.drawImage(textImage, 50, 50, textWidth + 2 * margin, textHeight + 2 * margin);
                });

                // Obtener el canvas principal donde se dibuja todo
                let canvas2 = document.getElementById("myCanvas");
                this.canvasCtx = canvas2.getContext('2d');

                // Asignar eventos para arrastrar las imágenes en el canvas
                canvas2.onmousedown = (event) => {
                    this.mouse_down(event);
                };
                canvas2.onmouseup = (event) => {
                    this.mouse_up(event);
                };
                canvas2.onmouseout = (event) => {
                    this.mouse_out(event);
                };
                canvas2.onmousemove = (event) => {
                    this.mouse_move(event);
                };
    
                this.isDrawing = false;
                this.$refs.addText.closeModal();
            },
    
            /**
             * @method isMouseInText
             * @description Verifica si el ratón está dentro del área de un texto en el canvas.
             * @param {number} x - Posición X del ratón.
             * @param {number} y - Posición Y del ratón.
             * @param {Object} textItem - Objeto que representa el texto.
             * @returns {boolean} - Verdadero si el ratón está dentro del área del texto, falso en caso contrario.
             */
            isMouseInText(x, y, textItem) {
                const textHeight = parseInt(this.canvasCtx.font, 10);
    
                return (
                    x >= textItem.x &&
                    x <= textItem.x + textItem.width &&
                    y >= textItem.y - textHeight &&
                    y <= textItem.y
                );
            },
    
            /******************************************************************************************/
    
            /**
             * @method downloadCanvas
             * @description Descarga el contenido del canvas como una imagen PNG.
             */
            downloadCanvas() {
                let canvas = document.getElementById("myCanvas");
                canvas.toBlob((blob) => {
                    let link = document.createElement('a');
                    link.download = `${this.nameImage}.png`;
                    link.href = URL.createObjectURL(blob);
                    link.click();
                }, 'image/png');
            },
    
            /**
             * @method drawALL
             * @description Redibuja todos los elementos (imágenes, líneas, textos) en el canvas.
             */
            drawALL() {
                this.canvasCtx.clearRect(0, 0, this.canvas_width, this.canvas_height);
    
                for (let shape of this.images) {
                    this.canvasCtx.drawImage(shape.img, shape.x, shape.y, shape.width, shape.height);
                }
    
                for (let line of this.lines) {
                    this.drawLines(line.x1, line.y1, line.x2, line.y2);
                }

                // Redibujar las flechas
                this.arrows.forEach(arrow => {
                    this.drawArrowHead(arrow.x1, arrow.y1, arrow.x2, arrow.y2);
                });
    
                let ctx = this.canvasCtx;
                ctx.font = "40px Calibri, Arial";
                for (let textItem of this.textItems) {
                    ctx.fillText(textItem.text, textItem.x, textItem.y);
                }
            },
    
            /**
             * @method clearCanvas
             * @description Limpia todo el contenido del canvas y lo reinicia al estado inicial.
             */
            clearCanvas() {
                let canvas = document.getElementById('myCanvas');
                let ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
    
                this.images = [];
                this.lines = [];
                this.textItems = [];
    
                let background = new Image();
                background.src = require("@/assets/campo_board.png");
    
                this.images.push({ img: background, x: 0, y: 0, width: 800, height: 653 });
    
                background.addEventListener("load", (e) => {
                    this.canvasCtx.drawImage(background, 0, 0, 800, 653);
                });
            }
        },
    
        /**
         * @description Hook de ciclo de vida que se ejecuta cuando el componente ha sido montado.
         */
        mounted() {
            let canvas = document.getElementById("myCanvas");
            this.canvasCtx = canvas.getContext('2d');
            this.canvasCtx.globalCompositeOperation = "source-over";
    
            let background = new Image();
            background.src = require("@/assets/campo_board.png");
    
            this.images.push({ img: background, x: 0, y: 0, width: 800, height: 653 });
    
            background.addEventListener("load", (e) => {
                this.canvasCtx.drawImage(background, 0, 0, 800, 653);
            });
    
            let canvas_width = canvas.width;
            let canvas_height = canvas.height;
    
            let shapes = this.images;
    
            let draw_shapes = function () {
                ctx.clearRect(0, 0, canvas_width, canvas_height);
    
                for (let shape of shapes) {
                    ctx.drawImage(shape.img, shape.x, shape.y, shape.width, shape.height);
                }
            };
    
            draw_shapes();
        }
    };
    </script>
    
  
<style scoped>
  #myCanvas{
    border: 1px solid green;
    margin: 2rem;
    background-size: 100% 100%;
  }
  .image-card {
  max-width: 100px;
  margin: auto;
  }
  .image-card__image {
  width: 100%;
  }
  .p-card-content{
    padding: 0;
  }
 .image-card__button {
  margin-top: 0.5rem;
  width: 100%;
  padding: 0;
 }

 .p-card .p-card-footer {
    padding: 0 !important; 
}

.col-12 {
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal__dialog{
    max-width: 500px !important;
}

</style>