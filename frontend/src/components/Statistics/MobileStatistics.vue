<template>
    <div>
        <h1>Estadisticas </h1>
        
        <div class="container_charts">  
            <ColumnChart/>
            <LineChart/>
            <PieChart/>
        </div>
        
    </div>
  
</template>

<script>
import ColumnChart from "@/components/charts/ColumnChart.vue"
import LineChart from "@/components/charts/LineChart.vue"
import PieChart from "@/components/charts/PieChart.vue";

export default {
  /**
   * Nombre del componente.
   * @type {String}
   */
  name: "Staticts",

  /**
   * Datos reactivos del componente.
   * @returns {Object} Objeto de datos.
   */
  data() {
    return {};
  },

  /**
   * Componentes hijos utilizados dentro de este componente.
   */
  components: {
    ColumnChart,
    LineChart,
    PieChart
  },

  /**
   * Propiedades que este componente espera recibir.
   */
  props: {},

  /**
   * Métodos del componente.
   */
  methods: {},

  /**
   * Eventos emitidos por este componente.
   */
  emits: ["emits", "emits"],
}
</script>


<style scoped>
.container_charts{
    display: flex;
    margin: 3rem;
}
/* .row{
    width: 100%;
} */
</style>