<template>
  <div class="row test-grey-back">
    <div class="col-6 bar">
      <q-expansion-item
        icon="star"
        label="Bar Chart"
        class="hp-rand-bgc-1 rounded-borders"
        style="margin: 5px;"
        :default-opened="defaultOpened"
      >
        <q-card>
          <q-card-section>
            <kw-chart
              :data="numbersChartData"
            />
          </q-card-section>
          <q-card-actions>
            <q-btn
              dense
              @click="testMethod"
            >
              test
            </q-btn>
          </q-card-actions>
        </q-card>
        <!--  </q-expansion-item>-->
      </q-expansion-item>
    </div>
    <div class="col-6 line">
      <q-expansion-item
        icon="star"
        label="Line Chart"
        class="hp-rand-bgc-2 rounded-borders"
        style="margin: 5px;"
        :default-opened="defaultOpened"
      >
        <q-card>
          <q-card-section>
            <kw-chart
              type="line"
              :data="numbersChartData"
            />
          </q-card-section>
          <q-card-actions>
            <q-btn
              dense
              @click="testMethod"
            >
              test
            </q-btn>
          </q-card-actions>
        </q-card>
        <!--  </q-expansion-item>-->
      </q-expansion-item>
    </div>
    <div class="col-6 pie">
      <q-expansion-item
        icon="star"
        label="Pie Chart"
        class="hp-rand-bgc-3 rounded-borders"
        style="margin: 5px;"
        :default-opened="defaultOpened"
      >
        <q-card>
          <q-card-section>
            <kw-chart
              type="pie"
              :data="nullableChartData"
            />
          </q-card-section>
          <q-card-actions>
            <q-btn
              dense
              @click="testMethod"
            >
              test
            </q-btn>
          </q-card-actions>
        </q-card>
        <!--  </q-expansion-item>-->
      </q-expansion-item>
    </div>
    <div class="col-6 doughnut">
      <q-expansion-item
        icon="star"
        label="Doughnut Chart"
        class="hp-rand-bgc-4 rounded-borders"
        style="margin: 5px;"
        :default-opened="defaultOpened"
      >
        <q-card>
          <q-card-section>
            <kw-chart
              type="doughnut"
              :data="nullableChartData"
            />
          </q-card-section>
          <q-card-actions>
            <q-btn
              dense
              @click="testMethod"
            >
              test
            </q-btn>
          </q-card-actions>
        </q-card>
        <!--  </q-expansion-item>-->
      </q-expansion-item>
    </div>
    <div class="col-6 spline">
      <q-expansion-item
        icon="star"
        label="Spline Chart"
        class="hp-rand-bgc-5 rounded-borders"
        style="margin: 5px;"
        :default-opened="defaultOpened"
      >
        <q-card>
          <q-card-section>
            <kw-chart
              type="spline"
              :data="numbersChartData"
            />
          </q-card-section>
          <q-card-actions>
            <q-btn
              dense
              @click="testMethod"
            >
              test
            </q-btn>
          </q-card-actions>
        </q-card>
        <!--  </q-expansion-item>-->
      </q-expansion-item>
    </div>
    <div class="col-6 gauge">
      <q-expansion-item
        icon="star"
        label="Gauge Chart"
        class="hp-rand-bgc-5 rounded-borders"
        style="margin: 5px;"
        :default-opened="false"
      >
        <q-card>
          <q-card-section>
            <kw-chart
              type="gauge"
              :data="gaugeChartData"
            />
          </q-card-section>
          <q-card-actions>
            <q-btn
              dense
              @click="testMethod"
            >
              test
            </q-btn>
          </q-card-actions>
        </q-card>
        <!--  </q-expansion-item>-->
      </q-expansion-item>
    </div>
    <div class="col-6 step">
      <q-expansion-item
        icon="star"
        label="Step Chart"
        class="hp-rand-bgc-5 rounded-borders"
        style="margin: 5px;"
        :default-opened="defaultOpened"
      >
        <q-card>
          <q-card-section>
            <kw-chart
              type="step"
              :data="numbersChartData"
            />
          </q-card-section>
          <q-card-actions>
            <q-btn
              dense
              @click="testMethod"
            >
              test
            </q-btn>
          </q-card-actions>
        </q-card>
        <!--  </q-expansion-item>-->
      </q-expansion-item>
    </div>
    <div class="col-6 area-spline">
      <q-expansion-item
        icon="star"
        label="Area Spline Chart"
        class="hp-rand-bgc-5 rounded-borders"
        style="margin: 5px;"
        :default-opened="defaultOpened"
      >
        <q-card>
          <q-card-section>
            <kw-chart
              type="areaSpline"
              :data="numbersChartData"
            />
          </q-card-section>
          <q-card-actions>
            <q-btn
              dense
              @click="testMethod"
            >
              test
            </q-btn>
          </q-card-actions>
        </q-card>
        <!--  </q-expansion-item>-->
      </q-expansion-item>
    </div>
    <div class="col-6 test">
      <q-expansion-item
        icon="star"
        label="test Chart"
        class="hp-rand-bgc-5 rounded-borders"
        style="margin: 5px;"
        :default-opened="true"
      >
        <q-card>
          <q-card-section>
            <kw-chart
              type="gauge"
              :data="testChartData"
              :options="testOptions"
              :width="100"
              :height="100"
            />
          </q-card-section>
          <q-card-actions>
            <q-btn
              dense
              @click="testMethod"
            >
              test
            </q-btn>
          </q-card-actions>
        </q-card>
        <!--  </q-expansion-item>-->
      </q-expansion-item>
    </div>
  </div>
