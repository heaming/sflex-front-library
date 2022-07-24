import { getCssVar } from 'quasar';

export const compoMap = {
  bar: 'Bar',
  line: 'Line',
  pie: 'Pie',
  doughnut: 'Doughnut',
  spline: 'Line',
  gauge: 'Gauge',
  step: 'Line',
  areaSpline: 'Line',
};

// region [core options]
const defaultCoreChartOptions = {
  indexAxis: undefined, // 'x' | 'y'
  color: undefined, // Color
  backgroundColor: undefined,
  font: undefined, // {family, size, style, weight, lineHeight}
  responsive: true,
  maintainAspectRatio: true, // default true
  resizeDelay: 0, // number
  aspectRatio: undefined, // number
  locale: undefined, // todo
  onResize: undefined, // (chart: Chart, size: { width: number; height: number }): void;
  devicePixelRatio: undefined, // number
  hover: {
    mode: undefined, // index, dataset, point, nearest, x, y
    intersect: undefined, // boolean
    axis: undefined, // x, y, xy, r
    includeInvisible: false,
  }, // CoreInteractionOptions
  onHover: undefined, // (event: ChartEvent, elements: ActiveElement[], chart: Chart): void;
  onClick: undefined, // (event: ChartEvent, elements: ActiveElement[], chart: Chart): void;
  layout: undefined,
};
// endregion
// region [element options]
let datasetColors;
let datasetColorsAlpha50;
nextTick(() => {
  datasetColors = [
    getCssVar('chart-color-1'),
    getCssVar('chart-color-2'),
    getCssVar('chart-color-3'),
    getCssVar('chart-color-4'),
    getCssVar('chart-color-5'),
    getCssVar('chart-color-6'),
  ];
  datasetColorsAlpha50 = [
    getCssVar('chart-color-1-alpha50'),
    getCssVar('chart-color-2-alpha50'),
    getCssVar('chart-color-3-alpha50'),
    getCssVar('chart-color-4-alpha50'),
    getCssVar('chart-color-5-alpha50'),
    getCssVar('chart-color-6-alpha50'),
  ];
});
const defaultColor = (context) => {
  if (context.chart.data.datasets.length > 1) {
    return datasetColors[context.datasetIndex % datasetColors.length];
  }
  return datasetColors[context.dataIndex % datasetColors.length];
};

