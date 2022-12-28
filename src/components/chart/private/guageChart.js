import { generateChart } from 'vue-chartjs';
import {
  DoughnutController,
  Chart as ChartJS,
  registerables,
} from 'chart.js';
import { cloneDeep } from 'lodash-es';

ChartJS.register(
  ...registerables,
);

export const toPercentage = (value, dimension) => (typeof value === 'string' && value.endsWith('%')
  ? parseFloat(value) / 100
  : value / dimension);

class GaugeChart extends DoughnutController {
  draw() {
    const _startValue = this.options.startValue;
    const _showStartValue = !(this.options.showStartValue === false) && !(_startValue === false);
    const _endValue = this.options.endValue;
    const _showEndValue = !(this.options.showEndValue === false) && !(_endValue === false);
    const _remainColor = this.options.remainColor || '#eeeeee';
    const _percentage = this.options.percentage;
    const _cutout = this.options.cutout;
    const _showGaugeValue = this.options.showGaugeValue;
    const _gaugeColor = this.options.gaugeColor;
    const _gaugeOnArc = this.options.gaugeOnArc;
    const dataset = this.getDataset();
    const datasetsLength = this.chart.data.datasets.length;
    const datasetIndex = this.chart.data.datasets.indexOf(dataset);
    const meta = this._cachedMeta;
    const elements = meta.data || [];
    if (elements.length < 1) {
      return;
    }
    const sum = dataset.data.reduce((a, t) => a + t, 0);
    if (sum <= 0) {
      throw new Error('Add positive value at least one.');
    }
    const startValue = _startValue || 0;
    const endValue = _endValue || startValue + sum;
    const totalDelta = endValue - startValue;

    if (totalDelta <= 0) {
      throw new Error('endValue should be lager then startValue');
    }

    const firstValue = this.getLabelAndValue(0).value;
    if (firstValue < 0) {
      throw new Error('Values are must be positive.');
    }

    const portion = Math.min(firstValue / totalDelta, 1);

    const firstArc = elements[0];
    // if (totalDelta !== sum) {
    this.updateElement(
      firstArc,
      0,
      {
        endAngle: Math.PI * (1 + portion),
      },
      'normal',
    );
    // }

    // fill remain arc with gray
    let secondArc = elements[1];
    if (!secondArc) {
      secondArc = cloneDeep(firstArc);
      elements.push(secondArc);
    }
    this.updateElement(
      secondArc,
      1,
      {
        options: { backgroundColor: _remainColor },
        startAngle: firstArc.endAngle,
        endAngle: Math.PI * 2,
      },
      'none',
    );

    // hide remain
    if (elements.length > 2) {
      for (let i = 2; i < elements.length; i += 1) {
        elements[i].hidden = true;
      }
    }

    super.update();
    super.draw();

    const { ctx } = this.chart;
    ctx.save();

    const actualWidth = this.chart.chartArea.width;
    const actualHeight = this.chart.chartArea.height;
    const innerRadius = toPercentage(_cutout, actualWidth / 2);
    const radiusWidth = (0.5 * (1 - innerRadius)) / datasetsLength;

    const fontFamily = 'Helvetica';
    ctx.textAlign = 'center';
    ctx.fillStyle = _gaugeColor;

    if (_showGaugeValue && _gaugeOnArc) {
      ctx.save();
      const percentage = Number((firstValue * 100) / totalDelta).toPrecision(3);
      const realValue = Number(startValue) + Number(firstValue);

      const text = _percentage ? `${percentage}%` : realValue;
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

    if (_showGaugeValue && !_gaugeOnArc) {
      ctx.save();
      const percentage = Number((firstValue * 100) / totalDelta).toPrecision(3);
      const realValue = Number(startValue) + Number(firstValue);

      const text = _percentage ? `${percentage}%` : realValue;
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

    if (_showStartValue) {
      ctx.save();
      let text = `${startValue}`;
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
    if (_showEndValue) {
      ctx.save();
      let text = `${endValue}`;
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
