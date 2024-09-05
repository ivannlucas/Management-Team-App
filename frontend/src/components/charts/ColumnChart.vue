<template>
    <div class="chart_cont">
      <div id="ColumnChartdiv" class="chartdiv"></div>
    </div>
</template>


<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

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
     * - Recupera el nombre del equipo y la lista de partidos usando servicios.
     * - Calcula el número de victorias, empates y derrotas del equipo.
     * - Configura y muestra un gráfico de columnas utilizando la librería amCharts.
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

            let victorias = 0;
            let empates = 0;
            let derrotas = 0;

            partidos.forEach((partido) => {
                // Verificar si el equipo es parte del partido como local o visitante
                if (partido.equipo_local_id === equipoId || partido.equipo_visitante_id === equipoId) {
                    if (partido.estado === 'FINALIZADO') {
                        if (partido.goles_equipo_local === partido.goles_equipo_visitante) {
                            empates++;
                        } else {
                            if (equipoId === partido.equipo_local_id) {
                                if (partido.goles_equipo_local > partido.goles_equipo_visitante) {
                                    victorias++;
                                } else {
                                    derrotas++;
                                }
                            } else if (equipoId === partido.equipo_visitante_id) {
                                if (partido.goles_equipo_visitante > partido.goles_equipo_local) {
                                    victorias++;
                                } else {
                                    derrotas++;
                                }
                            }
                        }
                    }
                }
            });

            // Ahora tienes las cuentas, puedes crear tu array de datos
            const data = [
                { resultado: "Victorias", num_partidos: victorias },
                { resultado: "Empates", num_partidos: empates },
                { resultado: "Derrotas", num_partidos: derrotas },
            ];

            // Crear la instancia del root con el id que hayamos puesto en el div
            const root = am5.Root.new("ColumnChartdiv");
            root.setThemes([am5themes_Animated.new(root)]);

            // Crear una instancia de XYChart
            const chart = root.container.children.push(
                am5xy.XYChart.new(root, {})
            );

            // Crear los ejes X y Y
            const xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    categoryField: "resultado",
                    renderer: am5xy.AxisRendererX.new(root, {}),
                    tooltip: am5.Tooltip.new(root, {})
                })
            );

            xAxis.data.setAll(data);

            const yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    min: 0,
                    extraMax: 10,
                    renderer: am5xy.AxisRendererY.new(root, {})
                })
            );

            // Crear la serie de columnas
            const series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: "Diagrama Columnas",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "num_partidos",
                    categoryXField: "resultado",
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "Nº de {categoryX}: {valueY} {info}"
                    })
                })
            );

            series.columns.template.setAll({
                tooltipY: am5.percent(10),
                templateField: "columnSettings"
            });

            series.data.setAll(data);

            // Configurar el cursor del gráfico
            chart.set("cursor", am5xy.XYCursor.new(root, {}));

            // Agregar leyenda
            const legend = chart.children.push(
                am5.Legend.new(root, {
                    centerX: am5.p50,
                    x: am5.p50
                })
            );
            legend.data.setAll(chart.series.values);

            // Animar el gráfico al cargar
            chart.appear(1000, 100);
            series.appear();  

        } catch (error) {
            console.error("Error al cargar los datos de resultados:", error);
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