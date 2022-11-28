<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Chart
    </h2>
    <p class="kw-guide-description">
      차트
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="blindingProps"
        title="chartProps"
        :props="{
          type: { type: String, default: 'bar' },
          options: { type: Object, default: undefined },
          chartId: { type: String, default: undefined },
          width: { type: Number, default: undefined},
          height: {type: Number, default: undefined},
          cssClasses: {default: '', type: String},
          styles: {type: Object, default: undefined},
          plugins: {type: Array, default: () => []},
        }"
      />
      <kw-separator />
      <kw-chart
        v-bind="blindingProps"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
const numbersChartData = reactive({
  labels: ['January', 'February', 'March', 'april'],
  datasets: [
    {
      label: 'Data One',
      // backgroundColor: 'rgb(248,127,127,0.9)',
      // borderColor: 'rgb(248,127,127,0.9)',
      data: [40, 20, 12, 14],
    },
    {
      label: 'Data two',
      // backgroundColor: 'rgb(100,120,255,0.9)',
      // borderColor: 'rgb(100,120,255,0.9)',
      data: [10, 30, 22, 70],
    },
  ],
});
const scaledChartData = {
  labels: ['January', 'February', 'March'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: ['#f87979'],
      data: [40, 200, 5000],
    },
    {
      label: 'Data two',
      backgroundColor: ['#7799ff'],
      data: [10, 300, 2200],
    },
  ],
  scales: {
    y: {
      type: 'logarithmic',
    },
  },
};
const nullableChartData = {
  labels: ['January', 'February', 'March', 'april', 'may'],
  datasets: [
    {
      label: 'Data One',
      // backgroundColor: ['#f87979'],
      data: [40, 20, 34, 6, null, 15],
      percentage: true,
    },
  ],
};
const oneChartData = {
  labels: ['January'],
  datasets: [
    {
      label: 'Data One',
      data: [40, 100],
      startValue: -10,
      endValue: 150,
    },
  ],
};
const splineChartData = reactive({
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: ['#f87979'],
      data: [40, 20, 55, 34, 40, 42],
      tension: 0.5,
      fill: 'start',
      base: 0,
    },
  ],
});
const gaugeChartData = {
  datasets: [
    {
      label: 'Data One',
      data: [40],
      startValue: -40,
      endValue: undefined,
    },
    // {
    //   label: 'Data two',
    //   data: [30, 15, 70, 40, 40, 50],
    // },
  ],
};
const dataExamples = [
  numbersChartData,
  scaledChartData,
  nullableChartData,
  oneChartData,
  splineChartData,
  gaugeChartData,
];
const blindingProps = ref({
  data: dataExamples[0],
});

</script>
