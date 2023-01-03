import { generateChart } from 'vue-chartjs';
import { ArcElement, Chart as ChartJS, DoughnutController, registerables } from 'chart.js';
import { cloneDeep } from 'lodash-es';

ChartJS.register(
  ...registerables,
);

export const toPercentage = (value, dimension) => (typeof value === 'string' && value.endsWith('%')
  ? parseFloat(value) / 100
  : value / dimension);

class GaugeChart extends DoughnutController {
  constructor(chart, datasetIndex) {
    super(chart, datasetIndex);

    this.startValue = undefined;
    this.showStartValue = undefined;
    this.endValue = undefined;
    this.showEndValue = undefined;
    this.remainColor = undefined;
    this.percentage = undefined;
    this.cutout = undefined;
    this.showGaugeValue = undefined;
    this.gaugeColor = undefined;
    this.gaugeOnArc = undefined;
    this.mainArc = undefined;
    this.remainArc = undefined;
    this._drawStartValue = undefined;
    this._drawEndValue = undefined;
    this._firstArcValue = undefined;
    this._totalDelta = undefined;
    this._portion = undefined;
  }

  update(mode) {
    super.update(mode);
    this.updateData();

    // hide redundant arcs
    const meta = this._cachedMeta;
    const elements = meta.data || [];
    for (let i = 1; i < elements.length; i += 1) {
      elements[i].hidden = true;
    }

    const { ctx } = this.chart;

    if (this.mainArc) {
      this.updateElement(this.mainArc, 1, {
        endAngle: Math.PI * (1 + this._portion),
      }, mode);
      this.mainArc.draw(ctx, this.chartArea);
    }

    if (this.remainArc) {
      this.updateElement(this.remainArc, 1, {
        startAngle: Math.PI * (1 + this._portion),
        endAngle: Math.PI * 2,
      }, mode);
      this.remainArc.draw(ctx, this.chartArea);
    }
  }

