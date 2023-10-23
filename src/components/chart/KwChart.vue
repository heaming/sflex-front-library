<template>
  <component
    :is="chartCompo"
    :ref="chartRef"
    class="kw-chart"
    :chart-data="chartData"
    :chart-options="chartOptions"
    :chart-id="chartId"
    :width="width"
    :height="height"
    :css-classes="cssClasses"
    :styles="styles"
  />
</template>

<script>
import { merge, cloneDeep } from 'lodash-es';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Bar, Line, Pie, Doughnut,
} from 'vue-chartjs';
import { optionsMap, compoMap } from './private/defaultConfig';
import Gauge from './private/guageChart';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  ChartDataLabels,
);

export default {
  name: 'KwChart',
  components: {
    Bar,
    Line,
    Pie,
    Doughnut,
    Gauge,
  },
  props: {
    type: {
      type: String,
      default: 'bar',
      validator(value) {
        return Object.keys(compoMap).includes(value);
      },
    },
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: undefined,
    },
    chartId: {
      type: String,
      default: undefined,
    },
    width: {
      type: Number,
      default: undefined,

    },
    height: {
      type: Number,
      default: undefined,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: undefined,
    },
  },
  setup(props) {
    const chartRef = ref(null);

    const labelsDefined = !!props.data.labels
      || !!props.data.parsing?.xAxisKey
      || !!props.data.datasets?.[0]?.data?.[0]?.x
      || !!props.options?.scales?.[0]?.labels
      || !!props.options?.scales?.[1]?.labels
      || !!props.options?.scales?.x?.labels
      || !!props.options?.parsing?.xAxisKey;
    let defaultLabels;
    if (!labelsDefined) {
      const maxDataLength = Math.max(...props.data.datasets.map((dataset) => dataset.data.length));
      defaultLabels = Array.from({ length: maxDataLength }, (v, k) => k);
    }

    const chartOptions = computed(() => {
      const typeOptions = cloneDeep(optionsMap[props.type] || {});
      if (props.options?.scales) {
        typeOptions.scales = props.options.scales;
      }
      return merge(typeOptions, props.options);
    });

    const chartData = computed(() => {
      const propsData = cloneDeep(props.data);
      return {
        labels: defaultLabels,
        ...propsData,
      };
    });

    return {
      chartRef,
      chartCompo: compoMap[props.type],
      chartData,
      chartOptions,
    };
  },
};
</script>
