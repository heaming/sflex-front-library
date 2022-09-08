import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwChartProps {}
interface KwChartSlots {}
interface KwChart extends ComponentPublicInstance<KwChartProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwChart: GlobalComponentConstructor<KwChartProps, KwChartSlots>;
  }
}
