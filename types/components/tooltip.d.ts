import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

// KwTooltip
interface KwTooltipProps {
  /**
   * 툴팁 표시 여부
   */
  modelValue?: number;

  /**
   * 'v-model:modelValue'에서 값 변경을 위해 사용
   * @param modelValue 툴팁 표시 여부
   */
  'onUpdate:modelValue'?: (modelValue: boolean) => void;
}
interface KwTooltipSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}
interface KwTooltip extends ComponentPublicInstance<KwTooltipProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwTooltip: GlobalComponentConstructor<KwTooltipProps, KwTooltipSlots>;
  }
}