</template>

<script>

export default {
  name: 'KwChartM',
  setup() {
    const testRef = ref(null);

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
          startValue: -50,
          endValue: 50,
        },
        // {
        //   label: 'Data two',
        //   data: [30, 15, 70, 40, 40, 50],
        // },
      ],
    };

    const testChartData = reactive({
      // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Data One',
          data: [55, 34, 40],
          gaugeOnArc: true,
        },
        {
          label: 'Data two',
          data: [40, 20, 55],
          gaugeOnArc: true,
        },
        {
          label: 'Data three',
          data: [55, 34, 40],
          gaugeOnArc: true,
        },
        // {
        //   label: 'Data four',
        //   data: [40, 20, 55, 34, 40, 42],
        // },
        // {
        //   label: 'Data five',
        //   data: [40, 20, 55, 34, 40, 42],
        // },
        // {
        //   data: [40, 20, 55, 34, 40, 42],
        // },
        // {
        //   data: [40, 20, 55, 34, 40, 42],
        // },
        // {
        //   data: [40, 20, 55, 34, 40, 42],
        // },
        // {
        //   data: [40, 20, 55, 34, 40, 42],
        // },
      ],
      gaugeOnArc: true,
    });
    const testOptions = {
      // scales: {
      //   x: {
      //     // beginAtZero: true,
      //     min: 0,
      //     max: 8,
      //     // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      //     // labels: Array.from({ length: 6 }, (v, k) => k),
      //   },
      //   y: {
      //     // type: 'time',
      //     beginAtZero: true,
      //     // suggestedMin: 0,
      //     // suggestedMax: 100,
      //     grid: {
      //       // display: false,
      //       // borderDash: [10, 10, 10],
      //       // borderColor: '#ee33ee',
      //       // borderWidth: 4,
      //     }, // GridLineOptions;
      //   },
      // },
    };
    function testMethod() {
      for (let i = 0; i < testChartData.datasets.length; i += 1) {
        testChartData.datasets[i].data = Array.from({ length: 3 }, () => Math.random() * 100);
      }
    }

    return {
      testRef,
      testMethod,
      numbersChartData,
      scaledChartData,
      nullableChartData,
      gaugeChartData,
      splineChartData,
      oneChartData,
      testChartData,
      testOptions,
      defaultOpened: false,
    };
  },
};
</script>

<style lang="scss">
.test-grey-back {
  background-color: $grey-3;
}
</style>
