import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { ChartData, ChartOptions } from 'chart.js';

type AvailableChart = 'bar' | 'line' | 'pie' | 'doughnut' | 'spline' | 'gauge' | 'step' | 'areaSpline';

interface KwChartProps {
  /**
   * 차트의 종류를 지정한다.
   * @default 'bar'
   */
  type?: AvailableChart;

  /**
   * 차트에 바인딩 되는 데이터이다.
   */
  data?: ChartData;

  /**
   * 차트 옵션
   */
  options?: ChartOptions;

  /**
   * 차트 옵션
   */
  chartId?: string;

  /**
   * 차트 너비
   */
  width?: number;

  /**
   * 차트 높이
   */
  height?: number;

  /**
   * 차트 클래스
   */
  cssClasses?: string;

  /**
   * 차트 스타일
   */
  styles?: Partial<CSSStyleDeclaration>;
}
interface KwChartSlots {}
export interface KwChart extends ComponentPublicInstance<KwChartProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwChart: GlobalComponentConstructor<KwChartProps, KwChartSlots>;
  }
}
