<!----------------------------------------------->
<!--                  TEMPLATE                 -->
<!----------------------------------------------->
<template>
    <transition name="fade">
      <div class="modal1" v-if="show">
        <div class="modal__backdrop" @click="closeModal()"/>
  
        <div class="modal__dialog">
          <div class="modal__header">
            <slot name="header"/>
            <button v-show="false" type="button" class="modal__close" @click="closeModal()">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                <path
                  fill="currentColor"
                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                ></path>
              </svg>
            </button>
          </div>
  
          <div class="modal__body" style="overflow:hidden">
            <slot name="body"/>
          </div>
  
          <div class="modal__footer">
            <slot name="footer"/>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <!----------------------------------------------->
  <!--                    SCRIPT                 -->
  <!----------------------------------------------->
  <script>
  var $ = require('jquery');
  
  export default {
      name: "Modal",
      data() {
          return {
              /**
               * Controla la visibilidad del modal.
               * @type {Boolean}
               */
              show: false
          };
      },
      props: {
          /**
           * Indica si la nota está activa o no.
           * @type {Boolean}
           */
          note: Boolean
      },
      methods: {
          /**
           * Cierra el modal y elimina la clase de desbordamiento del cuerpo del documento.
           */
          closeModal() {
              this.show = false;
              document.querySelector("body").classList.remove("overflow-hidden");
          },
          /**
           * Abre el modal y agrega la clase de desbordamiento al cuerpo del documento.
           */
          openModal() {
              this.show = true;
              document.querySelector("body").classList.add("overflow-hidden");
          },
          /**
           * Abre el modal y asocia un ID.
           * 
           * @param {String|Number} id - El ID asociado con el modal.
           */
          openModalId(id) {
              this.id = id;
              this.show = true;
              document.querySelector("body").classList.add("overflow-hidden");
          },
          /**
           * Abre el modal y asocia una fila de datos.
           * 
           * @param {Object} _row - La fila de datos que se asociará con el modal.
           */
          openModalRow(_row) {
              this.row = _row;
              this.show = true;
              document.querySelector("body").classList.add("overflow-hidden");
          },
      }
  };
  </script>
  
  
  <!----------------------------------------------->
  <!--                    STYLES                 -->
  <!----------------------------------------------->
  <style  scoped>
  .modal1 {
       overflow-x: hidden;
       overflow-y: auto;
       position: fixed;
       top: 0;
       right: 0;
       bottom: 0;
       left: 0;
       z-index: 9;
  }
   .modal__backdrop {
       background-color: rgba(0, 0, 0, 0.3);
       position: fixed;
       top: 0;
       right: 0;
       bottom: 0;
       left: 0;
       z-index: 1;
  }
   .modal__dialog {
       background-color: #fff;
       position: relative;
       max-width: 1000px;
       margin: 50px auto;
       display: flex;
       flex-direction: column;
       border-radius: 5px;
       z-index: 2;
  }
   @media screen and (max-width: 992px) {
       .modal__dialog {
           width: 90%;
      }
  }
   .modal__close {
       width: 30px;
       height: 30px;
  }
   .modal__header {
       padding: 20px 20px 10px;
       display: flex;
       align-items: flex-start;
       justify-content: space-between;
  }
   .modal__body {
       padding: 10px 20px 10px;
       overflow: auto;
       display: flex;
       flex-direction: column;
       align-items: stretch;
  }
   .modal__footer {
       padding: 10px 20px 20px;
  }
   .fade-enter-active, .fade-leave-active {
       transition: opacity 0.2s;
  }
   .fade-enter, .fade-leave-to {
       opacity: 0;
  }
  </style>