const defaultCommonElementOptions = {
  borderWidth: undefined, // Number
  borderColor: defaultColor,
  backgroundColor: (context) => {
    if (context.chart.data.datasets.length > 1) {
      return datasetColors[context.datasetIndex % datasetColors.length];
    }
    return datasetColors[context.dataIndex % datasetColors.length];
  },
};
const defaultElementOptions = {
  bar: {
    ...defaultCommonElementOptions,
    base: undefined, // number;
    borderSkipped: 'start',
    // 'start' | 'end' | 'left' | 'right' | 'bottom' | 'top' | 'middle' | false;
    borderRadius: undefined,
    // number |
    // { topLeft?: number, topRight?: number, bottomLeft?: number, bottomRight?: number };
    inflateAmount: undefined, //  number | 'auto';
    borderWidth: undefined,
    // number | { top?: number, right?: number, bottom?: number, left?: number };
  },
  arc: {
    ...defaultCommonElementOptions,
    borderColor: undefined, // look at me!
    borderAlign: undefined, // 'center' | 'inner';
    borderJoinStyle: undefined, // CanvasLineJoin;
    borderRadius: undefined, // number | ArcBorderRadius;
    offset: undefined, // number;
  },
  line: {
    ...defaultCommonElementOptions,
    // todo
    borderCapStyle: undefined, // // CanvasLineCap;
    borderDash: undefined, // number[];
    borderDashOffset: undefined, // number;
    borderJoinStyle: undefined, // CanvasLineJoin;
    capBezierPoints: undefined, // boolean;
    cubicInterpolationMode: undefined, // 'default' | 'monotone';
    tension: undefined, //  number;
    stepped: undefined, // 'before' | 'after' | 'middle' | boolean;
    fill: undefined, // FillTarget | ComplexFillTarget;
    // number | string | { value: number } |
    // 'start' | 'end' | 'origin' | 'stack' | 'shape' | boolean;
    // { target: FillTarget, above: number, below number}
    spanGaps: undefined, // boolean | number;
    segment: {
      backgroundColor: undefined, //
      borderColor: undefined, //
      borderCapStyle: undefined, //
      borderDash: undefined, //
      borderDashOffset: undefined, //
      borderJoinStyle: undefined, //
      borderWidth: undefined, //
    },
  },
  point: {
    ...defaultCommonElementOptions,
    radius: undefined, // number;
    hitRadius: undefined, // number;
    pointStyle: undefined, // PointStyle;
    rotation: undefined, // number;
    drawActiveElementsOnTop: undefined, // boolean;
  },
};
const defaultCommonHoverOptions = {
  hoverBorderWidth: 2, // number;
  hoverBorderColor: '#000000', // Color;
  hoverBackgroundColor: undefined, // Color;
};
const defaultElementHoverOptions = {
  bar: {
    ...defaultCommonHoverOptions,
    hoverBorderRadius: undefined, // Color;
  },
  arc: {
    ...defaultCommonHoverOptions,
    hoverOffset: undefined, // number;
  },
  line: {
    ...defaultCommonHoverOptions,
    hoverBorderCapStyle: undefined, // CanvasLineCap;
    hoverBorderDash: undefined, // number[];
    hoverBorderDashOffset: undefined, // number;
    hoverBorderJoinStyle: undefined, // CanvasLineJoin;
  },
  point: {
    ...defaultCommonHoverOptions,
    hoverRadius: undefined, // number;
  },
};
const defaultPointPrefixedOptions = {
  pointBackgroundColor: undefined, // Color;
  pointBorderColor: undefined, // Color;
  pointBorderWidth: undefined, // number
  pointHitRadius: undefined, // number;
  pointRadius: undefined, // number;
  pointRotation: undefined, // number;
  pointStyle: undefined,
  // | 'circle'
  // | 'cross'
  // | 'crossRot'
  // | 'dash'
  // | 'line'
  // | 'rect'
  // | 'rectRounded'
  // | 'rectRot'
  // | 'star'
  // | 'triangle'
  // | HTMLImageElement
  // | HTMLCanvasElement;
};
const defaultPointPrefixedHoverOptions = {
  pointHoverBackgroundColor: undefined, // Color;
  pointHoverBorderColor: undefined, // Color;
  pointHoverBorderWidth: undefined, // number;
  pointHoverRadius: undefined, // number;
};
const defaultPointPrefixedElementOptions = {
  ...defaultPointPrefixedOptions,
  ...defaultPointPrefixedHoverOptions,
};

