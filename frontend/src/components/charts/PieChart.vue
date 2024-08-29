<template>
    <div class="chart_cont">
      
      <div id="PieChartdiv" class="chartdiv"></div>
    </div>
</template>


<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";

import PartidosService from "../../services/partidos/partidos.service";
import EquipoService from "../../services/equipo/equipo.service";

export default {
    /**
     * Nombre del componente.
     * @type {string}
     */
    name: "LineChart",

    /**
     * Datos reactivos del componente.
     * @returns {Object} Los datos del componente.
     */
    data() {
        return {};
    },

    /**
     * Componentes que pueden ser utilizados dentro de este componente.
     * @type {Object}
     */
    components: {},

    /**
     * Props que recibe el componente.
     * @type {Object}
     */
    props: {},

    /**
     * Métodos disponibles en este componente.
     * @type {Object}
     */
    methods: {},

    /**
     * Hook de ciclo de vida que se ejecuta cuando el componente ha sido montado.
     * Realiza las siguientes tareas:
     * - Obtiene el ID del equipo desde el estado de Vuex.
     * - Recupera el nombre del equipo y la lista de partidos utilizando servicios.
     * - Calcula los goles a favor y en contra en los partidos finalizados.
     * - Configura y muestra un gráfico de pastel utilizando la librería amCharts.
     */
    async mounted() {
        try {
            // Obtener el equipoId del estado
            const equipoId = this.$store.state.auth.usuario.detalles.equipo_id;

            // Obtener el nombre del equipo usando un servicio
            const equipo = await EquipoService.getEquipoById(equipoId);
            const nombreEquipo = equipo.nombre_equipo; // Asumiendo que el campo se llama "nombre_equipo"

            // Obtener todos los partidos desde el servicio
            const partidos = await PartidosService.getAllPartidos();

            let golesAFavor = 0;
            let golesEnContra = 0;

            partidos.forEach((partido) => {
                // Verificar si el equipo es parte del partido como local o visitante
                if (partido.equipo_local_id === equipoId || partido.equipo_visitante_id === equipoId) {
                    if (partido.estado === 'FINALIZADO') {
                        if (equipoId === partido.equipo_local_id) {
                            golesAFavor += Number(partido.goles_equipo_local);
                            golesEnContra += Number(partido.goles_equipo_visitante);
                        } else if (equipoId === partido.equipo_visitante_id) {
                            golesAFavor += Number(partido.goles_equipo_visitante);
                            golesEnContra += Number(partido.goles_equipo_local);
                        }
                    }
                }
            });

            // Crear el array de datos
            const data = [
                {
                    type: "Goles A Favor",
                    num_goles: golesAFavor,
                },
                {
                    type: "Goles En Contra",
                    num_goles: golesEnContra,
                }
            ];

            // Crear la instancia del root con el id que hayamos puesto en el div
            const root = am5.Root.new("PieChartdiv");

            // Crear una instancia de PieChart
            let chart = root.container.children.push(
                am5percent.PieChart.new(root, {})
            );

            // CREACION DE LA SERIE
            // Crear una serie de gráfico de pastel
            let series = chart.series.push(
                am5percent.PieSeries.new(root, {
                    name: "Series",
                    categoryField: "type",
                    valueField: "num_goles"
                })
            );

            series.data.setAll(data);

            // Añadir leyenda
            const legend = chart.children.push(
                am5.Legend.new(root, {
                    centerX: am5.percent(50),
                    x: am5.percent(50),
                    layout: root.horizontalLayout
                })
            );
            legend.data.setAll(chart.series.values);

            // Hacer que la animación se cargue al iniciar
            chart.appear(1000, 100);
            series.appear();  

        } catch (error) {
            console.error("Error al cargar los datos de goles:", error);
        }
    },

    /**
     * Eventos emitidos por este componente.
     * @type {Array<string>}
     */
    emits: ["emits", "emits"],
}
</script>


<style scoped>
.chartdiv{
    width: 100%; 
    height: 400px !important;
    margin-bottom: 1em;
}
.chart_cont{
    width: 50%; 
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding: 1em;
    margin: 2em;
    /* display: flex; */
  
}
</style>