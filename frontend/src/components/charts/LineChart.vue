<template>
    <div class="chart_cont">
      <div id="LineChartdiv" class="chartdiv"></div>
    </div>
</template>


<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import PartidosService from "../../services/partidos/partidos.service";
import EquipoService from "../../services/equipo/equipo.service";
import EstadisticasPartidosService from "../../services/estadisticasPartido/estadisticasPartido.service";

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
     * - Calcula la posesión del balón en cada partido y construye un gráfico de línea mostrando la evolución de la posesión por jornada.
     * - Configura y muestra un gráfico de líneas utilizando la librería amCharts.
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

            let data = [];
            let i = 0;
            
            for (const partido of partidos) {
                // Verificar si el equipo es parte del partido como local o visitante
                if (partido.equipo_local_id === equipoId || partido.equipo_visitante_id === equipoId) {
                    i++;
                    if (partido.estado === 'FINALIZADO') {
                        // Cargar estadísticas del partido si es necesario
                        if (partido.estadisticas_partido_id) {
                            const estadisticas = await EstadisticasPartidosService.getEstadisticasPartidoById(partido.estadisticas_partido_id);
                            if (nombreEquipo === partido.equipo_local_nombre) {
                                data.push({
                                    jornada: i,
                                    posesion: estadisticas.posesion_balon_equipo_local
                                });
                            } else if (nombreEquipo === partido.equipo_visitante_nombre) {
                                data.push({
                                    jornada: i,
                                    posesion: estadisticas.posesion_balon_equipo_visitante
                                });
                            }
                        }
                    }
                }
            }

            // Crear la instancia del root con el id que hayamos puesto en el div
            const root = am5.Root.new("LineChartdiv");

            console.log("instancia Root creada");

            root.setThemes([am5themes_Animated.new(root)]);

            // Crear una instancia de XYChart
            const chart = root.container.children.push(
                am5xy.XYChart.new(root, {})
            );

            // CREAR LOS EJES
            // Crear ejes X (CategoryAxis)
            const xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    categoryField: "jornada",
                    renderer: am5xy.AxisRendererX.new(root, {}),
                    tooltip: am5.Tooltip.new(root, {})
                })
            );

            xAxis.data.setAll(data);

            // Crear ejes Y (ValueAxis)
            const yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    min: 0,
                    max: 100,
                    extraMax: 0.5,
                    renderer: am5xy.AxisRendererY.new(root, {})
                })
            );

            // CREACION DE LA SERIE
            // El gráfico XY necesita al menos una serie para mostrar los datos.
            const series = chart.series.push(
                am5xy.LineSeries.new(root, {
                    name: "Predicted Value",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "posesion",
                    categoryXField: "jornada",
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "Jornada {categoryX}: {valueY}% de posesion"
                    })
                })
            );

            series.strokes.template.setAll({
                strokeWidth: 3,
                templateField: "strokeSettings"
            });

            series.data.setAll(data);

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    sprite: am5.Circle.new(root, {
                        strokeWidth: 3,
                        stroke: series.get("stroke"),
                        radius: 2.5,
                        fill: root.interfaceColors.get("background")
                    })
                });
            });

            chart.set("cursor", am5xy.XYCursor.new(root, {}));

            // Añadir leyenda
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
            console.error("Error al cargar los datos de posesión:", error);
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