const defaultBarElementOptions = {
  ...defaultElementOptions.bar,
  ...defaultElementHoverOptions.bar,
};
const defaultLineElementOptions = {
  ...defaultElementOptions.line,
  ...defaultElementHoverOptions.line,
};
const defaultArcElementOptions = {
  ...defaultElementOptions.arc,
  ...defaultElementHoverOptions.arc,
};
// endregion
// region [plugins options]
const defaultDoughnutDatalabelsOptions = {
  color: 'rgb(255, 255, 255)',
  font: (context) => ({
    ...context.chart.options.font,
    size: Math.min(context.chart.ctx.canvas.width, context.chart.ctx.canvas.height) * 0.025,
  }),
  display: true,
  formatter: (value, context) => {
    if (!value) {
      return '';
    }
    if (Array.isArray(context.dataset.data)
      && (context.chart.options.percentage || context.dataset.percentage)
      && typeof context.dataset.data[0] === 'number') {
      const sum = context.dataset.data.reduce((a, b) => a + b, 0);
      return `${Math.round((value * 100) / sum)}%`;
    }
    return value;
  },
};
const defaultPluginsOption = {
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      color: 'rgb(128, 128, 128, 0.8)',
    },
  },
  datalabels: false,
  tooltip: {
    // todo
  },
};
// endregion
// region [datasets options]
const defaultControllerDatasetOptions = {
  indexAxis: undefined, // 'x' | 'y'
  clip: undefined, // number
  label: undefined, // string
  order: undefined, // number,
  stack: undefined, // string (stack group id);
  hidden: false, // boolean;
};
// endregion
// region [scale options]
const defaultCoreScaleOptions = {
  display: undefined, // boolean | 'auto';
  alignToPixels: undefined, // boolean;
  reverse: undefined, // boolean;
  weight: undefined, // number;
  beforeUpdate: undefined, // (axis: Scale): void;
  beforeSetDimensions: undefined, // (axis: Scale): void;
  afterSetDimensions: undefined, // (axis: Scale): void;
  beforeDataLimits: undefined, // (axis: Scale): void;
  afterDataLimits: undefined, // (axis: Scale): void;
  beforeBuildTicks: undefined, // (axis: Scale): void;
  afterBuildTicks: undefined, // (axis: Scale): void;
  beforeTickToLabelConversion: undefined, // (axis: Scale): void;
  afterTickToLabelConversion: undefined, // (axis: Scale): void;
  beforeCalculateLabelRotation: undefined, // (axis: Scale): void;
  afterCalculateLabelRotation: undefined, // (axis: Scale): void;
  beforeFit: undefined, // (axis: Scale): void;
  afterFit: undefined, // (axis: Scale): void;
  afterUpdate: undefined, // (axis: Scale): void;
};
// eslint-disable-next-line no-unused-vars
const defaultGridLineOptions = {
  display: undefined, // boolean;
  borderColor: undefined, // Color,
  borderWidth: undefined, // number,
  circular: undefined, // boolean
  color: undefined, // ScriptableAndArray<Color, ScriptableScaleContext>;
  borderDash: undefined, // number[];
  borderDashOffset: undefined, // Scriptable<number, ScriptableScaleContext>;
  lineWidth: undefined, // ScriptableAndArray<number, ScriptableScaleContext>;
  drawBorder: undefined, // boolean;
  drawOnChartArea: undefined, // boolean;
  drawTicks: undefined, // boolean;
  tickBorderDash: undefined, // number[];
  tickBorderDashOffset: undefined, // Scriptable<number, ScriptableScaleContext>;
  tickColor: undefined, // ScriptableAndArray<Color, ScriptableScaleContext>;
  tickLength: undefined, // number;
  tickWidth: undefined, // number;
  offset: undefined, // boolean;
  z: undefined, // number;
};
const defaultTickOptions = {
  backdropColor: undefined,
  backdropPadding: undefined,
  callback: undefined,
  display: undefined,
  color: undefined,
  font: undefined,
  padding: undefined,
  showLabelBackdrop: undefined,
  textStrokeColor: undefined,
  textStrokeWidth: undefined,
  z: undefined,
  major: undefined,
};
// eslint-disable-next-line no-unused-vars
const defaultCartesianTickOptions = {
  ...defaultTickOptions,
  sampleSize: undefined,
  align: undefined, // Align | 'inner';
  autoSkip: undefined, // boolean;
  autoSkipPadding: undefined, // number;
  crossAlign: undefined, // 'near' | 'center' | 'far';
  includeBounds: undefined, // boolean;
  labelOffset: undefined, // number;
  minRotation: undefined, // number;
  maxRotation: undefined, // number;
  mirror: undefined, // boolean;
  maxTicksLimit: undefined, // number;
};
// const defaultRadialTickOptions = {
//   ...defaultTickOptions,
//   format: undefined, // Intl.NumberFormatOptions;
//   maxTicksLimit: undefined, // number;
//   precision: undefined, // number;
//   stepSize: undefined, // number;
//   count: undefined, // number;
// };
const defaultCartesianScaleOptions = {
  ...defaultCoreScaleOptions,
  bounds: undefined, // 'ticks' | 'data';
  position: undefined, // 'left' | 'top' | 'right' | 'bottom' | 'center'
  // | { [scale: string]: number };
  stack: undefined, // string;
  stackWeight: undefined, // number;
  axis: undefined, // 'x' | 'y';
  min: undefined, // number;
  max: undefined, // number;
  offset: undefined, // boolean;
  grid: undefined,
  title: undefined,
  // {
  //   display: undefined, // boolean;
  //   align: undefined, // Align;
  //   text: undefined, // string | string[];
  //   color: undefined, // Color;
  //   font: undefined, // FontSpec.
  //   padding: undefined, // number | { top: number; bottom: number;y: number;};
  // },
  stacked: undefined,
  ticks: undefined,
};
// eslint-disable-next-line no-unused-vars
const defaultLinearScaleOptions = {
  ...defaultCartesianScaleOptions,
  beginAtZero: undefined, // boolean;
  // if true, scale will include 0 if it is not already included
  suggestedMin: undefined, // number
  suggestedMax: undefined, // number
  grace: undefined, // 'number%' | number
  ticks: undefined,
};
// endregion