  draw() {
    this.startValue ??= this.options.startValue;
    this.showStartValue = !(this.options.showStartValue === false) && !(this.startValue === false);
    this.endValue ??= this.options.endValue;
    this.showEndValue = !(this.options.showEndValue === false) && !(this.endValue === false);
    this.remainColor ??= this.options.remainColor;
    this.percentage ??= this.options.percentage;
    this.cutout ??= this.options.cutout;
    this.showGaugeValue ??= this.options.showGaugeValue;
    this.gaugeColor ??= this.options.gaugeColor;
    this.gaugeOnArc ??= this.options.gaugeOnArc;

    const dataset = this.getDataset();
    const datasetsLength = this.chart.data.datasets.length;
    const datasetIndex = this.chart.data.datasets.indexOf(dataset);
    const meta = this._cachedMeta;
    const elements = meta.data || [];
    if (elements.length < 1) {
      return;
    }

    this.updateData();

    for (let i = 1; i < elements.length; i += 1) {
      elements[i].hidden = true;
    }

    // first draw
    if (!this.remainArc) {
      this.mainArc = elements[0];
      this.updateElement(this.mainArc, 1, {
        endAngle: Math.PI * (1 + this._portion),
      }, 'normal');
      this.remainArc = new ArcElement({
        ...cloneDeep(this.mainArc),
        endAngle: Math.PI * 2,
      });
      this.updateElement(this.remainArc, 1, {
        startAngle: Math.PI * (1 + this._portion),
      }, 'normal');
      this.remainArc.options.backgroundColor = this.remainColor;
    }

    super.draw();

    const { ctx } = this.chart;

    // this.mainArc.draw(ctx, this.chartArea);
    this.remainArc.draw(ctx, this.chartArea);

    ctx.save();

    const actualWidth = this.chart.chartArea.width;
    const actualHeight = this.chart.chartArea.height;
    const innerRadius = toPercentage(this.cutout, actualWidth / 2);
    const radiusWidth = (0.5 * (1 - innerRadius)) / datasetsLength;

    const fontFamily = 'Helvetica';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.gaugeColor;

    if (this.showGaugeValue && this.gaugeOnArc) {
      ctx.save();
      const percentage = Number((this._firstArcValue * 100) / this._totalDelta).toPrecision(3);
      const realValue = Number(this._drawStartValue) + Number(this._firstArcValue);

      const text = this.percentage ? `${percentage}%` : realValue;
      const spacing = 0.03 / datasetsLength;
      const fontAreaSize = radiusWidth - 2 * spacing;
      const centerFontSize = Math.floor(actualWidth * fontAreaSize);
      ctx.font = `${centerFontSize}px ${fontFamily}`;
      ctx.textBaseline = 'top';
      const textMetrics = ctx.measureText(text);
      const actualFontRatio = (textMetrics.actualBoundingBoxAscent
        + textMetrics.actualBoundingBoxDescent) / actualWidth;
      const offset = (1 + 2 * datasetIndex) * spacing
        + datasetIndex * fontAreaSize
        + ((fontAreaSize - actualFontRatio) / 2);

      ctx.fillText(
        text,
        actualWidth * 0.5,
        actualHeight * (0.5 - 0.25 + offset),
      );
      ctx.restore();
    }

    if (this.showGaugeValue && !this.gaugeOnArc) {
      ctx.save();
      const percentage = Number((this._firstArcValue * 100) / this._totalDelta).toPrecision(3);
      const realValue = Number(this._drawStartValue) + Number(this._firstArcValue);

      const text = this.percentage ? `${percentage}%` : realValue;
      const maxFontAreaHeight = innerRadius / 1.5;
      const baseFontSize = 0.1;
      const basePadding = 0.02;
      const fontAreaHeight = baseFontSize * datasetsLength + basePadding * (datasetsLength - 1);
      const fontSize = maxFontAreaHeight < fontAreaHeight
        ? baseFontSize * (maxFontAreaHeight / fontAreaHeight)
        : baseFontSize;
      const padding = maxFontAreaHeight < fontAreaHeight
        ? basePadding * (maxFontAreaHeight / fontAreaHeight)
        : basePadding;
      const actualFontAreaHeight = (datasetsLength * fontSize) + ((datasetsLength - 1) * padding);
      const offset = (-0.5) * actualFontAreaHeight
        + 0.5 * fontSize
        + (datasetIndex) * (fontSize + padding);

      const centerFontSize = Math.floor(actualWidth * fontSize);
      ctx.font = `${centerFontSize}px ${fontFamily}`;

      ctx.fillText(
        text,
        actualWidth * 0.5,
        actualHeight * (0.5 + 0.25 + offset),
      );
      ctx.restore();
    }

    const minMaxFontSize = Math.floor(actualWidth * 0.05);
    const padding = actualWidth * 0.02;
    ctx.font = `${minMaxFontSize}px ${fontFamily}`;

    if (this.showStartValue) {
      ctx.save();
      let text = `${this._drawStartValue}`;
      if (text.length > 5) {
        text = `${text.substring(0, 3)}...`;
      }
      const textMetrics = ctx.measureText(text);
      if (textMetrics.actualBoundingBoxLeft + textMetrics.actualBoundingBoxRight
        > actualWidth * radiusWidth) {
        const scaleDownRatio = (actualWidth * radiusWidth)
          / (textMetrics.actualBoundingBoxLeft + textMetrics.actualBoundingBoxRight);
        ctx.font = `${Math.floor(minMaxFontSize * scaleDownRatio)}px ${fontFamily}`;
      }

      ctx.fillText(
        text,
        actualWidth * (radiusWidth * (datasetIndex + 0.5)),
        actualHeight * (0.5 + 0.25) + textMetrics.actualBoundingBoxAscent + padding,
      );
      ctx.restore();
    }
    if (this.showEndValue) {
      ctx.save();
      let text = `${this._drawEndValue}`;
      if (text.length > 5) {
        text = `${text.substring(0, 3)}...`;
      }
      const textMetrics = ctx.measureText(text);
      if (textMetrics.actualBoundingBoxLeft + textMetrics.actualBoundingBoxRight
        > actualWidth * radiusWidth) {
        const scaleDownRatio = (actualWidth * radiusWidth)
          / (textMetrics.actualBoundingBoxLeft + textMetrics.actualBoundingBoxRight);
        ctx.font = `${Math.floor(minMaxFontSize * scaleDownRatio)}px ${fontFamily}`;
      }

      ctx.fillText(
        text,
        actualWidth * (1 - (radiusWidth * (datasetIndex + 0.5))),
        actualHeight * (0.5 + 0.25) + textMetrics.actualBoundingBoxAscent + padding,
      );
      ctx.restore();
    }
    ctx.restore();
  }

  updateData() {
    const data = this.getDataset()?.data;
    if (!data.length) {
      return undefined;
    }
    const sum = data.reduce((a, t) => a + t, 0);
    if (sum <= 0) {
      throw new Error('Add positive value at least one.');
    }
    this._drawStartValue = this.startValue || 0;
    this._drawEndValue = this.endValue || this._drawStartValue + sum;
    this._totalDelta = this._drawEndValue - this._drawStartValue;

    if (this._totalDelta <= 0) {
      throw new Error('endValue should be lager then startValue');
    }

    const drawValue = data[0] ?? 0;
    this._firstArcValue = drawValue - this._drawStartValue;
    if (this._firstArcValue < 0 || this._firstArcValue > this._totalDelta) {
      throw new Error('Values must be between range of chart!');
    }

    this._portion = Math.min(this._firstArcValue / this._totalDelta, 1);
  }
}

GaugeChart.id = 'gauge';
GaugeChart.defaults = {
  cutout: '60%',
  circumference: 180,
  rotation: 270, // number;
  aspectRatio: 2,
  maintainAspectRatio: true,
  plugins: {
    legend: false,
    filler: false,
    datalabels: false,
    tooltip: false,
  },

  startValue: 0,
  endValue: undefined,
  remainColor: 'rgba(0,0,0,0.1)',
  gaugeColor: undefined,
  percentage: true,

  showStartValue: undefined,
  showEndValue: undefined,
  showGaugeValue: true,
  gaugeOnArc: false,
};

const Gauge = generateChart('gauge-chart', GaugeChart.id, GaugeChart);

export default Gauge;