export const optionsMap = {
  bar: {
    ...defaultCoreChartOptions,
    elements: {
      bar: defaultBarElementOptions,
    },
    plugins: {
      ...defaultPluginsOption,
    },
    datasets: {
      bar: {
        ...defaultControllerDatasetOptions,
        // ...defaultElementOptions.bar,
        // ...defaultElementHoverOptions.bar,

        // animation options
        animation: {
          duration: undefined,
          easing: undefined,
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default') {
              delay = context.dataIndex * context.chart.data.datasets.length * 100
                + context.datasetIndex * 100;
            }
            return delay;
          },
          loop: false,
        },
        animations: undefined,
        transitions: undefined,

        xAxisID: undefined,
        yAxisID: undefined,
        barPercentage: undefined, // 0~1
        categoryPercentage: undefined, // 0~1
        barThickness: undefined, // number
        maxBarThickness: undefined,
        minBarLength: undefined,
        pointStyle: undefined,
      },
    },
    scales: {
      y: {
        type: 'linear', // linear, logarithmic, category, time, timeseries
        ...defaultLinearScaleOptions, // todo make defaults for others.
        beginAtZero: true,
      },
    },
    skipNull: false,
  },
  line: {
    ...defaultCoreChartOptions,
    elements: {
      line: {
        ...defaultLineElementOptions,
        tension: 0,
      },
    },
    plugins: {
      ...defaultPluginsOption,
    },
    datasets: {
      line: {
        ...defaultControllerDatasetOptions,
        ...defaultPointPrefixedElementOptions,

        // animation options
        animation: undefined,
        animations: undefined,
        transitions: undefined,

        xAxisID: undefined,
        yAxisID: undefined,
        // spanGaps: undefined,
        // showLine: undefined,
      },
    },
    scales: {
      y: {
        ...defaultLinearScaleOptions,
        // grace: '10%',
        suggestedMin: 0,
      },
    },
    spanGaps: undefined,
    showLine: true,
  },
  pie: {
    ...defaultCoreChartOptions,
    elements: {
      arc: defaultArcElementOptions,
    },
    plugins: {
      ...defaultPluginsOption,
      datalabels: {
        ...defaultDoughnutDatalabelsOptions,
        align: 'start',
        offset: (context) => (-1)
          * Math.min(context.chart.ctx.canvas.width, context.chart.ctx.canvas.height) * 0.06,
      },
    },
    datasets: {
      pie: {
        ...defaultControllerDatasetOptions,
        // ...defaultElementOptions.arc,
        // ...defaultElementHoverOptions.arc,

        // animation options
        animation: undefined,
        animations: undefined,
        transitions: undefined,

        circumference: undefined, // number
        offset: undefined, // number
        rotation: undefined, // number
        weight: undefined, // number
        spacing: undefined, // number
      },
    },
    scales: undefined,
    circumference: undefined, // number;
    cutout: undefined, // Scriptable<number | string, ScriptableContext<'doughnut'>>;
    offset: undefined, // number;
    radius: undefined, // Scriptable<number | string, ScriptableContext<'doughnut'>>;
    rotation: undefined, // number;
    spacing: undefined, // number;
    animation: {
      animateRotate: false,
      animateScale: true,
    }, // false | DoughnutAnimationOptions;
  },
  doughnut: {
    ...defaultCoreChartOptions,
    elements: {
      arc: defaultArcElementOptions,
    },
    plugins: {
      ...defaultPluginsOption,
      datalabels: defaultDoughnutDatalabelsOptions,
    },
    datasets: {
      doughnut: {
        ...defaultControllerDatasetOptions,
        // ...defaultElementOptions.arc,
        // ...defaultElementHoverOptions.arc,

        // animation options
        animation: undefined,
        animations: undefined,
        transitions: undefined,

        circumference: undefined, // number
        offset: undefined, // number
        rotation: undefined, // number
        weight: undefined, // number
        spacing: undefined, // number
      },
    },
    scales: undefined,
    circumference: undefined, // number;
    cutout: undefined, // Scriptable<number | string, ScriptableContext<'doughnut'>>;
    offset: undefined, // number;
    radius: undefined, // Scriptable<number | string, ScriptableContext<'doughnut'>>;
    rotation: undefined, // number;
    spacing: undefined, // number;
    animation: {
      animateRotate: true,
      animateScale: false,
    }, // false | DoughnutAnimationOptions;
    percentage: false,
  },
  spline: {
    ...defaultCoreChartOptions,
    elements: {
      line: {
        ...defaultLineElementOptions,
        tension: 0.5,
      },
    },
    plugins: {
      ...defaultPluginsOption,
    },
    datasets: {
      line: {
        ...defaultControllerDatasetOptions,
        ...defaultPointPrefixedElementOptions,

        // animation options
        animation: undefined,
        animations: undefined,
        transitions: undefined,

        xAxisID: undefined,
        yAxisID: undefined,
        // spanGaps: undefined,
        // showLine: undefined,
      },
    },
    scales: undefined,

    spanGaps: undefined,
    showLine: true,
  },
  gauge: {
    ...defaultCoreChartOptions,
    elements: {
      arc: {
        ...defaultArcElementOptions,
        borderWidth: 0,
        hoverBorderWidth: 0,
      },

    },
    plugins: {
      ...defaultPluginsOption,
      legend: false,
      filler: false,
      datalabels: false,
      tooltip: false,
    },
    datasets: {
      doughnut: {
        ...defaultControllerDatasetOptions,
        // ...defaultElementOptions.arc,
        // ...defaultElementHoverOptions.arc,

        // animation options
        animation: undefined,
        animations: undefined,
        transitions: undefined,

        circumference: undefined, // number
        offset: undefined, // number
        rotation: undefined, // number
        weight: undefined, // number
        spacing: undefined, // number
      },
    },
    scales: undefined,
    circumference: undefined, // number;
    cutout: undefined, // Scriptable<number | string, ScriptableContext<'doughnut'>>;
    offset: undefined, // number;
    radius: undefined, // Scriptable<number | string, ScriptableContext<'doughnut'>>;
    rotation: undefined, // number;
    spacing: undefined, // number;
    animation: {
      animateRotate: true,
      animateScale: false,
    }, // false | DoughnutAnimationOptions;

    gaugeColor: (context) => {
      if (context.chart.data.datasets.length > 1) {
        return datasetColors[context.datasetIndex % datasetColors.length];
      }
      return 'black';
    },
  },
  step: {
    ...defaultCoreChartOptions,
    elements: {
      line: {
        ...defaultLineElementOptions,
        tension: 0,
        stepped: 'middle',
      },
    },
    plugins: {
      ...defaultPluginsOption,
    },
    datasets: {
      line: {
        ...defaultControllerDatasetOptions,
        ...defaultPointPrefixedElementOptions,
        pointRadius: 0,
        pointHitRadius: 0,

        // animation options
        animation: undefined,
        animations: undefined,
        transitions: undefined,

        xAxisID: undefined,
        yAxisID: undefined,
        // spanGaps: undefined,
        // showLine: undefined,
      },
    },
    scales: undefined,
    spanGaps: undefined,
    showLine: true,
  },
  areaSpline: {
    ...defaultCoreChartOptions,
    elements: {
      line: {
        ...defaultLineElementOptions,
        tension: 0.5,
        backgroundColor: (context) => datasetColorsAlpha50[
          context.datasetIndex % datasetColors.length
        ],
        fill: 'start',
      },
    },
    plugins: {
      ...defaultPluginsOption,
    },
    datasets: {
      line: {
        ...defaultControllerDatasetOptions,
        ...defaultPointPrefixedElementOptions,

        // animation options
        animation: undefined,
        animations: undefined,
        transitions: undefined,

        xAxisID: undefined,
        yAxisID: undefined,
        // spanGaps: undefined,
        // showLine: undefined,
      },
    },
    scales: undefined,

    spanGaps: undefined,
    showLine: true,
  },
};
